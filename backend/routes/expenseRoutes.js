const express = require('express')

const { createExpense, getExpenses, getExpense, deleteExpense, updateExpense } = require('../controllers/expenseController')

const router = express.Router()

router.get('/', getExpenses)

router.get('/:id', getExpense)

router.post('/', createExpense)

router.patch('/:id', updateExpense)

router.delete('/:id', deleteExpense)

module.exports = router