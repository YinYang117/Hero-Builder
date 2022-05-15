import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


const HeroFrame = ({hero, heroAbil}) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	return (
		<div className="hero details container">
			<div key={hero.id} className="largerAllHeros">
				<div className="heroImage">
					<img src={hero.mainImage} alt="heroImage" />
					<div className="display like a title, or bottom left">{hero.name}</div>
				</div>
			</div>
		</div>
	)
}

export default HeroFrame;