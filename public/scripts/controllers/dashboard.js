//*****************************************************************************
// Dashboard Controller
//*****************************************************************************
//
// This file calls the database to the user's name and session information
//
//*****************************************************************************

import { dashboard } from '../models/firebase.js';

// Sets user's first name in dashboard heading, renders dashboard graph
dashboard.readDB();
