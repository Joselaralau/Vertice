<?php
function fAlerta($message) {
    echo "<script>alert('$message');</script>";
} 

$databaseHost = 'localhost';//or localhost
$databaseName = 'vertice2_sac'; // your db_name
$databaseUsername = 'vertice2_sac'; // root by default for localhost 
$databasePassword = 'v3rt1cev3rt1ce';  // by defualt empty for localhost
$conn = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);
//Muestra texto en forma de alerta de JS
?>