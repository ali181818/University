<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">
  <title>Date From File</title>
</head>
<body>
  <header>
    <h2>Date From File</h2>
  </header>
  <section>
    <?php
      foreach(file('./Date.txt') as $line) {
        echo strftime("%B %d %Y, %X %Z",strtotime($line)) . '<br>';
      }
      // Or
      // $handle=fopen("./Date.txt","r");
      // while (($line = fgets($handle)) !== false) {
      //   echo strftime("%B %d %Y, %X %Z",strtotime($line)) . '<br>';
      // }
    // ?>
  </section>
</body>
</html>