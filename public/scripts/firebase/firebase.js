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
ui.start('#firebaseui-auth-container', uiConfig);

/*** Firebase Auth ENDS ***/

/*** Firestore Database ***/

// Initialize Firestore database
const db = firebase.firestore();

/** Creates a User**/
createUser();

// Function that creates a new document in the users collection
function createUser() {
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
			console.log('Current data is...', snap.data());
			document.getElementById('username').innerHTML = snap.data().name;
		});
	});
}

/** Adds a Course **/
addCourse();

 // Retrieves the course name and color selected by the user
 function addCourse() {

	// for an <input type='text'> with id = 'courseName'
	var courseName = document.getElementById('courseName');
	// for an <input type='color'> with id = 'courseColor'
	var courseColor = document.getElementById('courseColor');
	var courseDate = new Date();

	// for a <form> with an id = 'courseForm'
	// if no courses have been added yet, creates a course collection for the user
	// submit: adds course documents with a name, color, and date to the course collection
	document.getElementById('courseForm').addEventListener('submit', function (e) {

	   console.log(courseName.value);
	   firebase.auth().onAuthStateChanged(function (user) {
		  db.collection("users").doc(user.uid).collection("courses").doc().set({
			 "course": {
				"name": courseName.value,
				"color": courseColor.value,
				"date": courseDate
			 }
		  }, {
			 merge: true
		  });

	   });

	});
 }

 /** Displays Courses **/
 displayCourses();

 function displayCourses() {
	firebase.auth().onAuthStateChanged(function (user) {

	   var dbRef = db.collection("users").doc(user.uid).collection("courses");
	   dbRef.onSnapshot(function (snap) {
		  //console.log(snap);
		  snap.forEach(function (doc) {
			 var color = doc.data().course.color;
			 var courseName = doc.data().course.name
			 console.log(color);
			 var courseContainer = document.createElement("div");
		
			 document.getElementById("course_list").appendChild(courseContainer);
			 var courseData = document.createElement("div");
			 courseContainer.appendChild(courseData);

			 var node = document.createTextNode(courseName);
			 courseData.appendChild(node);


		  });
	   });

	});
 }


/*** Firestore Database ENDS ***/
