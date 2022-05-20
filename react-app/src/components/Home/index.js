import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUserHeros } from "../../store/heros"
import { fetchUserAbilities } from "../../store/abilities"
import "./home.css"

import Left from './left';
import Center from './center';
import Right from './right';

const Home = () => {
	const dispatch 	= useDispatch();

	const user = useSelector(state => state.session.user)

	// Load all Heros and Abils for user
	useEffect(() => {
		if (!user) <Redirect to='/' />
		dispatch(fetchUserHeros(user))
		dispatch(fetchUserAbilities(user))
	}, [user, dispatch])

	return(
		<>
			<div className="homeContainer">
				<Left />
				<Center/>
				<Right/>
			</div>
		</>
	)
}

export default Home;