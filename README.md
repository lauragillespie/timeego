# Timeego

Timeego is a web application designed to help students with track their time spent studying. It allows users to add courses, log their time studying, and view their total study time in each course.

## Project Information

Timeego was built as a group project for [COMP 1930](https://www.bcit.ca/study/outlines/20193045320), a first-term course in the [Computer Systems Technology](https://www.bcit.ca/study/programs/5500dipma#courses) program at [BCIT](https://www.bcit.ca).

Our team consisted of three students.

## Installation

Simply clone the repository from GitHub, and open public/index.html to begin.

## Hosting

Timeego is hosted publicly at https://timeego-d54c4.firebaseapp.com.

## Design Process

### Persona

### Wireframes & Mock-Ups

### Fonts

### Colors

### Icons

## File Structure

### JavaScript

This section explains the JavaScript organization.

#### Controllers

Each HTML file only imports controllers. Each page has it's own file. There is also a global.js controller that contains logic used across all pages (header, timer pop-up).

Controllers are the logic of the app. They are where we set up event-listeners (page specific or global), get data from forms, and make calls to our database files (models).

#### Models - Database

There is one file (firebase.js). If this file gets too cluttered, we can split it into page specific files.

There is an object for each page. There is also an object for global features (timer, header).

The methods in the firebase objects are called by the controller files when they are needed. The firebase methods job is to talk to the database (read, write, update, delete).

When HTML elements need to be rendered, the firebase methods do this by calling the appropriate view (from the views.js file) and passing in the data from the database as a parameter.

#### Views

There is one views file. If this file gets too cluttered, we can split it into page specific files.

There is a view object for each page. There is also a view for global elements (timer, header).

Views are called by the methods in the firebase file. They take data from the database, and render the dynamic HTML elements.

The helper functions are functions that are used multiple times in the views file. This helps reduce the code clutter.

#### Config

Holds Settings (firebase, graph).

### CSS

### HTML

## 3rd Party Tools Used

This is a list of 3rd party resources used in this project:

* [Google Firebase & Firestore](https://firebase.google.com/)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Material Icons](https://material.io/resources/icons/?style=baseline)
* [ApexChart.js](https://apexcharts.com/)
* [Color Picker by G Naga Subrahmanyam](https://codepen.io/GNSubrahmanyam/pen/OpmMjN)


## To Do List

A list of things left to accomplish.

### Controllers
* [ ] courseEdit
    * [ ] parse Course id from url
        * [ ] Pass into models to get course data, populate form
        * [ ] Use to update nav tabs with course url
   
### Models - Database
* [ ] courseEdit
    * [ ] readDB - Get parsed course details from DB
    * [ ] deleteDB - delete course when button is pressed

### Views - Dynamic HTML from DB
* [ ] Course Edit page
    * [ ] Add course info from DB to form values
    * [ ] Update Course Title/Color (Like course details page, can just steal and reuse this code).

### Stretch/Future Goals
* [ ] Stretch - Timer Pop-up - Fix CSS for landscape mode phones.
* [ ] Stretch - Timer Pop-up - Fix Course button on firefox.
* [ ] Stretch - Course Add/Edit - add char limit to course name.
* [ ] Stretch - Add Session Page - add functionality.
* [ ] Stretch - Add Goal tracking to app.




