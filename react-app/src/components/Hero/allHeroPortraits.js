import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import "./hero.css";

const AllHeroPortraits = ({ }) => {
	const heros = useSelector(state => state.heros)

	const { setCurrHero } = useContext(HeroContext);

	const selectHero = (hero) => {
		setCurrHero(hero)
	}

	return (
		<>
			{heros?.arr?.map(hero => (
				<div className="hcp heroFrame fdcol"
					onClick={e => selectHero(hero)}
				>
					<img src={hero.heroImage} alt="heroFrame" className="heroFrameImg" />
					<div className="">{hero.name}</div>
				</div>
			))}
		</>
	)
}

export default AllHeroPortraits;