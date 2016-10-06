/**
 * Created by syd on 8/29/2016.
 */
function addStudent(){
    $.ajax({
        url:'index.php',
        method:'POST',
        data:{
            student: $("#studentName").val(),
            course: $("#course").val(),
            grade: $("#studentGrade").val()
        },
        success: function(result){
            console.log(result);
        }
    })
}

function getData(){
    $.ajax({
        url: 'database.php',
        method: 'POST',
        type: 'json',
        success: function(response){
            console.log(response)
        }
    })
}