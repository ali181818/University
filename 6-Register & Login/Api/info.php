<?php
  session_start();
  header("Content-Type: application/json; charset=UTF-8");
  include('.././DataBase/db.php');
  if( isset($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $query = "SELECT * FROM `users` WHERE email = '$email'" ;
    $result = mysqli_query( $conn , $query );
    $row = mysqli_fetch_assoc( $result );
    $text = array("Name" => $row["name"] , "Family" => $row["family"] , "Email" => $row["email"]);
    echo json_encode($text);
  } else {
    echo json_encode(false);
  }
  mysqli_close($conn);
?>