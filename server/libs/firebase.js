import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

if (serviceAccount == null) {
	throw new Error("serviceAccountKey.json is missing");
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default admin;
