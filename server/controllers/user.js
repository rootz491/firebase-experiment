import admin from "../libs/firebase.js";

export const getUser = async (req, res) => {
	try {
		const id = req.user.uid;

		const user = await admin.auth().getUser(id);

		if (!user) {
			return res.status(400).json({ message: "user not found" });
		}

		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
