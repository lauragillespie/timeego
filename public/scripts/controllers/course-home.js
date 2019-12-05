//*****************************************************************************
// Course Home Controller
//*****************************************************************************
//
// This file calls the database to get course information.
//
//*****************************************************************************

import { courseHome } from '../models/firebase.js';

// Sets course list
courseHome.readDB();
