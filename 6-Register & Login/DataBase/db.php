<?php
    define('hostname','localhost');
    define('username','root');
    define('password','');
    define('dbname','university');
    $conn = mysqli_connect(hostname,username,password,dbname);
    if (mysqli_connect_error($conn)) {
      die("Connection failed: " . mysqli_connect_error($conn));
    }
    // else{
    //   echo "Connected successfully";
    // }
?>