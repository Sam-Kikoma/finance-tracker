import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { IoReorderThree } from "react-icons/io5";

const Dashboard = () => {
	const [name, setName] = useState("");
	const [transactions, setTransactions] = useState({ expenseTotal: "", incomeTotal: "" });
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
	const getTransactions = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/auth/transactions", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await res.json();
			setTransactions({ ...transactions, expenseTotal: expensesSum(parseRes), incomeTotal: incomeSum(parseRes) });
		} catch (err) {
			console.error(err.message);
		}
	};
	const expensesSum = (arr) => {
		const expenses = arr.filter((transaction) => transaction.transaction_type.toLowerCase() == "expense");
		const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
		return total;
	};
	const incomeSum = (arr) => {
		const expenses = arr.filter((transaction) => transaction.transaction_type.toLowerCase() == "income");
		const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
		return total;
	};
	const logOut = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
		toast("Logged out successfully");
	};
	useEffect(() => {
		getName();
		getTransactions();
	}, []);
	return (
		<div className="min-h-screen w-full bg-gray-50 text-gray-800 px-2">
			<div className="drawer">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex justify-between py-4">
					{/* Page content here */}
					<label htmlFor="my-drawer">
						<IoReorderThree size={30} />
					</label>
					<button className="btn btn-sm btn-outline" onClick={(e) => logOut(e)}>
						Logout
					</button>
				</div>
				<div className="drawer-side z-10">
					<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-4">
						<li className="mb-4">Fin Trakr</li>
						<li>
							<a>Dashboard</a>
						</li>
						<li>
							<a>Budgets</a>
						</li>
						<li>
							<a>Transaction</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="">
				<p className="capitalize">Hello {name}</p>
			</div>
			<div className="flex flex-col items-center gap-4 md:flex-row md:md:justify-evenly md:px-32 md:mt-4 md:gap-0">
				<div className="card text-primary-content w-3/4 md:w-96 bg-blue-300 shadow-md">
					<div className="card-body items-center text-center">
						<h2 className="card-title">Total Income</h2>
						<p>{transactions.incomeTotal}</p>
					</div>
				</div>
				<div className="card text-primary-content w-3/4 md:w-96 bg-blue-300 shadow-md">
					<div className="card-body items-center text-center">
						<h2 className="card-title">Total Expenses</h2>
						<p>{transactions.expenseTotal}</p>
					</div>
				</div>
				<div className="card text-primary-content w-3/4 md:w-96 bg-blue-300 shadow-md">
					<div className="card-body items-center text-center">
						<h2 className="card-title">Balance</h2>
						<p>{transactions.incomeTotal - transactions.expenseTotal}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
