import React from 'react';
import {useSelector} from 'react-redux';
import Heros from "../Hero";
import Abils from "../Abil";
import "./home.css";

const Center = () => {
	const user = useSelector(state => state.session.user)

	return (
		<div className="cgrid aicen fdcol">
			<div className="mb30"></div>
			<Heros/>
			<Abils/>
		</div>
	)
}

export default Center;