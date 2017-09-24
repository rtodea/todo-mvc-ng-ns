import firebase = require('nativescript-plugin-firebase');

export function init() {
  firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
  }).then(
    (instance) => {
      console.log("firebase.init done");
    },
    (error) => {
      console.log("firebase.init error: " + error);
    }
  );
}