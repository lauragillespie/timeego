import { courseEdit } from '../models/firebase.js';

const deleteButton = document.getElementById('delete');

const alert = document.getElementById('alertbox');  
const noButton = document.getElementById('no_button');
const yesButton = document.getElementById('yes_button');

const urlString = (window.location.href);
const url = new URL(urlString);
const courseID = url.searchParams.get("courseid");

deleteButton.addEventListener( 'click', (e) => {
    e.preventDefault();
    
    // Prompts an alert confirming the course deletion
    alertbox.classList.add('alertbox_active');

    // Closes alert
    noButton.addEventListener('click', e=>{
        e.preventDefault();
      
        alertbox.classList.remove('alertbox_active');
    })

    // Deletes Course and closes alert, and redirects to course home
    yesButton.addEventListener('click', e=>{
        e.preventDefault();
        courseEdit.deleteCourse(courseID);
        alertbox.classList.remove('alertbox_active');
        window.location.href = './course-home.html';
    })

});