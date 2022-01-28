import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

const Login = () => {
	const [creds, setCreds] = useState({
		username: '',
		password: ''
	});
	const [error, setError] = useState('');
	const { push } = useHistory();

	const handleChange = e => {
		const { name, value } = e.target;
		setCreds((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		});
	}

	const onSubmit = e => {
		e.preventDefault();
		axios.post('http://localhost:9000/api/login', creds)
			.then(resp => {
				console.log(resp);
				localStorage.setItem('token', resp.data.token);
				push('/view');
			})
			.catch(err => {
				console.error(err);
				setError(err.message);
			})
	}

	return(
		<ComponentContainer>
			<ModalContainer>
				<h1>Welcome to Blogger Pro</h1>
				<h2>Please enter your account information.</h2>
			</ModalContainer>
			<FormGroup onSubmit={onSubmit}>
				<Input 
					type='text'
					id='username'
					name='username'
					onChange={handleChange}
					placeholder='Enter username'
				/>
				<Input 
					type='password'
					id='password'
					name='password'
					onChange={handleChange}
					placeholder='Enter password'
				/>
				<Button id='submit' type='submit' >Log In</Button>
			</FormGroup>
			{error && <p id='error'>Error: {JSON.stringify(error)}</p>}
		</ComponentContainer>);
}

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
		flex-direction: column;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 2% 0;
    width:100%;
		margin: 2% 0;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
