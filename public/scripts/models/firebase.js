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

import { timerViews, headerViews } from '../views/global-views.js';

export const global = {
	readDB  : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// If no user is logged in, redirects to sign in page
			if (!user) {
				window.location.href = '/public/index.html';
			}
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
			dbRef
				.collection('courses')
				.where('archived', '==', false)
				.get()
				.then(function(querySnapshot) {
					const courses = [];
					querySnapshot.forEach(doc => {
						// Uses destructuring to get data from each course
						const { color, date, name, archived } = doc.data();
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
						console.log(course);
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
						{
							course : session.course,
							date   : session.date,
							time   : session.time
						}
					)
					.then(docRef => {
						console.log('Session DB write successful');
					})
					.catch(error => {
						console.error('Error adding session: ', error);
					});
				// Gets course id from session param
				const courseId = session.course.id;
				// If a courseId exists, ie if a course was selected...
				if (courseId) {
					// Params: Session object from Stopwatch Class
					// Writes: New session to session array of correct course collection
					dbRef
						.collection('courses')
						.doc(courseId)
						.update({
							sessions : firebase.firestore.FieldValue.arrayUnion(
								{
									time : session.time,
									date : session.date
								}
							)
						})
						.catch(e => console.log(e));
				}
			});
		}
	},
	logOut  : function() {
		firebase
			.auth()
			.signOut()
			.then(function() {
				window.location.href = '/public/index.html';
			})
			.catch(function(error) {
				console.log(error);
			});
	}
};

import dashboardViews from '../views/dashboard-views.js';

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

			// Gets: Session Data from DB
			// Sets: Dashboard Graph and Dashboard Current Streak
			dbRef.collection('sessions').get().then(function(querySnapshot) {
				const sessions = [];
				querySnapshot.forEach(doc => {
					// Uses destructuring to get data from each session
					const { course, date, time } = doc.data();
					// Converts db date into javascript date object
					const dateObj = new Date(date.seconds * 1000);
					const id = doc.id;
					// Adds data to session object
					const session = {
						id     : id,
						course : course,
						date   : dateObj,
						time   : time
					};
					// adds session object to array
					sessions.push(session);
					// console.log(session);
				});
				// Imported From Views, passes in array of sessions to:
				// -Render Dashboard Graph
				// TODO: Get Session/Course Data Needed for Graph, pass in to views
				dashboardViews.renderGraph(sessions);
				// -Render Current Streak
				dashboardViews.currentStreak(sessions);
			});
		});
	}
};

import courseHomeViews from '../views/course-home-views.js';

export const courseHome = {
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB
			// Sets: Course List on Course Home page
			dbRef
				.collection('courses')
				.where('archived', '==', false)
				.get()
				.then(function(querySnapshot) {
					const courses = [];
					querySnapshot.forEach(doc => {
						// Uses destructuring to get data from each course
						const { color, date, name, archived } = doc.data();
						// Gets Course's Sessions
						const sessions = doc.data().sessions;
						const id = doc.id;
						// Adds data to course object
						const course = {
							id       : id,
							name     : name,
							color    : color,
							date     : date,
							archived : archived,
							sessions : sessions
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

import courseArchivedViews from '../views/course-archived-views.js';

export const courseArchived = {
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB
			// Sets: Course List on Course Home page
			dbRef
				.collection('courses')
				.where('archived', '==', true)
				.get()
				.then(function(querySnapshot) {
					const courses = [];
					querySnapshot.forEach(doc => {
						// Uses destructuring to get data from each course
						const { color, date, name, archived } = doc.data();
						// Gets Course's Sessions
						const sessions = doc.data().sessions;
						const id = doc.id;
						// Adds data to course object
						const course = {
							id       : id,
							name     : name,
							color    : color,
							date     : date,
							archived : archived,
							sessions : sessions
						};
						// adds course object to array
						courses.push(course);
					});
					// Imported From Views, passes in array of courses
					courseArchivedViews.renderCourseList(courses);
				});
		});
	}
};

import courseDetailsViews from '../views/course-details-views.js';

export const courseDetails = {
	// TODO: Get details of that course, render view
	readDB : function(courseID) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB
			// Sets: Course List on Course Home page
			dbRef
				.collection('courses')
				.doc(courseID)
				.get()
				.then(querySnapshot => {
					const { sessions, name, color } = querySnapshot.data();
					courseDetailsViews.renderDetails(sessions, name, color);
				});
		});
	}
};

export const courseAdd = {
	writeDB : function(course) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);
			// Params: Course object from course-add Controller
			// Writes: New course to course collection of database
			dbRef
				.collection('courses')
				.doc()
				.set(
					// uses Course object param as value
					{
						name     : course.name,
						color    : course.color,
						date     : course.date,
						archived : course.archived
					},
					{
						merge : true
					}
				)
				.then(() => {
					window.location.href = '/public/course-home.html';
				});
		});
	}
};

export const courseEdit = {
	// TODO: Fill the edit form with current data

	editCourse   : function(courseID) {
		console.log('hi');
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);
			var archiveCourse = document.getElementById('archiveCourse');
			var archived = archiveCourse.checked;

			// Reference to a specific course given the id
			dbRef.collection('courses').doc(courseID).update(
				// Accesses the course object with parameters to update
				{
					name     : courseName.value,
					color    : courseColor.value,
					date     : new Date(),
					archived : archived
				}
			);
		});

		console.log('new name: ' + courseName.value);
		console.log('new color: ' + courseColor.value);
	},

	// TODO: Add Delete Functions

	deleteCourse : function(courseID) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Reference to a specific course given the id
			dbRef
				.collection('courses')
				.doc(courseID)
				.delete()
				.then(function() {
					// success
					console.log('Document successfully deleted!');
				})
				.catch(function(error) {
					// error
					console.error('Error removing document: ', error);
				});
		});
	}
};

import sessionAddViews from '../views/session-add-views.js';

export const sessionAdd = {
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB
			// Sets: Course Select Options on Session Add page
			dbRef
				.collection('courses')
				.where('archived', '==', false)
				.get()
				.then(function(querySnapshot) {
					const courses = [];
					querySnapshot.forEach(doc => {
						// Uses destructuring to get data from each course
						const { color, name, archived } = doc.data();
						// Gets Course's Sessions
						const id = doc.id;
						// Adds data to course object
						const course = {
							id       : id,
							name     : name,
							color    : color,
							archived : archived
						};
						// adds course object to array
						courses.push(course);
					});
					// Imported From Views, passes in array of courses
					sessionAddViews.renderCourseSelect(courses);
				});
		});
	}
};

/*** Firestore Database ENDS ***/
