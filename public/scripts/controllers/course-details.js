import { courseDetails } from '../models/firebase.js';
import helpers from './helpers-controllers.js';

// Gets Course ID from URL via helper function
const courseID = helpers.parseURL();

// Sets nav tabs to link to correct course via helper function
helpers.setNavTabs(courseID);

courseDetails.readDB(courseID);
