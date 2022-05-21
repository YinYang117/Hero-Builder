import React, { useContext } from 'react';
import { HeroContext } from '../../context/HeroContext';
import "./hero.css";

const ChooseHeroImage = () => {
	const { heroStockImages, setHeroImage } = useContext(HeroContext);


	return (
		<>
			{heroStockImages.map(img => (
				<div className="hcp heroFrame"
					onClick={e => setHeroImage(img)}
				>
					<img
						className="heroFrameImg"
						src={img}
						alt="newHeroChoice"
					/>
				</div>
			))}
		</>
	)
}

export default ChooseHeroImage;