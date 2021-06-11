<?php
  session_start();
  header("Content-Type: application/json; charset=UTF-8");
  include('.././DataBase/db.php');
  if( isset($_SESSION['email'])) {
    echo json_encode(session_destroy());
  } else {
    echo json_encode(false);
  }
  mysqli_close($conn);
?>