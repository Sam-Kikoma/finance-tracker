import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};
	console.log(isAuthenticated);

	return (
		<div>
			{isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
			<Outlet context={{ setAuth, setIsAuthenticated }} />
		</div>
	);
};

export default App;
