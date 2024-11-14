import { useOutletContext, useNavigate } from "react-router-dom";

const Login = () => {
	const { setAuth } = useOutletContext();
	const handleLogin = () => {
		setAuth(true);
	};
	const navigate = useNavigate();
	return (
		<>
			<h1>Login Page</h1>
			<button onClick={handleLogin} className="border-1 border-black rounded-md">
				Authenticate
			</button>
			<br />
			<button
				onClick={() => {
					navigate("/register");
				}}
			>
				Register
			</button>
		</>
	);
};

export default Login;
