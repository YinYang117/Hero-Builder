import React from 'react';
import Heros from "../Hero";
import Abils from "../Abil";
import "./home.css";

const Center = () => {

	return (
		<div className="cgrid aicen fdcol">
			<div className="mb30"></div>
			<Heros/>
			<Abils/>
		</div>
	)
}

export default Center;