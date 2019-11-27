// Importing firebase config object
import { firebaseConfig, uiConfig } from '../config/firebaseConfig.js';
// Importing firebase auth config
// import { uiConfig } from './firebaseAuth.js';

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

import {
	timerViews,
	headerViews,
	dashboardViews,
	courseHomeViews
} from '../views/views.js';

export const global = {
	readDB  : function() {
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
					// archived should be moved into course data once all courses have it. for now, this will set the value to false if the value in the archived field doesn't exist for that course in the db
					const archived = doc.data().course.archived || false;
					// Uses destructuring to get data from each course
					const { color, date, name } = doc.data().course;
					const id = doc.id;
					// Adds data to course object
					const course = {
						id       : id,
						name     : name,
						color    : color,
						date     : date,
						archived : archived
					};
					// adds course object to array
					courses.push(course);
				});
				// Imported From Views, passes in array of courses
				timerViews.renderCourseList(courses);
			});
		});
	},
	writeDB : {
		createSession : function(session) {
			firebase.auth().onAuthStateChanged(function(user) {
				// DB Reference to logged in user's collection
				const dbRef = db.collection('users').doc(user.uid);
				// Params: Session object from Stopwatch Class
				// Writes: New session to session collection of database
				dbRef
					.collection('sessions')
					.add(
						// uses session object param as value
						{ session: session }
					)
					.then(docRef => {
						console.log('Session write successful');
					})
					.catch(error => {
						console.error('Error adding document: ', error);
					});
				// Gets course id from session param
				const courseId = session.course.id;
				// If a courseId exists, ie if a course was selected...
				if (courseId) {
					// Params: Session object from Stopwatch Class
					// Writes: New session to correct course collection
					dbRef
						.collection('courses')
						.doc(courseId)
						.collection('sessions')
						.add({
							time : session.time,
							date : session.date
						})
						.catch(e => console.log(e));
				}
			});
		}
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
			// TODO: Get Current Streak Data
		});
		// TODO: Get Session/Course Data Needed for Graph, pass in to views
		dashboardViews.renderGraph();
	}
};

export const courseHome = {
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB
			// Sets: Course List on Course Home page
			dbRef.collection('courses').get().then(function(querySnapshot) {
				const courses = [];
				querySnapshot.forEach(doc => {
					// archived should be moved into course data once all courses have it. for now, this will set the value to false if the value in the archived field doesn't exist for that course in the db
					const archived = doc.data().course.archived || false;
					// Uses destructuring to get data from each course
					const { color, date, name } = doc.data().course;
					const id = doc.id;
					// Adds data to course object
					const course = {
						id       : id,
						name     : name,
						color    : color,
						date     : date,
						archived : archived
					};
					// adds course object to array
					courses.push(course);
				});
				// Imported From Views, passes in array of courses
				courseHomeViews.renderCourseList(courses);
			});
		});
	}
};
export const courseArchived = {
	// TODO: Get Course List, Filter into archived courses, Sort, Render Course List
};
export const courseDetails = {
	// TODO: Parse ID from URL, then...
	// TODO: Get details of that course, render view
	// TODO: Put Course ID in <a> tags in nav tabs
};

export const courseAdd = {
	writeDB : function(course) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);
			// Params: Course object from course-add Controller
			// Writes: New course to course collection of database
			dbRef.collection('courses').doc().set(
				// uses Course object param as value
				{ course: course },
				{
					merge : true
				}
			);
		});
	}
};

export const courseEdit = {
	// TODO: Parse ID from URL, then...
	// TODO: Fill the edit form with current data
	// TODO: Put Course ID in <a> tags in nav tabs
	// TODO: Add Delete Functions
};

/*** Firestore Database ENDS ***/
