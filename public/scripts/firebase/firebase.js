// Importing firebase config object
import { firebaseConfig } from './firebaseConfig.js';
// Importing firebase auth config
import { uiConfig } from './firebaseAuth.js';

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

/*** Firebase Auth ***/

// Firebase Auth
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
// This is only needed on login page, needed for login
export const firebaseAuth = {
	authUI : function() {
		ui.start('#firebaseui-auth-container', uiConfig);
	}
};

/*** Firebase Auth ENDS ***/

/*** Firestore Database ***/

// Initialize Firestore database
const db = firebase.firestore();

/******************** 
 * Updated DB Calls *
 ********************
 One object below per page, imported by that pages controller
 This object talks to the db and sorts the data
 Then, this object calls the associated functions from views to render html elements needed for that page
*/

import { timerViews, headerViews, dashboardViews } from '../views/views.js';

export const global = {
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// If the current user logged in, user is authenticated
			// then grab "uid" "displayName" and "email"
			// use "set()" with merge (if document did not exist it will be created)
			dbRef.set(
				{
					name  : user.displayName,
					email : user.email
				},
				{ merge: true }
			);

			// Gets: User Data From DB
			// Sets: User's First name in Header
			dbRef.onSnapshot(function(snap) {
				// Current User Data
				const currentUser = snap.data();
				// Imported From Views, passes in current user data
				headerViews.renderName(currentUser);
			});

			// Gets: Course Data From DB
			// Sets: Course List in Timer Pop Up
			dbRef.collection('courses').get().then(function(querySnapshot) {
				const courses = [];
				querySnapshot.forEach(doc => {
					// Gets Course Data from each course
					const { color, date, name } = doc.data().course;
					const id = doc.id;
					// Adds data to course object
					const course = {
						color : color,
						date  : date,
						name  : name,
						id    : id
					};
					// adds course object to array
					courses.push(course);
				});
				// Imported From Views, passes in array of courses
				timerViews.renderCourseList(courses);
			});
		});
	}
};
export const dashboard = {
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: User Data From DB
			// Sets: User's first name in Dashboard Heading
			dbRef.onSnapshot(function(snap) {
				// Current User Data
				const currentUser = snap.data();
				// Imported From Views, passes in current user data
				dashboardViews.renderHeading(currentUser);
			});
			// TODO: Get Session/Course Data Needed for Graph
			// TODO: Get Current Streak Data
		});
	}
};

export const courseHome = {};
export const courseArchived = {};
export const courseDetails = {};

export const courseAdd = {
	// Params: Course object from course-add Controller
	// Writes: New course to course collection of database
	writeDB : function(course) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);
			dbRef.collection('courses').doc().set(
				// uses passed in course as value
				{ course: course },
				{
					merge : true
				}
			);
		});
	}
};

export const courseEdit = {};

/*** Older Code Below ***/

/** Displays Courses **/

export const readDB = {
	displayCourses : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			var dbRef = db
				.collection('users')
				.doc(user.uid)
				.collection('courses');
			dbRef.get().then(function(querySnapshot) {
				const courseList = document.getElementById('course__list');
				const arrayLength = querySnapshot.docs.length;
				// If course array is empty, makes and appends message
				if (arrayLength <= 0) {
					const span = document.createElement('span');
					span.classList.add('course__list--no-courses');
					span.innerText = 'No Courses Currently Active';
					// Removes Spinner
					courseList.innerHTML = '';
					courseList.appendChild(span);
				} else {
					// Removes Spinner
					courseList.innerHTML = '';
					querySnapshot.forEach(function(doc) {
						// Course Variables From DB
						const courseId = doc.id;
						// retrieves color (hex) value from doc "course"
						var courseColor = doc.data().course.color;
						// retrieves name value from doc "course"
						var courseName = doc.data().course.name;
						var courseTime = '12:34:55'; // need to get from DB

						// Creates main course container
						var courseContainer = document.createElement('div');
						courseContainer.setAttribute(
							'class',
							'courseContainer'
						);

						// Links to go to course details and settings pages
						var courseDetailsLink = document.createElement('a');
						var courseSettingsLink = document.createElement('a');
						courseDetailsLink.setAttribute(
							'href',
							'./course-details.html'
						);
						courseSettingsLink.setAttribute(
							'href',
							'./course-edit.html'
						);
						courseDetailsLink.classList.add('courseDetailsLink');
						courseSettingsLink.classList.add('courseSettingsLink');
						courseSettingsLink.innerHTML =
							'<i class="material-icons">more_vert</i>';
						courseContainer.appendChild(courseDetailsLink);
						courseContainer.appendChild(courseSettingsLink);

						// Div for course color
						var courseColorDiv = document.createElement('div');
						// assigns the course color
						courseColorDiv.style.backgroundColor = courseColor;
						courseColorDiv.setAttribute('class', 'courseColorDiv');
						// appends color div to course details link
						courseDetailsLink.appendChild(courseColorDiv);

						// this div will hold the course name + any other course info
						var courseData = document.createElement('div');
						courseDetailsLink.appendChild(courseData);
						courseData.setAttribute('class', 'courseDetails');

						// Creates, Sets classes and text and appends name and time HTML elements
						var nameElement = document.createElement('h3');
						var timeElement = document.createElement('span');
						nameElement.setAttribute('class', 'courseName');
						timeElement.setAttribute('class', 'courseTime');
						nameElement.innerText = courseName;
						timeElement.innerText = courseTime;
						courseData.appendChild(nameElement);
						courseData.appendChild(timeElement);

						// Attaches Finished Course Container to Parent Element
						courseList.appendChild(courseContainer);
					});
				}
			});
		});
	}
};

/*** Firestore Database ENDS ***/
