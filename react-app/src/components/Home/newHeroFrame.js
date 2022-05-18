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
			<div className="fdcol">
				<div className="TODO">Build</div>
				<div className="TODO">New</div>
				<div className="TODO">Hero?</div>
			</div>
		</div>
	)
}

export default NewHeroFrame;