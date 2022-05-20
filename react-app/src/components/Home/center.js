import React from 'react';
import {useSelector} from 'react-redux';
import Heros from "../Hero";
import Abils from "../Abil";
import "./home.css";

const Center = () => {
	const user = useSelector(state => state.session.user)

	return (
		<div className="cgrid jccen">
				{user &&
				<h1 className="cgrid">
					Welcome to Hero Builder {user.username}!
				</h1>}
			<Heros/>
			<Abils/>
		</div>
	)
}

export default Center;