import React from 'react';
import './home.css';

const NewHeroFrame = () => {

	const newHero = () => {
		return "TODO"
	}

	return (
		<div className="hcp heroFrame fdcol"
		onClick={newHero}
		>
			<div className="heroFrameImg"></div>
			<div className="TODO">New Hero?</div>
		</div>
	)
}

export default NewHeroFrame;