/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array =[];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var student_name;
var course;
var student_grade;
/**
 * addClicked - Event Handler when user clicks the add button
 * // 4 things
 * 1)get the data from the inputs****************************
 * 2) add the object***************************************
 * 3)add it to the dom*************************************
 * 4) clear the form****************************************
 */
function addClicked(){
    addStudent();
    //addStudentToDom();
    clearAddStudentForm();
}
/*-------------------------ADDING FUNCTION TO ENABLE THE ENTER KEY PRESS-----------------------------*/
function enter_keypress(e){
    if (e.which == '13'){
        addStudent();
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
function addStudent(){
    var student_object = {};
    student_name = $('#studentName').val();
    course = $('#course').val();
    student_grade = parseFloat($('#studentGrade').val());
    student_object.student_name = student_name; //add values inside form into object
    student_object.course = course; //add values inside form into object
    student_object.student_grade = student_grade; //add values inside form into object
    student_array.push(student_object); //store the object in the student_array global variable
    addStudentToDom();
    updateData();
    clearAddStudentForm();

    console.log("student array has :",student_array);

    return undefined;
}
function removeStudent(button){
    $(button).closest('tr').remove();

}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    $('#studentName').val("");
    $('#course').val("");
    $('#studentGrade').val("");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage (){
    var total = 0;
    for (var i = 0; i <= student_array.length-1; i++){ //function loop to go through the global array and pull the grades
        total += student_array[i].student_grade; // totals the grades that are already parseFloated  from the addStudent function
    }
    total /= student_array.length; //takes the number of total students input and finds the average
    console.log("average of the students: ", Math.round(total));
    return Math.round(total); // rounds to the nearest whole number before returning the value
}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    $('.avgGrade').html(calculateAverage()); // updates the .avgGrade label to the DOM with the average.
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(){ //****MIGHT NEED TO EDIT INTO PARAMETERS AND NOT RELY ON THE GLOBALS*******
    var student_nameTD = $('<td>').html(student_name) ;
    var courseTD = $('<td>').html(course);
    var student_gradeTD = $('<td>').html(student_grade);
    var del = $('<button>').addClass('btn btn-danger btn-xs').text('Delete').click(function(){removeStudent(this);});
    var deleteTD = $('<td>').html(del);
    var tr = $('<tr>').addClass('parentRow');
    tr.append(student_nameTD,courseTD,student_gradeTD,deleteTD);
    $('.studentTB').append(tr);
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    //reset global variables back to default value, and reset the dom back to initial load state
    var student_array =[];
    var student_name = "";
    var course = "";
    var student_grade = "";
    console.log ('the reset function is working correctly', student_array, student_name,student_grade,course);
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
    // assign add/cancel button click handlers
    $('#add_button').click(function (){
        addClicked();
    });
    $('#cancel_button').click(function (){
        clearAddStudentForm();
    });
    $('#studentGrade').on('keypress',enter_keypress);
    reset(); // resets the tables and global variables back to original value(empty)
});
