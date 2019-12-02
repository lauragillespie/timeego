import { courseAdd } from '../models/firebase.js';

// Course Add Form
const courseAddForm = document.getElementById('courseAddForm');
// for an <input type='text'> with id = 'courseName'
const courseName = document.getElementById('courseName');

// Course Add Form Event listener
courseAddForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// Gets Currently checked input for color
	const courseColor = document.querySelector('input[name=color-radio]:checked');
	// Makes course object from form object
	console.log(courseColor.value);
	const course = {
		name     : courseName.value,
		color    : courseColor.value,
		date     : new Date(),
		archived : false
	};
	courseAdd.writeDB(course);
});
$(document).ready(function() {
	var selector = '.color-list .color';
	$('.color').css('background', function() {
		return $(this).data('color');
	});

	$(selector).on('click', function() {
		$(selector).removeClass('active');
		$(this).addClass('active');
		console.log(selector);
	});
});

// Toggles classes of active color for color selector
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
