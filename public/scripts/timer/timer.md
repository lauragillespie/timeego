on load
-checks local storage
-creates new timer class passing in null or object from localStorage
    -null = paused timer @ 00:00:00, timer button to play, no session class
    -no active session = paused timer @ 00:00:00, timer button to play, no session class
    -active session = timer to time, course select to course, call session class
        -timer paused = nav to timer icon, buttons to play + reset
        -timer active = nav to pause icon, button to pause 

local storage object
```js

    timerState : {
        currentlyTiming: true,
        activeSession: {
            time: {
                seconds: 00,
                minutes: 00,
                hours: 00,
            },
            courseName: "String",
            sessionId: use db id
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