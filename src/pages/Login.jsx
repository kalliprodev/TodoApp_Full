import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClassic } from '../config/axios.interceptors'
import {
	loginFulfilled,
	loginPending,
	loginRejected,
} from '../store/reducers/auth.slice'
import { message, Spin } from 'antd'
const Login = () => {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const { loading, token } = useSelector(store => store.auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (token) {
			navigate('/', { replace: true })
		}
	}, [token])

	const onSubmit = e => {
		e.preventDefault()
		dispatch(loginPending())
		axiosClassic
			.post('/api/login', {
				phone,
				password,
			})
			.then(res => {
				dispatch(loginFulfilled(res.data.payload))
				message.success("Authorized successfull!")
				localStorage.setItem('todo-token', res.data.payload.token)
			})
			.catch(err => {
				message.error('Phone or password incorrect!')
				dispatch(loginRejected())
			})
	}

	return (
		<div className='auth-wrapper'>
			<div className='auth-container'>
				<h1 className='auth-title'>Hello, welcome to login page!</h1>

				<form onSubmit={onSubmit} className='auth-form'>
					<input
						onChange={e => setPhone(e.target.value)}
						type='text'
						placeholder='Enter your phone...'
					/>
					<input
						onChange={e => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
					/>


					<Spin spinning={loading}>

					<button type='submit' className='btn btn-primary w-full'>
						Login
					</button>


					</Spin>
				</form>

				<Link className='redirect-link' to={'/register'}>
					You don't have an account? (Register)
				</Link>
			</div>
		</div>
	)
}

export default Login
