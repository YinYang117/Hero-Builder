import React from 'react';
import './home.css';

const NewHeroFrame = () => {

	const newHero = () => {
		return "TODO"
	}

	return (
		<div className="hcp heroFrame fdcol aicen jccen"
		onClick={newHero}
		>
			<div className="heroFrameImg"></div>
			<h2 className="TODO">New Hero?</h2>
		</div>
	)
}

export default NewHeroFrame;