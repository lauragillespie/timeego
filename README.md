# Timeego

Comp 1930 Project that tracks a student's study time.

## JavaScript Model

How the JavaScript is organized.

### Controllers

Each HTML only imports controllers. Each page has it's own file. There is also a global.js controller that contains logic used across all pages (header, timer pop-up).

Controllers are the logic of the app. They are where we set up event-listeners (page specific or global), get data from forms, and make calls to our database files.

### Firebase (Models) - Database.

There is one firebase file. If this file gets too cluttered, we can split it into page specific files.

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

## Todos

A list of things left to accomplish.

### Courses
* [ ] Database export objects
    * [ ] writeDB
        * [x] Add Course
        * [ ] Study Session
    * [ ] readDB
        * [ ] user info
        * [x] all courses
        * [ ] individual course - using ID
        * [ ] sessions collection
    * [ ] deleteDB
        * [ ] Delete Course
        * [ ] Delete Session

### HTML + CSS
* [x] Clean up Header
* [x] Clean up "courses home" page
* [x] Clean up "Add Courses" page

* [x] Make "Individual Course" page
* [x] Make "Edit Course" page
    * [x] Should have: Edit, Archive, Delete
* [x] Make "Archived Courses" page
    * [ ] filter courses array, pass into correct page (active/archived)
* [ ] Make "Session" Page
* [ ] Give Course Details Page Content

* [x] Add course option button 
    
* [x] Add link to course list items
    * [ ] redirect to that courses details/edit

* [ ] Make Main "Settings" Page

### Graph

### Stopwatch
* [x] Add "Select Course" button functionality
    * [ ] Make Course li's look nice 
* [ ] Write time to db
* [ ] Add state to track if there is currently a time
    * [ ] Hide Reset Button when there is no time
* [x] Timer "Coming Soon" note
* [x] Rename CSS classes
* [x] Save running status to local storage
* [x] Pull running status from local storage and change icon
* [x] If running:
    * [x] Add animation to toggle button if running
    * [x] Start timer automatically if running
    * [x] load time from local storage
* [x] Store time in local storage



