<?php

function getenv_default($env_var, $default) {
    $res = getenv($env_var);
    if(!$res) {
        $res = $default;
    }
    return $res;
}

class DB extends PDO {
    private static $instance = NULL;
    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new DB('sqlite:/tmp/mule-db');
            self::$instance->setup();
        }
        return self::$instance;
    }

    private function setup() {
        $this->prepare('
            CREATE TABLE IF NOT EXISTS upload (
            	id INTEGER NOT NULL,
            	filename VARCHAR(256),
            	filesize VARCHAR(64),
            	last_modified VARCHAR(64),
            	upload_start DATETIME,
            	last_information DATETIME,
            	"key" VARCHAR(256),
            	upload_id VARCHAR(128),
            	chunks_uploaded TEXT,
            	PRIMARY KEY (id)
            );
        ')->execute();
    }

    public function update_chunks($id, $chunks) {
        $query = $this->prepare(
            'UPDATE upload SET chunks_uploaded = ? WHERE id = ?'
        );
        $query->execute(array($chunks, $id));
    }

    public function get_upload($filename, $filesize, $last_modified) {
        $query = $this->prepare(
            'SELECT * FROM upload
            WHERE filename = ? AND filesize = ? AND last_modified = ?
            ORDER BY id DESC
            LIMIT 1'
        );
        $query->execute(array($filename, $filesize, $last_modified));
        $res = $query->fetchAll();
        if(count($res) == 0) {
            return NULL;
        } else {
            return $res[0];
        }
    }

    public function create_upload($filename, $filesize, $last_modified,
                                  $chunks_uploaded, $key, $upload_id) {
        $query = $this->prepare(
            'INSERT INTO upload
                (filename, filesize, last_modified,
                 chunks_uploaded, key, upload_id)
             VALUES
                (?, ?, ?, ?, ?, ?)'
        );
        $res = $query->execute(array($filename, $filesize, $last_modified,
                              $chunks_uploaded, $key, $upload_id));
    }

    public function delete_upload($filename, $filesize, $last_modified) {
        $query = $this->prepare(
            'DELETE FROM upload
            WHERE filename = ? AND filesize = ? AND last_modified = ?');
        $query->execute(array($filename, $filesize, $last_modified));
    }
}

class Backend {

    public $MIME_TYPE;
    public $BUCKET;
    public $AWS_SECRET;
    public $AWS_ACCESS_KEY;
    public $REGION;
    public $DEBUG = true;
    public $ENGINE;
    public $CHUNK_SIZE = 6291456;  // 6MB

    public function __construct() {
        $this->MIME_TYPE = getenv_default('MIME_TYPE', 'the_mime_type');
        $this->BUCKET = getenv_default('BUCKET', 'my_bucket');
        $this->AWS_SECRET = getenv_default('AWS_SECRET', 'the_secret_access_key');
        $this->AWS_ACCESS_KEY = getenv_default('AWS_ACCESS_KEY', 'the_public_access_key');
        $this->REGION = getenv_default('AWS_REGION', 'region');
        $this->ENGINE = getenv_default('DATABASE_URL', 'sqlite:database.db');
    }

    private function get_signature($date) {
        $k_date = hash_hmac(
            'sha256',$date->format("Ymd"),
            "AWS4" . $this->AWS_SECRET,
            true
        );

        $k_region = hash_hmac(
            'sha256', $this->REGION, $k_date, true
        );
        $k_service = hash_hmac(
            'sha256', "s3", $k_region, true
        );
        $k_signing = hash_hmac(
            'sha256', "aws4_request", $k_service
        );
        return $k_signing;
    }

    public function upload_action($action) {
        if(isset($_GET['key'])) {
            $key = $_GET['key'];
        }
        if(isset($_GET['upload_id'])) {
            $upload_id = $_GET['upload_id'];
        }
        if(isset($_GET['chunk'])) {
            $chunk = $_GET['chunk'];
        }
        $string = $date = NULL;

        $db = DB::getInstance();

        if($action == 'chunk_loaded') {
            $filename = $_GET['filename'];
            $filesize = (int)$_GET['filesize'];
            $last_modified = $_GET['last_modified'];
            $chunk = (int)$_GET['chunk'];

            if($filesize > $this->CHUNK_SIZE) {
                $upload = $db->get_upload($filename, $filesize,
                                          $last_modified);
                if($upload) {
                    $chunks = explode(',', $upload['chunks_uploaded']);
                    $chunks[] = $chunk;
                    $chunks = implode(',', array_unique($chunks));
                    $db->update_chunks($upload['id'], $chunks);
                } else {
                    $db->create_upload($filename, $filesize, $last_modified,
                                       $chunk, $key, $upload_id);
                }
            }

            return '';
        }

        if($action == 'signing_key') {
            $date = new DateTime('NOW');
            $date->setTimeZone(new DateTimeZone('UTC'));
            $signature = $this->get_signature($date);

            $filename = $_GET['filename'];
            $filesize = $_GET['filesize'];
            $last_modified = $_GET['last_modified'];

            $data = array(
                "date" => $date->format('c'),
                "signature" => $signature,
                "access_key" => $this->AWS_ACCESS_KEY,
                "region" => $this->REGION,
                "bucket" => $this->BUCKET,
                "backup_key" => strval(rand(0, 10000000000)),
                "content_type" => $this->MIME_TYPE
            );

            $fresh_upload = isset($_GET['force']);
            if(!$fresh_upload) {
                $upload = $db->get_upload($filename, $filesize, $last_modified);
                if($upload) {
                    $data['key'] = $upload['key'];
                    $data['upload_id'] = $upload['upload_id'];
                    $data['chunks'] = array_map(
                        'intval',
                        explode(',', $upload['chunks'])
                    );
                }
            }

            if($fresh_upload) {
                $db->delete_upload($filename, $filesize, $last_modified);
            }

            return json_encode($data);
        }
    }
}

$backend = new Backend();

if(!isset($_GET['action'])) {
    $key = (string)rand(1, 1000000);
    include 'index_template.php';
} else {
    echo $backend->upload_action($_GET['action']);
}
