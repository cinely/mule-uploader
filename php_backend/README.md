How to run the backend
======================

0. Have an Apache ready

1. Clone the repository

2. Copy the whole project to the htdocs/www/whatever

3. Change the `.htaccess` file with your AWS credentials, bucket and desired mime-type.

4. Go to `http://localhost/mule-uploader/php_backend/`

5. You should have a fully functional Mule Uploader

6. You'll probably want to integrate this into another project. For that, you will have to change the `index.php`
file with updated paths for bootstrap and the `mule-uploader.js` file. Also note that the script is creating
a sqlite3 database in `/tmp/mule-db`, you'll probably want to integrate with your own database.

7. If you have any questions, let me know.
