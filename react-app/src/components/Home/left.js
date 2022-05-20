import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import "./home.css"

const Left = () => {
	const heros = useSelector(state => state.heros)

	const { showHeroPortraits,
			setShowHeroPortraits,
			buildingNewHero,
			setBuildingNewHero,
			setCurrHero
			} = useContext(HeroContext);


	return (
		<div className="lgrid">
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => setBuildingNewHero((!buildingNewHero))}
			>
				Build New Hero
			</button>
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => setShowHeroPortraits(!showHeroPortraits)}
			>
				Toggle All Heros
			</button>
			{heros &&
			<div>
				{heros?.arr?.map(hero => (
					<div
						key={hero.id}
						className="namePlate hcp"
						onClick={e => setCurrHero(hero)}
					>
						{hero.name}
					</div>
				))}
			</div>}
		</div>
	)
}

export default Left;