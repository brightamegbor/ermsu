import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");

admin.initializeApp();

exports.blockSignup = functions.auth.user().onCreate((event) => {
  console.log("event", event);

  return admin.auth().deleteUser(event.uid);
});
