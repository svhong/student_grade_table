<?php
require_once ('mysqli_connect.php');

$query = "SELECT * FROM students";
$list = mysqli_query($conn, $query);
while ($row = mysqli_fetch_assoc($list)) {
    $output['success'][] = $row;
}
print_r(json_encode($output));
?>