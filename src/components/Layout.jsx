import Item from 'antd/es/list/Item'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { logout } from '../store/reducers/auth.slice'
const Layout = () => {
	const { token } = useSelector(state => state.auth)

	if (!token) return <Navigate to='/login' replace={true} />

const dispatch = useDispatch()



	const menuItems = [
		{
			label: "Todos",
			path: '/'
		},
		{
			label: "Create todos",
			path: '/create-todos',
		},
		{
			label: 'Categories',
			path: '/categories',
		},
		{
			label: 'Create categoreis',
			path: '/create-categories'
		}
	]
	const {pathname} = useLocation()
	return (
		<div className='layout'>
			<div className='sidebar'>
				<ul>
					{
						menuItems.map((item) => (
							<li key={item.path}>
								<Link className={item.path === pathname ? 'active' : ''} 
								to={item.path}>
									{item.label}
								</Link>
							</li>
						))
					}
				</ul>


				<h2 onClick={() => {
					dispatch(logout())
}} className='my-[50px] mx-6 text-white cursor-pointer bg-red-600 '> Log out</h2>


			</div>
			<div className='main'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
