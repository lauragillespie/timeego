import { courseEdit } from '../models/firebase.js';

const deleteButton = document.getElementById('delete');
    
const urlString = (window.location.href);
const url = new URL(urlString);
const courseID = url.searchParams.get("courseid");

deleteButton.addEventListener( 'click', (e) => {
    e.preventDefault();
    
    courseEdit.deleteCourse(courseID);
    
});