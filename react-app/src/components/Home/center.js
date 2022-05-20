import React from 'react';
import Heros from "../Hero"
import Abils from "../Abil"
import "./home.css"

const Center = ({
	showHeroPortraits, 
	showAbilPortraits,
	buildingNewHero,
	setBuildingNewHero,
	buildingNewAbil,
	setBuildingNewAbil,
}) => {

	return (
		<>
			<Heros
				showHeroPortraits={showHeroPortraits}
				buildingNewHero={buildingNewHero}
				setBuildingNewHero={setBuildingNewHero}
			/>
			<Abils
				showAbilPortraits={showAbilPortraits}
				buildingNewAbil={buildingNewAbil}
				setBuildingNewAbil={setBuildingNewAbil}
			/>
		</>
	)
}

export default Center;