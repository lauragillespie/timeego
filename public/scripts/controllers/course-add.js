import { courseAdd } from '../firebase/firebase.js';

// for an <input type='text'> with id = 'courseName'
const courseName = document.getElementById('courseName');
// for an <input type='color'> with id = 'courseColor'
const courseColor = document.getElementById('courseColor');

// for a <form> with an id = 'courseForm'
document.getElementById('courseForm').addEventListener('submit', e => {
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
