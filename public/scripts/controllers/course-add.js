//*****************************************************************************
// Course Add Controller
//*****************************************************************************
//
// This file parses info from the course add form, and then calls the
// course add method in the firebase file, saving the course to the database.
//
//*****************************************************************************

import { courseAdd } from '../models/firebase.js';
import helpers from './helpers-controllers.js';

// Course Add Form
const courseAddForm = document.getElementById('course_add_form');
// for an <input type='text'> with id = 'courseName'
const courseName = document.getElementById('course_name');

// Course Add Form Event listener
courseAddForm.addEventListener('submit', e => {
	e.preventDefault();
	// Gets Currently checked input for color
	const courseColor = document.querySelector(
		'input[name=color-radio]:checked'
	);
	// Makes course object from form object
	const course = {
		name     : courseName.value,
		color    : courseColor.value,
		date     : new Date(),
		archived : false
	};
	courseAdd.writeDB(course);
});

// Sets Colors in color picker
helpers.colorPicker();
