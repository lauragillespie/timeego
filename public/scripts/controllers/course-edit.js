//*****************************************************************************
// Course Edit Controller
//*****************************************************************************
//
// This file imports functions from the main firebase file, allowing the user
// to edit an entry in the database when they submit a form.
// Clicking the 'delete' button allows the user to delete a course from the
// database.
//
//*****************************************************************************
import { courseEdit } from '../models/firebase.js';
import helpers from './helpers-controllers.js';

// Course Edit Form, name and archive checkbox
const courseEditForm = document.getElementById('course_edit_form');
const courseName = document.getElementById('course_name');
const archiveCourse = document.getElementById('archive_course');

// Delete Course Button
const deleteButton = document.getElementById('delete');

// Alerts for deleting and editing course
const alertbox = document.getElementById('alertbox');
const alertBackground = document.querySelector('.alert_background');
const alertSuccess = document.querySelector('.delete_success');
const noButton = document.getElementById('no_button');
const yesButton = document.getElementById('yes_button');

// Gets Course ID from URL via helper function
const courseID = helpers.parseURL();

// Sets nav tabs to link to correct course via helper function
helpers.setNavTabs(courseID);

// Gets course info from database
courseEdit.readDB(courseID);

// Sets Colors in color picker
helpers.colorPicker();

//*****************************************************************************
// EDITS COURSES Event Listeners
//*****************************************************************************

// On submit event listener for course form
courseEditForm.addEventListener('submit', e => {
	e.preventDefault();
	// Gets Currently checked input for color
	const courseColor = document.querySelector(
		'input[name=color-radio]:checked'
	);

	// Makes course object from form object
	const course = {
		id       : courseID,
		name     : courseName.value,
		color    : courseColor.value,
		archived : archiveCourse.checked
	};

	// Sends Course Object to Firebase model for saving
	courseEdit.editCourse(course);
});

//*****************************************************************************
// DELETES COURSES Event Listeners
//*****************************************************************************
// Opens Delete Alert Box
deleteButton.addEventListener('click', e => {
	e.preventDefault();
	alertbox.classList.add('alertbox_active');
	alertBackground.classList.add('alert_background--active');
});

// 'NO' Button: Closes the Delete alert box
noButton.addEventListener('click', e => {
	e.preventDefault();
	alertbox.classList.remove('alertbox_active');
	alertBackground.classList.remove('alert_background--active');
});

// 'YES' Button: deletes Course, closes alert, redirects to course home
yesButton.addEventListener('click', e => {
	e.preventDefault();
	// Calls method in firebase to delete course from database
	courseEdit.deleteCourse(courseID);
	alertSuccess.classList.add('delete_success_active');
	alertbox.classList.remove('alertbox_active');

	// Redirect to 'course-home', after 1 second delay
	setTimeout(function() {
		window.location.href = './course-home.html';
	}, 1000);
});

// When background is clicked, hides the delete alertbox
alertBackground.addEventListener('click', () => {
	alertbox.classList.remove('alertbox_active');
	alertBackground.classList.remove('alert_background--active');
});
