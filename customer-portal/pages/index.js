import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
} from "firebase/auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import { auth } from "../libs/firebase";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default function Home() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const firebaseUser = auth.currentUser;
		if (firebaseUser) {
			setUser(firebaseUser);
		} else {
			auth.onAuthStateChanged((user) => {
				if (user) {
					setUser(user);
				} else {
					console.log("You are not logged in");
					setUser(null);
				}
				setLoading(false);
			});
		}
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Head>
				<title>Customer Portal</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Hello Customer</h1>

			{user != null ? (
				<div>
					<p>You are logged in as {user.email}</p>
					<button onClick={() => auth.signOut()}>Sign Out</button>

					<h2>Customer Data</h2>
					<p>Customer ID: {user.uid}</p>
					<p>Customer Name: {user.displayName}</p>
					<p>Customer Email: {user.email}</p>
				</div>
			) : (
				<div>
					<p>You are not logged in</p>
					<button
						onClick={() => {
							setLoading(true);
							signInWithPopup(auth, provider).then((results) => {
								setLoading(false);
								console.log(results._tokenResponse.idToken);
							});
						}}
					>
						Sign In
					</button>
				</div>
			)}
		</div>
	);
}
