import admin from "firebase-admin";

let initialized = false;

export const initializeFirebaseAdmin = () => {
  if (initialized) return;

  try {
    // Try to initialize with service account from environment variables
    const firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    // Check if all required fields are present
    if (firebaseConfig.projectId && firebaseConfig.privateKey && firebaseConfig.clientEmail) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
      });
      initialized = true;
      console.log("Firebase Admin initialized successfully");
    } else {
      console.warn("Firebase Admin credentials not fully configured - falling back to token parsing");
    }
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error.message);
  }
};

export const getAuth = () => {
  if (!initialized) {
    initializeFirebaseAdmin();
  }
  return admin;
};

export default admin;
