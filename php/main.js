
/*Ajax call to mySql server to retrieve table data*/
function get_data(){
    clear_dom();
    $.ajax({
        url: 'database.php',
        method: 'POST',
        dataType: 'json',
        success: function(response){
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++){
                add_student_to_dom(response.data[i]);
            }

        }
    })
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
        success: function(response){
            console.log(response)
        }
    });
    clear_add_student_form();
}

/*function to loop through the received response from database and appends to DOM*/
function add_student_to_dom(student_object){
    var student_nameTD = $('<td>').html(student_object['Name']);
    var courseTD = $('<td>').html(student_object['Course']);
    var student_gradeTD = $('<td>').html(student_object['Grade']);
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
    var name = $('#student_name').val();
    var course = $('#course_name').val();
    var grade = parseFloat($('#student_grade').val());
    if (name == undefined || course == undefined || grade < 0 || grade > 100 || grade == undefined || isNaN(grade) == true) {
        var message = 'All input fields must contain at least one non-space character.  Grade must be a number between 0 and 100.';
        display(message);
        return true;
    }
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

function remove_student(element){
    var delete_data = {
        ID: $(element).attr('student_id')
    };
    $.ajax({
        url: 'delete_student.php',
        method: 'POST',
        data: delete_data,
        success: function(response){
            console.log('student successfully deleted', response);
        }

    });
    $(element).closest('tr').remove();
}
