require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const expenseRoutes = require('./routes/expenseRoutes')
const userRoutes = require('./routes/userRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
	console.log(req.method, req.path)
	next()
})

// routes
app.use('/app/expenses', expenseRoutes)
app.use('/app', userRoutes)

// db connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// start listening to requests
		app.listen(process.env.PORT, () => {
			console.log('connected to db and listening on PORT 4000')
		})
	})
	.catch((err) => console.log(err))
