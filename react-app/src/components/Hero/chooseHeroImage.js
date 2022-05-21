import React, { useContext } from 'react';
import { HeroContext } from '../../context/HeroContext';
import "./hero.css";

const ChooseHeroImage = () => {
	const { heroStockImages, setHeroImage } = useContext(HeroContext);


	return (
		<>
			<div>
			{/* TODO CSS here */}
				Pick an image for this Hero!
			</div>
			<div className="fdrow fww">
				{heroStockImages.map(img => (
				<div className="hcp heroFrame jccen aicen"
					onClick={e => setHeroImage(img)}
				>
					<img
						className="heroFrameImg"
						src={img}
						alt="newHeroChoice"
					/>
				</div>
				))}
			</div>
		</>
	)
}

export default ChooseHeroImage;