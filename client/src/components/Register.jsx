import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

const Register = () => {
	const { setAuth } = useOutletContext();
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { name, email, password } = inputs;
	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password, name };
			const res = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await res.json();
			localStorage.setItem("token", parseRes.token);
			setAuth(true);
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-max h-auto flex flex-col gap-4 items-center justify-center">
				<h1>Register</h1>
				<form className="flex flex-col gap-4 items-center" onSubmit={onSubmitForm}>
					<input
						type="text"
						name="name"
						placeholder="Enter your name"
						className="input input-bordered w-full max-w-xs"
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						className="input input-bordered w-full max-w-xs"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						className="input input-bordered w-full max-w-xs"
						value={password}
						onChange={(e) => onChange(e)}
						required
					/>
					<button>Submit</button>
				</form>
				<Link to="/login">Login</Link>
			</div>
		</div>
	);
};

export default Register;
