/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
var modal = {
    'backdrop': 'true',
    'keyboard': 'true'
};
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
// var inputIds = [];
/**
 * addClicked - Event Handler when user clicks the add button
 * // 4 things
 * 1)get the data from the inputs****************************
 * 2) add the object***************************************
 * 3)add it to the dom*************************************
 * 4) clear the form****************************************
 */
function addClicked() {
    //make sure form isn't empty
    if (check_input_fields() == true) return;
    var student_object = {};
    student_object.name = $('#studentName').val()
    student_object.course = $('#course').val();
    student_object.grade = parseFloat($('#studentGrade').val());
    send_student_data(student_object);
    addStudent(student_object);
    addStudentToDom(student_object);
    clearAddStudentForm();
}

//check input fields
function check_input_fields() {
    var name = $('#studentName').val().replace(/\s+/g, ''); //replace all spaces with '' just for this function
    var course = $('#course').val().replace(/\s+/g, ''); //replaces all spaces with '' just for this function
    var grade = parseFloat($('#studentGrade').val());
    if (name == '' || course == '' || grade < 0 || grade > 100 || grade == '' || isNaN(grade) == true) {
        var message = 'All input fields must contain at least one non-space character.  Grade must be a number between 0 and 100.';
        display_error(message);
        return true;
    }
}

/*-------------------------ADDING FUNCTION TO ENABLE THE ENTER KEY PRESS-----------------------------*/
function enter_keypress(e) {
    if (e.which == '13') {
        addClicked();
    }
}
/** function called clearInputs maay be needed that should be called by cancelClicked
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(student_object) {
    student_array.push(student_object); //store the object in the student_array global variable
    // addStudentToDom(student_object);
    updateData(); //average
    console.log("student array has :", student_array);
}
function removeStudent(button) {
    var remove = $(button).closest('tr').index();
    $(button).closest('tr').remove();
    delete_student_data(student_array[remove].id);
    student_array.splice(remove, 1);
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    $('#studentName').val("");
    $('#course').val("");
    $('#studentGrade').val("");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var total = 0;
    for (var i = 0; i <= student_array.length - 1; i++) { //function loop to go through the global array and pull the grades
        total += student_array[i].grade; // totals the grades that are already parseFloated  from the addStudent function
    }
    total /= student_array.length; //takes the number of total students input and finds the average
    console.log("average of the students: ", Math.round(total));
    return Math.round(total); // rounds to the nearest whole number before returning the value
}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    $('.avgGrade').html(calculateAverage()); // updates the .avgGrade label to the DOM with the average.
}

/**
 * udpends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    for (var i = 0; i < student_array.length; i++) {
        addStudentToDom(student_array[i]);
    }
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(student_object) { //****MIGHT NEED TO EDIT INTO PARAMETERS AND NOT RELY ON THE GLOBALS*******
    var student_nameTD = $('<td>').html(student_object.name);
    var courseTD = $('<td>').html(student_object.course);
    var student_gradeTD = $('<td>').html(student_object.grade);
    var del = $('<button>').addClass('btn btn-danger btn-xs').text('Delete').click(function () {
        removeStudent(this);
    });
    var deleteTD = $('<td>').html(del);
    var tr = $('<tr>').addClass('parentRow');
    tr.append(student_nameTD, courseTD, student_gradeTD, deleteTD);
    $('.studentTB').append(tr);
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    //reset global variables back to default value, and reset the dom back to initial load state
    student_array = [];
    $('.studentTB').children('tr').remove();
}

// send student data
function send_student_data(student_object) {
    // var key = {'api_key': 'lN3gVYfP6x'};
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/create',
        data: {
            'api_key': 'lN3gVYfP6x',
            'name': student_object.name,
            'course': student_object.course,
            'grade': student_object.grade
        },
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
            console.log('server student id is: ' + result.new_id);
            student_object.id = result.new_id;
        },
        error: function (result) {
            display_error('The server could not process your request: ' + result);
        }
    });
}
function display_error(message) {
    $('#modal_message').html(message);
    $('#errorModal').modal('show');
}
// get student data
function get_student_data() {
    // var key = {'api_key': 'lN3gVYfP6x'};
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        data: {
            'api_key': 'lN3gVYfP6x'
        },
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            for (i = 0; i < result.data.length; i++) {
                addStudent(result.data[i]);
            }
            updateStudentList();
        },
        error: function (result) {
            display_error('The server could not process your request: ' + result);
        }
    });
}

// delete student data
function delete_student_data(student_id) {
    // var key = {'api_key': 'lN3gVYfP6x'};
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        data: {
            'api_key': 'lN3gVYfP6x',
            'student_id': student_id
        },
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
            // console.log('server student id is: ' + result.new_id);
            // student_object.id = result.new_id;
        },
        error: function (result) {
            display_error('The server could not process your request: ' + result);
        }
    });
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    // assign add/cancel button click handlers
    $('#add_button').click(function () {
        addClicked();
    });
    $('#cancel_button').click(function () {
        clearAddStudentForm();
    });
    $('#get_data_from_server_button').click(function () {
        reset();
        get_student_data();
    });
    // $('#studentName').attr('pattern', '[A-Za-z]');
    $('#studentGrade').on('keypress', enter_keypress);
    get_student_data();
});
