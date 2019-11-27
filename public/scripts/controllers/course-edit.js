import { courseEdit } from '../models/firebase.js';

const deleteButton = document.getElementById('delete');

const alert = document.getElementById('alertbox'); 
const timerBackground = document.querySelector('.timer__background'); 
const noButton = document.getElementById('no_button');
const yesButton = document.getElementById('yes_button');

const urlString = (window.location.href);
const url = new URL(urlString);
const courseID = url.searchParams.get("courseid");

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
        alertbox.classList.remove('alertbox_active');
        window.location.href = './course-home.html';
    })

});