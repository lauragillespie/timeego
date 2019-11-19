// Goal is to get rid of this file

import { readDB } from './firebase/firebase.js';

// Current Path
const currentPath = window.location.pathname;

// Page Paths
const courseHomePath = '/course-home.html';

// Writes to the database

if (
	currentPath == courseHomePath ||
	currentPath == `/public${courseHomePath}`
) {
	readDB.displayCourses();
}
