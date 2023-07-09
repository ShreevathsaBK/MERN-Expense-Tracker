const Expense = require('../models/expense')
const mongoose = require('mongoose')

// GET all expenses
const getExpenses = async (req, res) => {
	const expenses = await Expense.find({}).sort({ createdAt: -1 })
	res.status(200).json(expenses)
}

// GET single expense
const getExpense = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'invalid id' })
	}

	const expense = await Expense.findById(id)

	if (!expense) {
		return res.status(400).json({ error: 'expense does not exist' })
	}

	return res.status(200).json(expense)
}

// POST new expense
const createExpense = async (req, res) => {
	const { title, description, category, amount, date } = req.body

	try {
		const expense = await Expense.create({ title, description, category, amount, date })
		res.status(200).json(expense)
	} catch (err) {
		res.status(400).json(err.message)
	}
}

// PATCH new expense
const updateExpense = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'invalid id' })
	}

	const expense = await Expense.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

	if (!expense) {
		return res.status(400).json({ error: 'expense does not exist' })
	}

	return res.status(200).json(expense)
}

// DELETE expense
const deleteExpense = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'invalid id' })
	}

	const expense = await Expense.findByIdAndDelete({ _id: id })

	if (!expense) {
		return res.status(400).json({ error: 'expense does not exist' })
	}

	return res.status(200).json(expense)
}

module.exports = {
	createExpense,
	getExpenses,
	getExpense,
	deleteExpense,
	updateExpense,
}
