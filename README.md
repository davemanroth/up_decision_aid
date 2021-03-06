# UP Decision Aid
A researcher at Beth Israel Deaconess Medical Center needed a decision aid to assess the level of knowledge and interest in a new form of pre-exposure prophylactic among a subset of patients. It needed to provide a visually engaging risk assessment based on a number of user-entered criteria and a personalized summary intended to be reviewed with the user's primary care physician.

## Features
The decision aid includes the following components:
* An initial screen with 4 questions
* A risk assessment screen illustrating risk both numerically and visually with a colorful grid
* 5 questions assessing user's values/beliefs
* A print-friendly summary listing all responses/results from previous questions

## File structure
* **process/js:** All React components are stored here. Up_app.js is the root component into which all other components are loaded.
* **builds/app:** Contains directories for css, minified js, and index.html into which minified React app is loaded.
* **builds/app/js:** Contains minified react files, minified up_app file, and all static text files in JSON format used in the decision aid.

## Built with
* React + ES5
* jQuery (loading JSON data files)

## Finished product
The UP decision aid can be viewed [here:](http://understandingprep.org/prep_decision_aid) Username: upuser, password: upuser
