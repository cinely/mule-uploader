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
            self::$instance = new DB('sqlite:../database.db');
        }
        return self::$instance;
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

    public function delete_upload($id) {
        $query = $this->prepare(
            'DELETE FROM upload WHERE id = ?');
        $query->execute(array($id));
    }

    public function get_and_delete_upload($filename, $filesize, $last_modified) {
        $res = $this->get_upload($filename, $filesize, $last_modified);
        $this->delete_upload($res['id']);
    }
}

class Backend {

    public $MIME_TYPE;
    public $BUCKET;
    public $AWS_SECRET;
    public $AWS_ACCESS_KEY;
    public $DEBUG = true;
    public $ENGINE;
    public $CHUNK_SIZE = 6291456;  // 6MB

    public function __construct() {
        $this->MIME_TYPE = getenv_default('MIME_TYPE', 'the_mime_type');
        $this->BUCKET = getenv_default('BUCKET', 'my_bucket');
        $this->AWS_SECRET = getenv_default('AWS_SECRET', 'the_secret_access_key');
        $this->AWS_ACCESS_KEY = getenv_default('AWS_ACCESS_KEY', 'the_public_access_key');
        $this->ENGINE = getenv_default('DATABASE_URL', 'sqlite:database.db');
    }

    private function process_string($string) {
        return base64_encode(hash_hmac('sha1', trim($string), $this->AWS_SECRET, true));
    }

    private function http_date() {
        return strftime('%a, %d %b %Y %X %Z');
    }

    private function action_init($key, $date=NULL) {
        if(!$date) {
            $date = $this->http_date();
        }
        $s = "POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:$date\n/$this->BUCKET/$key?uploads";
        return array($this->process_string(
            "POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:$date\n/$this->BUCKET/$key?uploads"
        ), $date);
    }

    private function action_chunk($key, $upload_id, $chunk, $date=NULL) {
        if(!$date) {
            $date = $this->http_date();
        }
        return array($this->process_string(
            "PUT\n\n$this->MIME_TYPE\n\nx-amz-date:$date\n/$this->BUCKET/$key?partNumber=$chunk&uploadId=$upload_id"
        ), $date);
    }

    private function action_list($key, $upload_id, $date=NULL) {
        if(!$date) {
            $date = $this->http_date();
        }
        return array($this->process_string(
            "GET\n\n\n\nx-amz-date:$date\n/$this->BUCKET/$key?uploadId=$upload_id"
        ), $date);
    }

    private function action_end($key, $upload_id, $date=NULL) {
        if(!$date) {
            $date = $this->http_date();
        }
        return array($this->process_string(
            "POST\n\n$this->MIME_TYPE\n\nx-amz-date:$date\n/$this->BUCKET/$key?uploadId=$upload_id"
        ), $date);
    }

    private function action_delete($key, $upload_id, $date=NULL) {
        if(!$date) {
            $date = $this->http_date();
        }
        return array($this->process_string(
            "DELETE\n\n\n\nx-amz-date:$date\n/$this->BUCKET/$key?uploadId=$upload_id"
        ), $date);
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
                    error_log(print_r($upload, true));
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

        if($action == 'get_all_signatures') {
            $date = $this->http_date();

            $list_signature = $this->action_list(
                $key, $upload_id, $date);
            $end_signature = $this->action_end(
                $key, $upload_id, $date);
            $delete_signature = $this->action_delete(
                $key, $upload_id, $date);

            $num_chunks = (int)$_GET['num_chunks'];
            $chunk_signatures = array();

            for($i=1; $i<=$num_chunks; $i++) {
                $chunk_signatures[$i] = $this->action_chunk(
                    $key, $upload_id, $i, $date);
            }

            return json_encode(array(
                'list_signature' => $list_signature,
                'end_signature' => $end_signature,
                'chunk_signatures' => $chunk_signatures,
            ));
        }

        if($action == 'get_init_signature') {
            $filename = $_GET['filename'];
            $filesize = $_GET['filesize'];
            $last_modified = $_GET['last_modified'];
            $force = $_GET['force'];

            $upload = $db->get_upload($filename, $filesize, $last_modified);
            if($upload && !$force) {
                list($string, $date) = $this->action_init($upload['key']);
                $chunks = explode(',', $upload['chunks_uploaded']);
                return json_encode(array(
                    'signature' => $string,
                    'date' => $date,
                    'key' => $upload['key'],
                    'upload_id' => $upload['upload_id'],
                    'chunks' => $chunks,
                ));
            } else {
                $db->get_and_delete_upload(
                    $filename, $filesize, $last_modified);
            }
            list($string, $date) = $this->action_init($key);
        }

        if($action == 'get_chunk_signature') {
            list($string, $date) = $this->action_chunk(
                $key, $upload_id, $chunk);
        }

        if($action == 'get_list_signature') {
            list($string, $date) = $this->action_list($key, $upload_id);
        }

        if($action == 'get_end_signature') {
            list($string, $date) = $this->action_end($key, $upload_id);
        }

        if($action == 'get_delete_signature') {
            list($string, $date) = $this->action_delete($key, $upload_id);
        }

        return json_encode(array(
            'signature' => $string,
            'date' => $date,
        ));
    }
}

$backend = new Backend();

if(!isset($_GET['action'])) {
    $key = (string)rand(1, 1000000);
    include 'index.php';
} else {
    echo $backend->upload_action($_GET['action']);
}
