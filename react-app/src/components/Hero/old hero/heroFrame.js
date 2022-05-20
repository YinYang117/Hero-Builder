import React, { useContext } from 'react';
import { HeroContext } from '../../context/HeroContext';
import './home.css';

const HeroFrame = ({hero, heroAbil}) => {
	const { setCurrHero } = useContext(HeroContext);
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	const selectHero = () => {
		setCurrHero(hero)
	}
	
	return (

	)
}

export default HeroFrame;