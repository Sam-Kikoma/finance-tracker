import { useState } from "react";

const Register = () => {
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
			// Continue from here
			const res = await fetch("http://localhost");
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
					/>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						className="input input-bordered w-full max-w-xs"
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						className="input input-bordered w-full max-w-xs"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</form>
				<button>Submit</button>
			</div>
		</div>
	);
};

export default Register;
