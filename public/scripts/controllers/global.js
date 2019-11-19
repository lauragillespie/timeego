import { global } from '../firebase/firebase.js';
import { timerListeners } from '../timer/timer-listeners.js';

// Sets:
// -User's first name in Header
// -Course List in Timer Pop-up
global.readDB();

// Gets Timer Event Listeners
timerListeners();
// TODO:
