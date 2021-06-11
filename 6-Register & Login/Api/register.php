<?php
    // error_reporting(E_ALL);
    // ini_set('error_reporting', E_ALL);
    // ini_set("display_errors", 1);
    include('.././DataBase/db.php');
    header("Content-Type: application/json; charset=UTF-8");
    $data = json_decode($_GET["data"], true);
    $email = $data["email"];
    $password = $data["password"];
    $name=$data["name"];
    $family=$data["family"];
    // echo $email . '---' . $password . '---' . $name . '---' . $family;
    $query = "SELECT * FROM `users` WHERE email ='$email' " ;
    $result= mysqli_query($conn,$query);
    if ( mysqli_num_rows($result) == 0 ) {
      $queryInsert = "INSERT INTO `users`(`name`,`family`,`password`, `email`) VALUES ('{$name}','{$family}','{$password}','{$email}')" ;
      $result = mysqli_query($conn,$queryInsert);
      if ( $result ) {
        session_start();
        $_SESSION["email"] = $email;
        echo json_encode("Registration completed successfully");
      } else {
        echo json_encode("Error While Inserting");
      }
    } else {
      echo json_encode("Email is already exist in database");
    }
    mysqli_close($conn);
?>