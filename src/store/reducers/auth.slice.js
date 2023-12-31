import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		loading: false,
		name: '',
		phone: '',
		token: localStorage.getItem('todo-token') || null,
	},




	reducers: {
		loginPending: state => {
			state.loading = true
		},
		loginFulfilled: (state, action) => {
			state.name = action.payload.name
			state.phone = action.payload.phone
			state.token = action.payload.token
			state.loading = false
		},
		loginRejected: state => {
			state.loading = false
		},
		logout: state => {
			state.loading = false
			state.name = ''
			state.phone = ''
			state.token = null
			localStorage.removeItem('todo-token')
		}
	},
})

export const { loginPending, loginFulfilled, loginRejected, logout } = authSlice.actions
export default authSlice.reducer
