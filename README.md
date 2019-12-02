# Timeego

Comp 1930 Project that tracks a student's study time.

## Hosted on firebase

Hosted on https://timeego-d54c4.firebaseapp.com

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

## Need To Do

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
* [ ] courseAdd/edit
    * [ ] Stretch - add char limit to course name?

### Models - Database
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


### Views - Dynamic HTML from DB
* [ ] Dashboard
    * [ ] Graph
        * [ ] Write instructions for when graph isn't there

* [ ] Course Details page
    * [ ] Fix message when no sessions.

* [ ] Course Edit page
    * [ ] Add course info from DB to form values

### Timer
* [ ] Stretch - Fix CSS for landscape mode phones
* [ ] Stretch - Fix Course button on firefox




