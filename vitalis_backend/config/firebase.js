const admin = require('firebase-admin');

// ⚠️ Ensure you place your downloaded serviceAccountKey.json in the config folder
// or provide passing it properly in production.
let serviceAccount;
try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
        serviceAccount = require('./serviceAccountKey.json');
    }
} catch(err) {
    console.warn("⚠️ Firebase serviceAccountKey.json not found or FIREBASE_SERVICE_ACCOUNT env var missing! Firebase Auth won't work.");
}

if (serviceAccount && !admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = admin;
