import { courseEdit } from '../models/firebase.js';

const deleteButton = document.getElementById('delete');

const alert = document.getElementById('alertbox'); 
const alertBackground = document.querySelector('.timer__background'); 
const alertSuccess = document.querySelector('.delete_success');
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
        alertSuccess.classList.add('delete_success_active');
        
        // redirect on delay
        setTimeout( function() {
            alertbox.classList.remove('alertbox_active')
            alertBackground.classList.remove('timer__background--active');
            window.location.href = './course-home.html';
        },800);
       
    })

});