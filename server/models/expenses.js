const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		enum: ["Food", "Transport", "Bills", "Entertainment", "Health", "Other"],
	},
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

expensesSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Expenses = mongoose.model("Expenses", expensesSchema);
module.exports = Expenses;
