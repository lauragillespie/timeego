/*** Imports ***/

// Importing firebase config object
import { firebaseConfig } from './firebaseConfig.js';
// Importing firebase auth config
import { uiConfig } from './firebaseAuth.js';

/*** Imports ENDS ***/

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

/** Adds a Course **/

export const writeDB = {
	// Retrieves the course name and color selected by the user
	addCourse : function() {
		// for an <input type='text'> with id = 'courseName'
		var courseName = document.getElementById('courseName');
		// for an <input type='color'> with id = 'courseColor'
		var courseColor = document.getElementById('courseColor');
		var courseDate = new Date();

		// for a <form> with an id = 'courseForm'
		// if no courses have been added yet, creates a course collection for the user
		// submit: adds course documents with a name, color, and date to the course collection
		document
			.getElementById('courseForm')
			.addEventListener('submit', function(e) {
				e.preventDefault();
				console.log(e);
				firebase.auth().onAuthStateChanged(function(user) {
					db
						.collection('users')
						.doc(user.uid)
						.collection('courses')
						.doc()
						.set(
							{
								course : {
									name  : courseName.value,
									color : courseColor.value,
									date  : courseDate
								}
							},
							{
								merge : true
							}
						);
				});
				window.location.href = './course-home.html';
			});
	}
};
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
	},
	// Function that creates a new document in the users collection
	getCurrentUser : function() {
		// if the current user logged in user
		// is authenticated, then grab "uid" "displayName" and "email"
		// use "set()" with merge (if document did not exist it will be created)
		firebase.auth().onAuthStateChanged(function(user) {
			db.collection('users').doc(user.uid).set(
				{
					name  : user.displayName,
					email : user.email
				},
				{ merge: true }
			);
			// Prints welcome message for active user
			db.collection('users').doc(user.uid).onSnapshot(function(snap) {
				// Current User Data
				const currentUser = snap.data();
				// Current User Name
				const name = currentUser.name;
				// Current User Name with first letter in Upper Case
				const upperCaseName = name[0].toUpperCase() + name.substring(1);
				// Splits first name
				const firstName = upperCaseName.split(' ')[0];
				// Sets Users Name in Header
				document.getElementById(
					'header__username'
				).innerText = `Hi, ${firstName}`;
				// Sets Users Name in Dashboard Greeting
				document.getElementById(
					'page-heading__username'
				).innerText = firstName;
			});
		});
		// const user = firebase.auth().createUser;
		// console.log(user);
	}
};

/*** Firestore Database ENDS ***/
