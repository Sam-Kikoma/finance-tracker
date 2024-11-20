import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";

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
			toast.success("Account was created");
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
				<h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Register</h1>
				<form className="space-y-6" onSubmit={onSubmitForm}>
					{/* Name Input */}
					<div className="flex flex-col">
						<label htmlFor="name" className="mb-1 font-semibold text-gray-800">
							Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Enter your name"
							className="border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 transition duration-300"
							value={name}
							onChange={onChange}
							required
						/>
					</div>

					{/* Email Input */}
					<div className="flex flex-col">
						<label htmlFor="email" className="mb-1 font-semibold text-gray-800">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							className="border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 transition duration-300"
							value={email}
							onChange={onChange}
							required
						/>
					</div>

					{/* Password Input */}
					<div className="flex flex-col">
						<label htmlFor="password" className="mb-1 font-semibold text-gray-800">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							className="border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 transition duration-300"
							value={password}
							onChange={onChange}
							required
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition duration-300"
					>
						Register
					</button>
				</form>

				{/* Login Link */}
				<p className="text-center mt-4 text-gray-600">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
