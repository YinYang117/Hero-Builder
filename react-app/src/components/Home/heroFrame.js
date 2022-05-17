import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { HeroContext } from '../../context/SelectedHero';
import './home.css';

const HeroFrame = ({hero, heroAbil}) => {
	const dispatch = useDispatch();
	const { currHero, setCurrHero } = useContext(HeroContext);
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	const selectHero = () => {
		setCurrHero(hero)
	}
	
	return (
		<div className="heroFrame"
		onClick={selectHero}
		>
			<div className="largerAllHeros">
				<div className="heroImage">
					<img src={hero.heroImage} alt="heroImage" />
					<div className="">{hero.name}</div>
				</div>
			</div>
		</div>
	)
}

export default HeroFrame;