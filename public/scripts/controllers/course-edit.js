import { courseEdit } from '../models/firebase.js';

// Course Edit Form
const courseEditForm = document.getElementById('courseEditForm');
// for an <input type='text'> with id = 'courseName'
const courseName = document.getElementById('courseName');
// for an <input type='color'> with id = 'courseColor'
const courseColor = document.getElementById('courseColor');

const deleteButton = document.getElementById('delete');

const alert = document.getElementById('alertbox'); 
const alertBackground = document.querySelector('.timer__background'); 
const alertSuccess = document.querySelector('.delete_success');
const noButton = document.getElementById('no_button');
const yesButton = document.getElementById('yes_button');

const urlString = (window.location.href);
const url = new URL(urlString);
const courseID = url.searchParams.get("courseid");


// EDITS COURSES

// for a <form> with an id = 'courseForm'
courseEditForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// Makes course object from form object
	// const course = {
	// 	name     : courseName.value,
	// 	color    : courseColor.value,
	// 	date     : new Date(),
	// 	archived : false
	// };
	courseEdit.editCourse(courseID);

	// window.location.href = './course-home.html';
});


// DELETES COURSES
deleteButton.addEventListener( 'click', (e) => {
    e.preventDefault();
    
    // Prompts an alert confirming the course deletion
    alertbox.classList.add('alertbox_active');
    alertBackground.classList.add('timer__background--active');

    // Closes alert
    noButton.addEventListener('click', e=>{
        e.preventDefault();
      
        alertbox.classList.remove('alertbox_active');
        alertBackground.classList.remove('timer__background--active');
    })

    // Deletes Course and closes alert, and redirects to course home
    yesButton.addEventListener('click', e=>{
        e.preventDefault();
        courseEdit.deleteCourse(courseID);
        alertSuccess.classList.add('delete_success_active');
        
        // redirect on delay
        setTimeout( function() {
            alertbox.classList.remove('alertbox_active')
            alertBackground.classList.remove('timer__background--active');
            window.location.href = './course-home.html';
        },800);
       
    })

});