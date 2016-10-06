<?php
print_r($_POST);
?>

<?php
////start the session
////connect to the database
////write your select query, put it in a variable
////send your query to the mysql server
////check if the query succeeded (did the mysqli_query function return anything?)
////check if the number of rows is greater than 0?
////0) make a data array
//// 1) get every row from the mysql database via fetch, 2) put it in the data array
////3) make your output associative array
////4) add necessary data to associative array (success, data, etc).  Or if errors, send those
////5) json encode the outbound information
////6) print the json encoded information
//$one_student = [
//    'id'=>1,
//    'name'=>'Dude',
//    'grade'=>20,
//    'course'=>'dudeness'
//]; //1
//$data=[]; //0
//$data[] = $one_student; //2
//$output = [
//    'success'=>true,
//    'data'=> $data
//]; //3 //4
////{"success": true,"data": [{"id": 1,"name": "Elizabeth","grade": 89,"course": "Library Science"}]}
//$json_output = json_encode($output);   //5
//print($json_output); //6
//?>