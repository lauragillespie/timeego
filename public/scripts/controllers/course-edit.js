import { courseEdit } from '../models/firebase.js';

// Course Edit Form
const courseEditForm = document.getElementById('courseEditForm');
// for an <input type='text'> with id = 'courseName'
const courseName = document.getElementById('courseName');
// for an <input type='color'> with id = 'courseColor'
const courseColor = document.getElementById('courseColor');

const deleteButton = document.getElementById('delete');

const alert = document.getElementById('alertbox');
const saved = document.querySelector('.edit_success');
const alertBackground = document.querySelector('.alert_background');
const alertSuccess = document.querySelector('.delete_success');
const noButton = document.getElementById('no_button');
const yesButton = document.getElementById('yes_button');

// Parses Course ID from URL
const urlString = window.location.href;
const url = new URL(urlString);
const courseID = url.searchParams.get('courseid');

// Makes course ID string to append to Nav Tabs
const idString = 'courseid=' + courseID;
const detailsLink = document.getElementById('details_link');
const editLink = document.getElementById('edit_link');

// Adds Course ID to url when nav tabs are clicked
detailsLink.addEventListener('click', function(e) {
	e.preventDefault();
	window.location.href = './course-details.html?' + idString;
});
editLink.addEventListener('click', function(e) {
	e.preventDefault();
	window.location.href = './course-edit.html?' + idString;
});

// EDITS COURSES

// for a <form> with an id = 'courseForm'
courseEditForm.addEventListener('submit', e => {
	e.preventDefault();

	courseEdit.editCourse(courseID);

	saved.classList.add('edit_success_active');

	setTimeout(function() {
		saved.classList.remove('edit_success_active');
		// window.location.href = './course-home.html';
	}, 1000);

	// window.location.href = './course-home.html';
});

// DELETES COURSES
deleteButton.addEventListener('click', e => {
	e.preventDefault();

	// Prompts an alert confirming the course deletion
	alertbox.classList.add('alertbox_active');
	alertBackground.classList.add('alert_background--active');

	// Closes alert
	noButton.addEventListener('click', e => {
		e.preventDefault();

		alertbox.classList.remove('alertbox_active');
		alertBackground.classList.remove('alert_background--active');
	});

	// Deletes Course and closes alert, and redirects to course home
	yesButton.addEventListener('click', e => {
		e.preventDefault();
		courseEdit.deleteCourse(courseID);
		alertSuccess.classList.add('delete_success_active');

		// redirect on delay
		setTimeout(function() {
			alertbox.classList.remove('alertbox_active');
			alertBackground.classList.remove('alert_background--active');
			window.location.href = './course-home.html';
		}, 800);
	});
});
