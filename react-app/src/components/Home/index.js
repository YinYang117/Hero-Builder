import React, { useEffect, useState } from 'react';
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
	const heros = useSelector(state => state.heros)
	const abils = useSelector(state => state.abilities)

	// State Manager
	const [showHeroPortraits, setShowHeroPortraits] = useState(false);
	const [showAbilPortraits, setShowAbilPortraits] = useState(false);
	const [buildingNewHero, setBuildingNewHero] = useState(false);
	const [buildingNewAbil, setBuildingNewAbil] = useState(false);

	// Load all Heros and Abils for user
	useEffect(() => {
		if (!user) <Redirect to='/' />
		dispatch(fetchUserHeros(user))
		dispatch(fetchUserAbilities(user))
	}, [user, dispatch])

	return(
		<div className="homeContainer">
			<div className="cgrid jccen">
				{user &&
				<h1>
					Welcome to Hero Builder {user.username}!
				</h1>}
			</div>
			<Left className="lgrid"
				showHeroPortraits={showHeroPortraits}
				setShowHeroPortraits={setShowHeroPortraits}
				buildingNewHero={buildingNewHero}
				setbuildingNewHero={setBuildingNewHero}
				heros={heros}
			/>
			<Center className="cgrid"
				showHeroPortraits={showHeroPortraits}
				showAbilPortraits={showAbilPortraits}
				buildingNewHero={buildingNewHero}
				setbuildingNewHero={setBuildingNewHero}
				buildingNewAbil={buildingNewAbil}
				setbuildingNewAbil={setBuildingNewAbil}
			/>
			<Right className="rgrid"
				showAbilPortraits={showAbilPortraits}
				setShowAbilPortraits={setShowAbilPortraits}
				buildingNewAbil={buildingNewAbil}
				setBuildingNewAbil={setBuildingNewAbil}
				abils={abils}
			/>
		</div>
	)
}

export default Home;