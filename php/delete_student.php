<?php
require_once ('mysqli_connect.php');
$response['success']= false;
$response['error'] = false;
if (isset($_POST['ID'])){
    $student_id = $_POST['ID'];
    $query = "DELETE FROM `students` WHERE ID=$student_id";
    $result = mysqli_query($conn,$query);
    if ($result && mysqli_affected_rows($conn) == 1){
        $response = [
            'success' => true,
            'message' => 'Student successfully deleted!'
        ];
    } else {
        $response['message'][] = 'There was an error';
    };
    print(json_encode($response));
}
?>