//*****************************************************************************
// Firebase
//*****************************************************************************
//
// This file hold all the firebase/firestore logic.
//
// It initializes the firebase app, sets up auth, and starts firestore.
//
// Each page in the app has it's own exported object in this file. The
// objects are imported into that pages controller, which calls
// the methods to trigger calls to the database.
//
// Once the database calls complete, views may be called to render dynamic
// HTML elements on page.
//
//*****************************************************************************

// Importing firebase config object from config file
import { firebaseConfig, uiConfig } from '../config/firebaseConfig.js';

//*****************************************************************************
// Initialize Firebase App
//*****************************************************************************
firebase.initializeApp(firebaseConfig);

//*****************************************************************************
// Firebase Auth
//*****************************************************************************
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
// This is only needed on login page, needed for login
export const firebaseAuth = {
	authUI : function() {
		ui.start('#firebaseui-auth-container', uiConfig);
	}
};

//*****************************************************************************
// Firestore
//*****************************************************************************
// There is one object per page below. That object is
// imported by that pages controller.
//
// This object talks to the db and sorts the data.
//
// Then, this object calls the associated functions from views to
// render any dynamic HTML elements needed for that page.
//*****************************************************************************

// Initialize Firestore database
const db = firebase.firestore();

//*****************************************************************************
// Importing Views Files
//*****************************************************************************
import { timerViews, headerViews } from '../views/global-views.js';
import dashboardViews from '../views/dashboard-views.js';
import courseHomeViews from '../views/course-home-views.js';
import courseArchivedViews from '../views/course-archived-views.js';
import courseDetailsViews from '../views/course-details-views.js';
import courseEditViews from '../views/course-edit-views.js';
import sessionAddViews from '../views/session-add-views.js';

//*****************************************************************************
// Global Firestore Object - Called on every page
//*****************************************************************************
export const global = {
	//*****************************************************************************
	// Reads From Database
	// 	- Redirects user to homepage if not logged in.
	// 	- Sets users first name in header
	// 	- Sets Course list in timer pop-up
	//*****************************************************************************
	readDB        : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// If no user is currently logged in, redirects to sign in page
			if (!user) {
				window.location.href = './index.html';
			}
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// If the current user logged in, user is authenticated
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

			// Gets: Course Data From DB, filters out archived courses.
			// Sets: Course List in Timer Pop Up
			dbRef.collection('courses').where('archived', '==', false).get().then(function(querySnapshot) {
				const courses = [];
				querySnapshot.forEach((doc) => {
					// Uses destructuring to get data from each course
					const { color, date, name } = doc.data();
					const id = doc.id;
					// Adds data to course object
					const course = {
						id    : id,
						name  : name,
						color : color,
						date  : date
					};
					// Adds course object to array
					courses.push(course);
				});
				// Passes completed Array of courses into views method
				timerViews.renderCourseList(courses);
			});
		});
	},
	//*****************************************************************************
	// Saves completed session from timer pop up to Database. Method is called
	// by /models/stopwatch.js.
	//
	// Params: Session from timer pop-up
	//*****************************************************************************
	createSession : function(session) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);
			// Params: Session object from Stopwatch Class
			// Writes: New session to session collection of database
			dbRef
				.collection('sessions')
				.add(
					// Adds session data to sessions collection.
					{
						course : session.course,
						date   : session.date,
						time   : session.time
					}
				)
				.then((docRef) => {
					console.log('Session DB write successful');
				})
				.catch((error) => {
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
						sessions : firebase.firestore.FieldValue.arrayUnion({
							time : session.time,
							date : session.date
						})
					})
					.catch((e) => console.log(e));
			}
		});
	},
	//*****************************************************************************
	// Logs current user out of app. Redirects to login page. Called by
	// /controllers/global.js.
	//
	//*****************************************************************************
	logOut        : function() {
		firebase
			.auth()
			.signOut()
			.then(function() {
				window.location.href = '/index.html';
			})
			.catch(function(error) {
				console.log(error);
			});
	}
};

//*****************************************************************************
// Dashboard Firestore Object
//*****************************************************************************
export const dashboard = {
	//*****************************************************************************
	// Reads From Database
	// 	- Set user's first name in dashboard heading
	// 	- Sets Dashboard graph/welcome message
	// 	- Sets current Streak on Dashboard
	//*****************************************************************************
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
				querySnapshot.forEach((doc) => {
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
				});
				// Imported From Views, passes in array of sessions to:
				// -Render Dashboard Graph
				dashboardViews.renderGraph(sessions);
				// -Render Current Streak
				dashboardViews.currentStreak(sessions);
			});
		});
	}
};

//*****************************************************************************
// Course Home Firestore Object
//*****************************************************************************
export const courseHome = {
	//*****************************************************************************
	// Reads From Database
	//	- Sets List of active courses on course home page
	//*****************************************************************************
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB, filters out archived courses.
			// Sets: Course List on Course Home page
			dbRef.collection('courses').where('archived', '==', false).get().then(function(querySnapshot) {
				const courses = [];
				querySnapshot.forEach((doc) => {
					// Uses destructuring to get data from each course
					const { color, date, name, sessions } = doc.data();
					const id = doc.id;
					// Adds data to course object
					const course = {
						id       : id,
						name     : name,
						color    : color,
						date     : date,
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

//*****************************************************************************
// Course Archived Firestore Object
//*****************************************************************************
export const courseArchived = {
	//*****************************************************************************
	// Reads From Database
	//	- Sets List of archived courses on course archived page
	//*****************************************************************************
	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB, filters out active courses
			// Sets: Course List on Course Home page
			dbRef.collection('courses').where('archived', '==', true).get().then(function(querySnapshot) {
				const courses = [];
				querySnapshot.forEach((doc) => {
					// Uses destructuring to get data from each course
					const { color, date, name, sessions } = doc.data();
					const id = doc.id;
					// Adds data to course object
					const course = {
						id       : id,
						name     : name,
						color    : color,
						date     : date,
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

//*****************************************************************************
// Course Details Firestore Object
//*****************************************************************************
export const courseDetails = {
	//*****************************************************************************
	// Reads From Database
	// 	- Sets Info on course details page
	//*****************************************************************************
	readDB : function(courseID) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data about specific course From DB
			// Sets: Sets header, color and Session List on Course Details page
			dbRef.collection('courses').doc(courseID).get().then((querySnapshot) => {
				const { sessions, name, color } = querySnapshot.data();
				courseDetailsViews.renderDetails(sessions, name, color);
			});
		});
	}
};

//*****************************************************************************
// Course Add Firestore Object
//*****************************************************************************
export const courseAdd = {
	//*****************************************************************************
	// Saves new course to Database. Method is called by /controllers/course-add.js.
	//
	// Params: Object holding course info
	//*****************************************************************************
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
						name     : course.name.trim().substring(0, 16),
						color    : course.color,
						date     : course.date,
						archived : course.archived
					},
					{
						merge : true
					}
				)
				// Redirects user after course is added
				.then(() => {
					window.location.href = './course-home.html';
				});
		});
	}
};

//*****************************************************************************
// Course Edit Firestore Object
//*****************************************************************************
export const courseEdit = {
	//*****************************************************************************
	// Reads From Database
	// 	- Sets Info on course Edit page
	//*****************************************************************************
	readDB       : function(courseID) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data about specific course From DB
			// Sets: Sets header, color and Session List on Course Edit page
			dbRef.collection('courses').doc(courseID).get().then((querySnapshot) => {
				const { name, color, archived } = querySnapshot.data();
				courseEditViews.renderDetails(name, color);
				courseEditViews.fillForm(name, color, archived);
			});
		});
	},
	//*****************************************************************************
	// Updates specific course info in database, then redirects to course list.
	// Method is called by /controllers/course-edit.js.
	//
	// Params: Object holding course info
	//*****************************************************************************
	editCourse   : function(course) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Finds specific course
			dbRef
				.collection('courses')
				.doc(course.id)
				.update(
					// Updates the course using passed in object parameter
					{
						name     : course.name.trim().substring(0, 16),
						color    : course.color,
						archived : course.archived
					}
				)
				.then(() => {
					// Displays Save confirmation alert, redirects after 1 sec
					const saved = document.querySelector('.edit_success');
					saved.classList.add('edit_success_active');

					setTimeout(function() {
						saved.classList.remove('edit_success_active');
						window.location.href = './course-home.html';
					}, 1000);
				})
				.catch((e) => {
					console.log(e);
				});
		});
	},

	//*****************************************************************************
	// Deletes selected course.
	// Method is called by /controllers/course-edit.js.
	//
	// Params: Course ID
	//*****************************************************************************
	deleteCourse : function(courseID) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Reference to a specific course given the id
			dbRef.collection('courses').doc(courseID).delete().catch(function(error) {
				// error
				console.error('Error removing document: ', error);
			});
		});
	}
};

//*****************************************************************************
// Session Add Firestore Object
//*****************************************************************************
export const sessionAdd = {
	//*****************************************************************************
	// Reads From Database
	// 	- Sets Course Select Options on Add Session Form
	//*****************************************************************************
	readDB  : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// Gets: Course Data From DB, filters out archived courses
			// Sets: Course Select Options on Session Add page
			dbRef.collection('courses').where('archived', '==', false).get().then(function(querySnapshot) {
				const courses = [];
				querySnapshot.forEach((doc) => {
					// Uses destructuring to get data from each course
					const { color, name } = doc.data();
					// Gets Course's Sessions
					const id = doc.id;
					// Adds data to course object
					const course = {
						id    : id,
						name  : name,
						color : color
					};
					// adds course object to array
					courses.push(course);
				});
				// Imported From Views, passes in array of courses
				sessionAddViews.renderCourseSelect(courses);
			});
		});
	},
	//*****************************************************************************
	//
	//
	// Params: Object holding course info
	//*****************************************************************************
	writeDB : function(session) {
		firebase.auth().onAuthStateChanged(function(user) {
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);
			// Params: Course object from course-add Controller
			// Writes: New course to course collection of database
			dbRef
				.collection('sessions')
				.doc()
				.set(
					// uses Course object param as value
					{
						course : {
							id : session.courseID
						},
						time   : {
							minutes : session.time.minutes
						},

						date   : session.date
					},
					{
						merge : true
					}
				)
				// Redirects user after course is added
				.then(() => {
					window.location.href = './course-home.html';
				});
		});
	}
};
