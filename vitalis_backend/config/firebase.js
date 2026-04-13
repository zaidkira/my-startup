const admin = require('firebase-admin');

// ⚠️ Ensure you place your downloaded serviceAccountKey.json in the config folder
// or provide passing it properly in production.
let serviceAccount;
try {
    serviceAccount = require('./serviceAccountKey.json');
} catch(err) {
    console.warn("⚠️ Firebase serviceAccountKey.json not found! Firebase Auth won't work locally.");
}

if (serviceAccount && !admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = admin;
