import { Form, FormGroup, Label, Input, Container, Button, Alert } from 'reactstrap'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { signup, isLoading, error } = useSignup()

	const handleSubmit = async (e) => {
		e.preventDefault()
		await signup(email, password)
	}

	return (
		<div className='container'>
			<Container style={{ width: '350px' }} className='px-5 py-4 rounded shadow-lg bg-light'>
				<Form>
					<FormGroup>
						<Label for='email'>Email</Label>
						<Input
							type='email'
							value={email}
							id='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='email'>Password</Label>
						<Input
							type='password'
							value={password}
							id='email'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Button onClick={handleSubmit} disabled={isLoading}>
							Sign Up
						</Button>
					</FormGroup>
					{error && (
						<FormGroup>
							<Alert color='danger'>{error}</Alert>
						</FormGroup>
					)}
				</Form>
			</Container>
		</div>
	)
}

export default SignUp
