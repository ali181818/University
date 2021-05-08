<?php
    // error_reporting(E_ALL);
    // ini_set('error_reporting', E_ALL);
    // ini_set("display_errors", 1);
    header("Content-Type: application/json; charset=UTF-8");
    $data = json_decode($_GET["data"], true);
    if($data["type"] == "valid"){
      $text = "";
      foreach($data as $key => $value) {
        if($key == "type")
          continue;
        $text .= $key . " is : " . $value . "<br>";
      }
      echo json_encode(array("data" => "$text"));
    }
    else if($data["type"] == "message"){
      $text = "Welcome " . $data['gender'] . " " . $data['name'];
      echo json_encode(array("data" => "$text"));
    }
?>