import { courseDetails } from '../models/firebase.js';

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

courseDetails.readDB(courseID);
