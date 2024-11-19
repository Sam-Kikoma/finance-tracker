import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};
	const isAuth = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/auth/isVerified", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await res.json();
			parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
		} catch (err) {
			console.error(err.message);
		}
	};
	useEffect(() => {
		isAuth();
	}, []);

	return (
		<div>
			{isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
			<Outlet context={{ setAuth, setIsAuthenticated }} />
			<ToastContainer />
		</div>
	);
};

export default App;
