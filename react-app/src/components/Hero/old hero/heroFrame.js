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
		<div className="hcp heroFrame fdcol"
		onClick={selectHero}
		>
			<img src={hero.heroImage} alt="heroFrame" className="heroFrameImg" />
			<div className="">{hero.name}</div>
		</div>
	)
}

export default HeroFrame;