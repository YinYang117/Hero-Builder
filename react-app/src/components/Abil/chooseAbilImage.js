import React, { useContext } from 'react';
import { AbilContext } from "../../context/AbilContext";
import "./abil.css";

const ChooseAbilImage = () => {
	const { abilStockImages, setAbilImage } = useContext(AbilContext);


	return (
		<>
			<div>
			{/* TODO CSS here */}
				Pick an image for this Ability!
			</div>
			<div className="fdrow fww">
				{abilStockImages.map(img => (
				<div className="hcp abilFrame jccen aicen"
					onClick={e => setAbilImage(img)}
				>
					<img
						className="abilFrameImg"
						src={img}
						alt="newAbilityChoice"
					/>
				</div>
				))}
			</div>
		</>
	)
}

export default ChooseAbilImage;