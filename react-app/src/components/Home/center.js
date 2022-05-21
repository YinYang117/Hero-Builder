import React from 'react';
import {useSelector} from 'react-redux';
import Heros from "../Hero";
import Abils from "../Abil";
import "./home.css";

const Center = () => {
	const user = useSelector(state => state.session.user)

	return (
		<div className="cgrid aicen fdcol">
			{user &&
			<h2>
				Welcome to Hero Builder {user.username}!
			</h2>}
			<Heros/>
			<Abils/>
		</div>
	)
}

export default Center;