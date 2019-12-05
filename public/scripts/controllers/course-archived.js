//*****************************************************************************
// Course Archive Controller
//*****************************************************************************
//
// This file calls the database to get course information.
//
//*****************************************************************************

import { courseArchived } from '../models/firebase.js';

// Sets archived course list
courseArchived.readDB();
