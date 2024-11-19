import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
	const [name, setName] = useState("");
	const { setAuth } = useOutletContext();
	const getName = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/auth/dashboard", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await res.json();
			setName(parseRes.user_name);
		} catch (err) {
			console.error(err.message);
		}
	};
	const logOut = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
		toast("Logged out successfully");
	};
	useEffect(() => {
		getName();
	}, []);
	return (
		<>
			<h1>Dashboard</h1>
			<p>Hello {name}</p>
			<button onClick={(e) => logOut(e)}>Logout</button>
		</>
	);
};

export default Dashboard;
