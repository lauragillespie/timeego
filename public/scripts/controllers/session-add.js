//*****************************************************************************
// Session Add Controller
//*****************************************************************************
//
// This file calls the database to get course information.
//
//*****************************************************************************

import { sessionAdd } from '../models/firebase.js';

sessionAdd.readDB();

const submitButton = document.querySelector(
	'.form__button--submit',
);

// Course Edit Form, name and archive checkbox
// const sessionAddForm = document.getElementById(
// 	'session-add-form',
// );
// const sessionCourse = document.getElementById('session--course');
// const sessionTimeMin = document.getElementById('session--mins');
// const sessionDate = document.getElementById('session--date');

submitButton.addEventListener('click', e => {
	e.preventDefault();
	// 	const session = {
	// 		courseID : sessionCourse.value,
	// 		time     : {
	// 			minutes : sessionTimeMin.value
	// 		},
	// 		date     : sessionDate.value
	// 	};
	// 	sessionAdd.writeDB(session);
	alert(
		"This feature isn't ready just yet, but we plan on finishing it soon! 😊",
	);
	window.location.href = './dashboard.html';
});
