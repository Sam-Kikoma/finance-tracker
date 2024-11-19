import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
	const { setAuth } = useOutletContext();
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { email, password } = inputs;
	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await res.json();
			if (parseRes.token) {
				setAuth(true);
				localStorage.setItem("token", parseRes.token);
				toast.success("Logged in successfully");
			} else {
				setAuth(false);
				toast.error(parseRes);
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen flex-col">
			<div className="w-max h-auto">
				<h1>Login</h1>
			</div>
			<div>
				<form className="flex flex-col" onSubmit={onSubmit}>
					<input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => onChange(e)} />
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => onChange(e)}
					/>
					<button>Submit</button>
				</form>
				<Link to="/register">Register</Link>
			</div>
		</div>
	);
};

export default Login;
