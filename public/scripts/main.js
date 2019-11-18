import { firebaseAuth, readDB, writeDB } from './firebase/firebase.js';
import { timerListeners } from './timer/timer-listeners.js';
import { timerViews } from './views.js';

// Current Path
const currentPath = window.location.pathname;

// Page Paths
const loginPath = '/';
const dashboardPath = '/dashboard.html';
const courseHomePath = '/course-home.html';
const courseAddPath = '/course-add.html';

// Writes to the database

// Global DB Functions - except Login Page (index.html)
if (currentPath != loginPath || currentPath != `/public${loginPath}`) {
	// Gets Current User Info
	readDB.getCurrentUser();
	readDB.getCourses(timerViews.renderCourseList);
	// dashboardViews.test();

	timerListeners();
}

// If on Login Page...
if (currentPath == loginPath || currentPath == `/public${loginPath}`) {
	// Imports Firebase Auth Login Widget
	firebaseAuth.authUI();
}

if (
	currentPath == courseHomePath ||
	currentPath == `/public${courseHomePath}`
) {
	readDB.displayCourses();
}
if (currentPath == courseAddPath || currentPath == `/public${courseAddPath}`) {
	writeDB.addCourse();
}

/***courses page change */
