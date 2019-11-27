# Timeego

Comp 1930 Project that tracks a student's study time.

## JavaScript File Organization

How the JavaScript is organized.

### Controllers

Each HTML file only imports controllers. Each page has it's own file. There is also a global.js controller that contains logic used across all pages (header, timer pop-up).

Controllers are the logic of the app. They are where we set up event-listeners (page specific or global), get data from forms, and make calls to our database files (models).

### Models - Database

There is one file (firebase.js). If this file gets too cluttered, we can split it into page specific files.

There is an object for each page. There is also an object for global features (timer, header).

The methods in the firebase objects are called by the controller files when they are needed. The firebase methods job is to talk to the database (read, write, update, delete).

When HTML elements need to be rendered, the firebase methods do this by calling the appropriate view (from the views.js file) and passing in the data from the database as a parameter.

### Views

There is one views file. If this file gets too cluttered, we can split it into page specific files.

There is a view object for each page. There is also a view for global elements (timer, header).

Views are called by the methods in the firebase file. They take data from the database, and render the dynamic HTML elements.

The helper functions are functions that are used multiple times in the views file. This helps reduce the code clutter.

### Timer

Ignore this mess for now :P

### Config

Holds Settings (firebase, graph).

## Need Todo

A list of things left to accomplish.

### Controllers
* [ ] courseDetails
    * [ ] parse Course id from url
        * [ ] Pass into models to get course data
        * [ ] Use to update nav tabs with course url
* [ ] courseEdit
    * [ ] parse Course id from url
        * [ ] Pass into models to get course data, populate form
        * [ ] Use to update nav tabs with course url


### Models - Database
* [x] global
    * [x] readDB - Add new user to user DB
    * [x] readDB - Get current user's data From DB
    * [x] readDB - Get users course data From DB
    * [x] writeDB - Saves Session from Timer to Sessions Collection in DB
    * [x] writeDB - Saves Session from Timer to Correct Course Collection in DB
* [ ] dashboard
    * [x] readDB - Get current user's data From DB
    * [ ] readDB - Get Session/Course Data Needed for Graph
    * [ ] readDB - Get Current Streak Data
* [x] courseHome
    * [x] readDB - Get users course data From DB
* [ ] courseArchived
    * [ ] readDB - Get users course data From DB
* [ ] courseDetails
    * [ ] readDB - Get parsed course details from DB
    * [ ] readDB - Get parsed course Sessions from DB
* [x] courseAdd
    * [x] writeDB - Set new course to course collection of db
* [ ] courseEdit
    * [ ] readDB - Get parsed course details from DB
    * [ ] deleteDB - delete course when button is pressed


### Static HTML + CSS
* [ ] Make "Add Session" Page
    * [ ] Form to add new session to DB
* [ ] Make "Settings" Page
    * [ ] Filler, non-functional settings like dark mode, change password
    * [ ] Working logout button
* [ ] Dashboard 
    * [x] Graph Container
    * [ ] Clean up upper dashboard cards

### Views - Dynamic HTML from DB
* [ ] Dashboard
    * [ ] Graph
        * [x] Days of week render dynamically
        * [ ] Render time studied (in mins)
    * [ ] Current Streak
* [ ] Course Archive page
    * [ ] Render Archived Courses
* [ ] Course Details page
    * [ ] Name from DB
    * [ ] Display list of course Sessions
* [ ] Course Edit page
    * [ ] Add course info from DB to form values
    * [ ] Edit button saves updated info to DB
    * [ ] Delete button Deletes course (pop-up confirmation first?)

### Timer
* [ ] Figure out stopwatch buttons/icons


## Done

### HTML/CSS
* [x] Clean up Header
* [x] Clean up "courses home" page
* [x] Clean up "Add Courses" page
* [x] Make "Individual Course" page
* [x] Make "Edit Course" page
    * [x] Should have: Edit, Archive, Delete
* [x] Make "Archived Courses" page
    * [x] filter courses array, pass into correct page (active/archived)
* [x] Add course option button 

* [x] Add link to course list items
    * [x] redirect to that courses details/edit

### Stopwatch
* [x] Add "Select Course" button functionality
    * [x] Make Course li's look nice 
* [x] Write time to db
* [x] Add state to track if there is currently a time
    * [x] Hide Reset Button when there is no time
* [x] Timer "Coming Soon" note
* [x] Rename CSS classes
* [x] Save running status to local storage
* [x] Pull running status from local storage and change icon
* [x] If running:
    * [x] Add animation to toggle button if running
    * [x] Start timer automatically if running
    * [x] load time from local storage
* [x] Store time in local storage
* [x] Comment Stopwatch class
* [x] Comment Session class
* [x] Comment updateTimerElements.js



