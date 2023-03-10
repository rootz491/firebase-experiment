import admin from "../libs/firebase.js";

export const auth = async (req, res) => {
	try {
		const type = req.type;
		if (!type) {
			return res
				.status(400)
				.json({ message: "No type provided, please contact site admin!" });
		}

		const { idToken } = req.body;
		if (!idToken) {
			return res.status(400).json({ message: "No token provided" });
		}

		const decoded = await admin.auth().verifyIdToken(idToken);
		if (!decoded) {
			return res.status(400).json({ message: "Invalid token" });
		}

		const { auth_time } = decoded;

		const user = await admin.auth().getUser(decoded.uid);
		if (!user) {
			return res.status(400).json({ message: "user not found" });
		}

		const { customClaims } = user;

		if (customClaims && customClaims.type != type) {
			return res
				.status(400)
				.json({ message: "Try logging in to correct portal" });
		}

		if (type === "customer") {
			await admin.auth().setCustomUserClaims(decoded.uid, { type: "customer" });
		} else if (type === "business") {
			await admin.auth().setCustomUserClaims(decoded.uid, { type: "business" });
		} else {
			return res
				.status(400)
				.json({ message: "Invalid type, please contact admin" });
		}

		if (customClaims == null) {
			return res.status(200).json({ message: "Success", new: true });
		}

		if (new Date().getTime() / 1000 - auth_time > 5 * 60) {
			return res.status(400).json({ message: "Provided old token" });
		}

		const cookie = await admin.auth().createSessionCookie(idToken, {
			expiresIn: 60 * 60 * 24 * 5 * 1000,
		});
		if (!cookie) {
			return res.status(400).json({ message: "Failed to create session" });
		}

		// res.cookie("session", cookie, {
		// 	maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days
		// httpOnly: true,
		// secure: true,
		// sameSite: "none",
		// });

		res.status(200).json({ message: "Success", token: cookie });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
