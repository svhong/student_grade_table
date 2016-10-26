
/*Ajax call to mySql server to retrieve table data*/
function get_data(){
    clear_dom();
    $.ajax({
        url: 'database.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
            var total = 0;
            for (var i = response.data.length-1; i >= 0; i--) {
                add_student_to_dom(response.data[i]);
                total += parseInt(response.data[i]['Grade']);
            }
            show_grade_average(Math.round(total/response.data.length));
        }
    });
}
/*Function to add student to the server database*/
function add_student(){
    if(check_input_fields()){
        return;
    }
    var create_student = {
        Name: $('#student_name').val(),
        Course: $('#course_name').val(),
        Grade: $('#student_grade').val()
    };
    $.ajax({
        url:'add_student.php',
        method: 'POST',
        data: create_student,
        dataType: 'json',
        success: function(response){
            console.log('this is a success message', response);
            if(response.success){
                success_message(response.message);
                clear_add_student_form();
                get_data();
            } else {
                error_message(response.message);
            }
        }
    });
}
/* Function to remove the student from the database*/
function remove_student(element){
    var delete_data = {
        ID: $(element).attr('student_id')
    };
    $.ajax({
        url: 'delete_student.php',
        method: 'POST',
        data: delete_data,
        dataType: 'json',
        success: function(response){
            if(response.success){
                success_message(response.message);
                $(element).closest('tr').remove();
                calculate_average();
            } else {
                error_message(response.message);
            }
        }
    });
}

/*function to loop through the received response from database and appends to DOM*/
function add_student_to_dom(student_object){
    var student_nameTD = $('<td>').html(student_object['Name']);
    var courseTD = $('<td>').html(student_object['Course']);
    var student_gradeTD = $('<td>').addClass('grade').html(student_object['Grade']);
    var del = $('<button>').addClass('btn btn-danger btn-xs').text('Delete').attr({'student_id': student_object['ID']}).click(function () {
        remove_student(this);
    });
    var deleteTD = $('<td>').html(del);
    var tr = $('<tr>').addClass('parentRow');
    tr.append(student_nameTD, courseTD, student_gradeTD, deleteTD);
    $('.studentTB').append(tr);
}

/*Function to check the input fields to ensure criteria met for adding student*/
function check_input_fields() {
    var name = $('#student_name').val().replace(/\s+/g, '');
    var course = $('#course_name').val().replace(/\s+/g, '');
    var grade = parseFloat($('#student_grade').val());
    if (name == '' || course == '' || grade < 0 || grade > 100 || grade == '' || isNaN(grade) == true) {
        var message = 'All input fields must contain at least one non-space character.  Grade must be a number between 0 and 100.';
        display(message);
        return true;
    }
}

function success_message(message){
    $(".server_message").css('color','green').text(message);
}

function error_message(message){
    $('.server_message').css('color','red').text(message);
}

function display(message) {
    $('#modal_message').html(message);
    $('#Modal').modal('show');
}

function clear_add_student_form() {
    $('#student_name').val("");
    $('#course_name').val("");
    $('#student_grade').val("");
}

function clear_dom(){
    $('.studentTB').children('tr').remove();
}

function show_grade_average(grade){
    $('.average_grade').text(grade);
}

function calculate_average(){
    var array = document.getElementsByClassName('grade');
    var total = 0;
    for(var i =0; i < array.length; i++){
        total += parseInt(array[i]['textContent']);
    }
    show_grade_average(Math.round(total /= array.length))
}

$(document).ready(function() {
    get_data();
});
