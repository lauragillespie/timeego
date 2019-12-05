//*****************************************************************************
// Login Controller
//*****************************************************************************
//
// This file calls the database to trigger firebase authorization functions
//
//*****************************************************************************

import { firebaseAuth } from '../models/firebase.js';

// Imports Firebase Auth Login Widget
firebaseAuth.authUI();
