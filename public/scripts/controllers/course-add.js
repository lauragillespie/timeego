import { courseAdd } from '../models/firebase.js';

// Course Add Form
const courseAddForm = document.getElementById('courseAddForm');
// for an <input type='text'> with id = 'courseName'
const courseName = document.getElementById('courseName');
// for an <input type='color'> with id = 'courseColor'
const courseColor = document.getElementsByClassName('color');

// for a <form> with an id = 'courseForm'

$(document).ready(function() {
	var selector = '.color-list .color';
	$('.color').css('background', function() {
		return $(this).data('color');
	});

	$(selector).on('click', function() {
		$(selector).removeClass('active');
		$(this).addClass('active');
	});
});
courseAddForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// Makes course object from form object
	const course = {
		name     : courseName.value,
		color    : courseColor.value,
		date     : new Date(),
		archived : false
	};
	courseAdd.writeDB(course);

	window.location.href = './course-home.html';
});
