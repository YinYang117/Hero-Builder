import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import "./hero.css";

const AllHeroPortraits = () => {
	const heros = useSelector(state => state.heros)

	const { setCurrHero, setEditingHero, setBuildingNewHero } = useContext(HeroContext);

	const setCurrHeroFunc = (hero) => {
		setCurrHero(hero)
		setBuildingNewHero(false)
		setEditingHero(false)
	}


	return (
		<>
			<div className="mt30 mb10 Aflarg">
				These are all your Heros
				{/* TODO CSS here */}
			</div>
			<div className="fdrow fww jccen" >
				{heros?.arr?.map(hero => (
					<div className="hcp heroFrame fdcol jccen aicen"
						onClick={e => setCurrHeroFunc(hero)}
					>
						<img
							className="heroFrameImg"
							src={hero.heroImage}
							alt="heroFrame"
						/>
						<div>{hero.name}</div>
					</div>
				))}
			</div>
			<div className="mb30"></div>
		</>
	)
}

export default AllHeroPortraits;