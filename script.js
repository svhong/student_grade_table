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
 */
function addClicked(){
    addStudent();
    //addStudentToDom();
    clearAddStudentForm();
}
/**
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
    clearAddStudentForm();

    console.log("student array has :",student_array);

    return undefined;
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
    return Math.round(total); // rounds to the nearest whole number before returning the value
}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    $('.avgGrade').append(calculateAverage()); // updates the .avgGrade label to the DOM with the average.
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

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
    // assign add button click handler
    $('#add_button').click(function (){
        addClicked();
    });
    reset(); // resets the tables and global variables back to original value(empty)
});