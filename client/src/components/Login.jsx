import { useOutletContext } from "react-router-dom";

const Login = () => {
	const { setAuth } = useOutletContext();
	const handleLogin = () => {
		setAuth(true);
	};
	return (
		<>
			<h1>Login Page</h1>
			<button onClick={handleLogin} className="border-2 border-black rounded-md">
				Authenticate
			</button>
		</>
	);
};

export default Login;
