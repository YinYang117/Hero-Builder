import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import "./home.css"

const Left = ({showHeroPortraits, setShowHeroPortraits, buildingNewHero, setBuildingNewHero}) => {
	const heros = useSelector(state => state.heros)
	const { setCurrHero } = useContext(HeroContext);

	const startNewHero = () => {
		setBuildNewHero(!buildNewHero)
	}

	const showAllHeros = () => {
		setShowHeroPortraits(!showHeroPortraits)
	}

	return (
		<>
			<button
				type="button"
				className="hcp sideButton"
				onClick={startNewHero}
			>
				Build New Hero
			</button>
			<button
				type="button"
				className="hcp sideButton"
				onClick={showAllHeros}
			>
				Toggle All Heros
			</button>
			{heros &&
			<div>
				{heros?.arr?.map(hero => (
					<div key={hero.id}
					className="namePlate hcp"
					onClick={e => setCurrHero(hero)}
					>
						{hero.name}
					</div>
				))}
			</div>}
		</>
	)
}

export default Left;