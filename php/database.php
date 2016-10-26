<?php
require_once ('mysqli_connect.php');
$output['success'] = false;
$query = "SELECT * FROM students";
$list = mysqli_query($conn, $query);
if(mysqli_num_rows($list)){
    $output['success'] = true;
    while ($row = mysqli_fetch_assoc($list)) {
        $output['data'][] = $row;
    }
}
print(json_encode($output));
?>