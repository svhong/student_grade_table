<?php
require_once('mysqli_connect.php');
$response['success']= false;
$response['error'] = false;

if(isset($_POST['Name']) && (preg_match('/^[a-z\s]*$/i', $_POST['Name']))) {
    $student_name = $_POST['Name'];
} else {
    $response['error'] = true;
    $response['message'][] = 'There is an error with the student\'s name';
}
if(isset($_POST['Course']) && (preg_match('/^[a-z\s]*$/i', $_POST['Course']))) {
    $course_name = $_POST['Course'];
} else {
    $response['error'] = true;
    $response['message'][] = 'There was an error with the course name.';
}
if(isset($_POST['Grade']) && ($_POST['Grade'] > 1 || $_POST['Grade'] < 100)) {
    $grade = $_POST['Grade'];
} else {
    $response['error'] = true;
    $response['message'][] = 'Error not a valid grade.';
}

if(!$response['error']){
    $query = "INSERT INTO `students`(`Name`, `Course`, `Grade`) VALUES ('$student_name','$course_name','$grade')";
    $result = mysqli_query($conn,$query);
    if(mysqli_affected_rows($conn) > 0){
        $response = [
            'success' => true,
            'message' => 'Student has been added'
        ];
    } else {
        $response['message'][] = 'There was an error';
    }
}
print(json_encode($response));
?>