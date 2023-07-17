const Expense = require('../models/expense')
const mongoose = require('mongoose')

// GET all expenses
const getExpenses = async (req, res) => {
	try {
		const user_id = req.user._id
		const expenses = await Expense.find({ user_id }).sort({ createdAt: -1 })
		res.status(200).json(expenses)
	} catch (err) {
		res.status(400).json(err.message)
	}
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
	const { multiple } = req.query
	const user_id = req.user._id

	try {
		if (multiple === 'true' && Array.isArray(req.body)) {
			const expenses = await Expense.create(
				req.body.map((expense) => ({ ...expense, user_id }))
			)
			res.status(200).json(expenses)
		} else {
			const { title, description, category, amount, date } = req.body
			const expense = await Expense.create({
				title,
				description,
				category,
				amount,
				date,
				user_id,
			})
			res.status(200).json(expense)
		}
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
