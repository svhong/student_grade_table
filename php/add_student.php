<?php
require_once('mysqli_connect.php');
$response['success']= false;
$response['error'] = false;

if(isset($_POST['Name'])) {
    $student_name = $_POST['Name'];
} else {
    $response['error'] = true;
    $response['message'][] = 'Name was not set';
}
if(isset($_POST['Course'])) {
    $course_name = $_POST['Course'];
} else {
    $response['error'] = true;
    $response['message'][] = 'Course was not set';
}
if(isset($_POST['Grade'])) {
    $grade = $_POST['Grade'];
} else {
    $response['error'] = true;
    $response['message'][] = 'Grade was not set';
}

if(!$response['error']){

    $course_name = $_POST['Course'];
    $grade = $_POST['Grade'];
    $query = "INSERT INTO `students`(`Name`, `Course`, `Grade`) VALUES ('$student_name','$course_name','$grade')";
    $result = mysqli_query($conn,$query);
    print($query);
    if(mysqli_affected_rows($conn) > 0){
        $response = [
            'success' => true,
            'message' => 'Grade has been added'
        ];
    } else {
        $response['message'][] = 'There was an error';
    }
    print(json_encode($response));
}
?>