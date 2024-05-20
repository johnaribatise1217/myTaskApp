/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const next = require('next');

const nextApp = next({
  dev: false,
  conf: { distDir: '.next' }
});

const handle = nextApp.getRequestHandler();

exports.ssrYourProjectName = functions.https.onRequest((req: any, res: any) => {
  return nextApp.prepare().then(() => handle(req, res));
});
