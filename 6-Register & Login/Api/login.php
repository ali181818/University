<?php
    // error_reporting(E_ALL);
    // ini_set('error_reporting', E_ALL);
    // ini_set("display_errors", 1);
    include('.././DataBase/db.php');
    header("Content-Type: application/json; charset=UTF-8");
    $data = json_decode($_GET["data"], true);
    $email = $data["email"];
    $password = $data["password"];
    $query = "SELECT * FROM `users` WHERE email = '$email'" ;
    $result= mysqli_query($conn,$query);
    if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      if ( $row["password"] == $password ) {
        $text = array("Name" => $row["name"] , "Family" => $row["family"] , "Email" => $row["email"]);
        session_start();
        $_SESSION['email'] = $email;
        echo json_encode($text);
      } else {
        echo json_encode("Password is Incorrect");
      }
    } else {
      echo json_encode("Email is Incorrect");
    }
    mysqli_close($conn);
?>