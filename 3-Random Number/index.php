<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">
  <title>Random Number</title>
</head>
<body>
  <header>
    <h2>Random Number</h2>
  </header>
  <section>
    <?php
      $randNumber = 0;
      while($randNumber != 10) {
        $randNumber = rand(1,100);
        echo "<span>".$randNumber."</span>";
      }
    ?>
  </section>
</body>
</html>