import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import bgImg from "../assets/bgImg.png";

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
		<div className="flex flex-col justify-center md:flex-row min-h-screen w-full bg-gray-50">
			{/* Left image section */}
			<div className="hidden md:flex md:w-1/2 bg-gray-200">
				<img src={bgImg} alt="Background" className="h-auto object-contain max-w-full rounded-lg shadow-lg" />
			</div>

			{/* Login form */}
			<div className="flex w-full md:w-1/2 justify-center items-center p-6">
				<div className="bg-white text-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm mx-auto">
					<h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>
					<form className="space-y-6" onSubmit={onSubmit}>
						{/* Email Input */}
						<div className="flex flex-col">
							<label htmlFor="email" className="mb-1 font-semibold">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={email}
								onChange={onChange}
								className="border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 transition duration-300"
								placeholder="Enter your email"
							/>
						</div>

						{/* Password Input */}
						<div className="flex flex-col">
							<label htmlFor="password" className="mb-1 font-semibold">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={password}
								onChange={onChange}
								className="border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 transition duration-300"
								placeholder="Enter your password"
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition duration-300"
						>
							Login
						</button>
					</form>

					{/* Register Link */}
					<p className="text-center mt-4 text-gray-600">
						Don&apos;t have an account?{" "}
						<Link to="/register" className="text-blue-500 hover:underline">
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
