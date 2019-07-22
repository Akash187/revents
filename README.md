# Re-events
---

## Project Purpose:

This project was built to practice my ReactJS, Redux and Firebase Skill. It is a website to create and join events with full CRUD funtionalities. The project use Redux for state management and Firebase firestore to store data at backend.

## Tools and Skills Used
1. ReactJS
2. React Router
3. Semantic UI React
4. React Hooks
5. Redux
6. Firebase Authentication
7. Firebase Firestore
8. Firebase Functions
9. Here Maps
10. Formik(to manage forms)

## How to Load the App

You can run a hosted version of the app at [https://re-events.netlify.com/](https://re-events.netlify.com/)

The project uses Node.js and the Create-React-App starter. If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app

```
git clone https://github.com/Akash187/manchester_city.git
npm install
```

Create a Firebase App and put the keys and secret in a .env file in the root of project. See the example below. Also get here maps app-id and app-code.
```
REACT_APP_FIREBASE_API_KEY=AIzaSyBjuzodfdsjkKDFfkdk2oJYUX9dEaU
REACT_APP_FIREBASE_AUTH_DOMAIN=client-panel-12e45.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://client-panel-12e45.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=client-panel-12e45
REACT_APP_FIREBASE_STORAGE_BUCKET=client-panel-12e45.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=2412e4546937
REACT_APP_HERE_MAPS_APP_ID=41vHI9jzlfgthkukEzgw
REACT_APP_HERE_MAPS_APP_CODE=JX43Cz50werRHkBrxyD7yw
```

Once all of the dependencies have been installed you can launch the app with

```
npm start
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser