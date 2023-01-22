import Head from "next/head";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../libs/firebase";
import axios from "../libs/axios";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default function Home() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (auth == null) return;
		const firebaseUser = auth?.currentUser;
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

	const loginWithServer = async (idToken) => {
		try {
			if (idToken == null) return;
			axios
				.post("/api/auth/business", {
					idToken: idToken,
				})
				.then((response) => {
					const newUser = response.data.new;
					if (newUser) {
						auth.currentUser
							.getIdToken(true)
							.then((idToken) => {
								loginWithServer(idToken);
							})
							.catch((error) => {
								alert(
									error?.response?.data?.message || error?.response || error
								);
								signout();
							});
						return;
					}
					const token = response.data.token;
					if (token) {
						localStorage.setItem("token", token);
					}
				})
				.catch((error) => {
					alert(error?.response?.data?.message || error?.response || error);
					signout();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const fetchUserDetails = async () => {
		try {
			axios
				.get("/api/user")
				.then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					alert(error?.response?.data?.message || error?.response || error);
					signout();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const signout = async () => {
		try {
			await auth.signOut();
			localStorage.removeItem("token");
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<Head>
				<title>Business Portal</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Hello Business</h1>

			{user != null ? (
				<div>
					<p>You are logged in as {user.email}</p>
					<button onClick={signout}>Sign Out</button>

					<h2>Business Data</h2>
					<p>Business ID: {user.uid}</p>
					<p>Business Name: {user.displayName}</p>
					<p>Business Email: {user.email}</p>

					<h2>Fetch User Details from Server</h2>
					<button onClick={() => fetchUserDetails()}>Fetch Data</button>
				</div>
			) : (
				<div>
					<p>You are not logged in</p>
					<button
						onClick={() => {
							setLoading(true);
							signInWithPopup(auth, provider).then((results) => {
								setLoading(false);
								const idToken = results._tokenResponse.idToken;
								loginWithServer(idToken);
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
