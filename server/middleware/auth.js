import admin from "../libs/firebase.js";

export default async function isAuthenticated(req, res, next) {
	try {
		// const sessionCookie = req.cookies.session || "";
		const sessionCookie = req.headers.authorization.split(" ")[1] || "";

		if (!sessionCookie) {
			res.status(401).json({ message: "Unauthorized" });
		}

		const decodedClaims = await admin
			.auth()
			.verifySessionCookie(sessionCookie, true /** checkRevoked */);

		if (decodedClaims) {
			if (decodedClaims?.type == null) {
				res
					.status(400)
					.json({ message: "claims has no types, please contact admin" });
			}
			req.user = {
				uid: decodedClaims.uid,
				type: decodedClaims.type,
				email: decodedClaims.email,
			};
			next();
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Internal server error", dev: "auth-middleware" });
	}
}
