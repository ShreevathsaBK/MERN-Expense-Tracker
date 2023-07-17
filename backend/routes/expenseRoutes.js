const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
	createExpense,
	getExpenses,
	getExpense,
	deleteExpense,
	updateExpense,
} = require('../controllers/expenseController')

const router = express.Router()

// middleware auth
router.use(requireAuth)

router.get('/', getExpenses)

router.get('/:id', getExpense)

router.post('/', createExpense)

router.patch('/:id', updateExpense)

router.delete('/:id', deleteExpense)

module.exports = router
