// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey            : 'AIzaSyAlUAfKSgPwd1WLJ2_vRNQliOZ9Ki9RiJE',
	authDomain        : 'timeego-d54c4.firebaseapp.com',
	databaseURL       : 'https://timeego-d54c4.firebaseio.com',
	projectId         : 'timeego-d54c4',
	storageBucket     : 'timeego-d54c4.appspot.com',
	messagingSenderId : '1035464350924',
	appId             : '1:1035464350924:web:90c8599298e8c8b5d37669'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
var db = firebase.firestore();

// Firebase Auth
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
	callbacks        : {
		signInSuccessWithAuthResult : function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown                     : function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow       : 'popup',
	signInSuccessUrl : 'dashboard.html',
	signInOptions    : [
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl           : 'dashboard.html',
	// Privacy policy url.
	privacyPolicyUrl : 'dashboard.html'
};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
