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
			<div>
				These are all your Heros
				{/* TODO CSS here */}
			</div>
			<div className="fdrow fww" >
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
		</>
	)
}

export default AllHeroPortraits;