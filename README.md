# FOV return forms system

## How do I run it?

The system is in the development / prototype stage, to run it you must have [Node.js](https://nodejs.org/en) installed on your machine.

1. Make sure you are in the `backend/` folder
   - Run `npm i` & `npm start`
2. Go back and into the `frontend/` folder
   - Run `npm i` & `npm build` and then `npm start`

You can now access [Localhost](http://localhost:3000)

## Functionality

- Overview of existing return forms (for now, only split by completeness)
- Create a new or edit an old return form.
  After saving the form, the system will reevaluate which folder the JSON file should appear in and where it should be displayed in the overview.
- Print forms (from the editing page)
- Delete forms

## System

### Frontend

React application provides an interactive web interface to overview, create, edit or delete forms easily.

### Backend

Nest.js server application responsible for:

- Providing return forms upon request from the web application
- Receiving new or changed forms
- Validating forms (and sending errors handled by the web app)
- Bringing the form to a standard JSON format.
- Saving it in the correct place.
