import admin from "../libs/firebase";

export default async function isAuthenticated(req, res, next) {
	try {
		// const sessionCookie = req.cookies.session || "";
		const sessionCookie = req.headers.authorization.split(" ")[1] || "";

		const decodedClaims = await admin
			.auth()
			.verifySessionCookie(sessionCookie, true /** checkRevoked */);

		console.log({ decodedClaims });

		if (decodedClaims) {
			if (decodedClaims?.type == null) {
				res
					.status(400)
					.json({ message: "claims has no types, please contact admin" });
			}
			req.type = decodedClaims.type;
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
