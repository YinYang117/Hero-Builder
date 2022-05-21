import React, { useContext } from 'react';
import { AbilContext } from "../../context/AbilContext";
import "./abil.css";

const ChooseAbilImage = () => {
	const { abilStockImages, setAbilImage } = useContext(AbilContext);


	return (
		<>
			{abilStockImages.map(img => (
				<div className="hcp abilFrame"
					onClick={e => setAbilImage(img)}
				>
					<img
						className="abilFrameImg"
						src={img}
						alt="newAbilityChoice"
					/>
				</div>
			))}
		</>
	)
}

export default ChooseAbilImage;