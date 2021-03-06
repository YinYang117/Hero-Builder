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
			currHero,
			setCurrHero,
			setEditingHero
		} = useContext(HeroContext);

	const buildNewHeroFunc = () => {
		setCurrHero()
		setBuildingNewHero(!buildingNewHero)
		setEditingHero(false)
	}

	const clickHeroPortrait = (hero) => {
		setCurrHero(hero)
		setBuildingNewHero(false)
		setEditingHero(false)
	}

	const clearHeroSelection = () => {
		setCurrHero()
		setBuildingNewHero(false)
		setEditingHero(false)
	}


	return (
		<div className="lgrid fdcol">
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => buildNewHeroFunc()}
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
		{currHero &&
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => clearHeroSelection()}
			>
				Close Hero Details
			</button>}
			{heros &&
			<div>
				{heros?.arr?.map(hero => (
					<div
						key={hero.id}
						className="namePlate hcp fww"
						onClick={e => clickHeroPortrait(hero)}
					>
						{hero.name}
					</div>
				))}
			</div>}
		</div>
	)
}

export default Left;