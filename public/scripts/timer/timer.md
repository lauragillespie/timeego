on load
-checks local storage
-creates new timer class passing in null or object from localStorage
    -null = paused timer @ 00:00:00, timer button to play, no session class
    -no active session = paused timer @ 00:00:00, timer button to play, no session class
    -active session = timer to time, course select to course, call session class
        -timer paused = nav to timer icon, buttons to play + reset
        -timer active = nav to pause icon, button to pause 

example of local storage object for "timerState"

```json
{	
    "currentlyTiming": true,
	"selectedCourse": { "name": "Anthony", "id": "shWySDVywooCM3tgLU4U" },
	"activeSession": {
		"time": { 
			"seconds": 3, 
			"minutes": 0, 
			"hours": 0 
		}
    }
}

```

## On page load...

### nav
* toggle button
    * timer icon - !currentlyTiming, null localStorage
    * pause - currentlyTiming

### pop-up

* Do we want to open timer pop-up to timer expanded or course list expanded?

### pop-up - time section
* time
    * 00:00:00 - !activeSession, null localStorage, activeSession + !time
    * 12:34:56 - activeSession + time
    * running ? if currentlyTiming then run, else don't run
* buttons
    * play - currentlyTiming = false + activeSession = false
    * play + reset - currentlyTiming = false + activeSession = true (time on timer)
    * pause - currentlyTiming = true

### pop-up - course section
* name of course timing
    * course name - activeSession = true
    * select course - activeSession = false