//*****************************************************************************
// Session Add Controller
//*****************************************************************************
//
// This file calls the database to get course information.
//
//*****************************************************************************

import { sessionAdd } from '../models/firebase.js';

sessionAdd.readDB();

const submitButton = document.querySelector('.form__button--submit');

submitButton.addEventListener('click', e => {
	e.preventDefault();
	alert(
		"This feature isn't ready just yet, but we plan on finishing it soon! 😊"
	);
	window.location.href = '/public/dashboard.html';
});
