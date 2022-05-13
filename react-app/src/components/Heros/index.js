import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


const HeroDetailsCard = ({hero, heroAbil}) => {
	const dispatch = useDispatch();
	const currHeroAbils = useSelector(state => state.heroAbils)


	return (
		<div className="hero details container">
			<div>
				This will be the detailed hero display
			</div>
		</div>

	)
}

export default HeroDetailsCard;