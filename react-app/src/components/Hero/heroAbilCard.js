import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import {deleteOneHeroAbil} from '../../store/heroAbil'
import "./hero.css";

const HeroAbilCard = ({abil}) => {
	const dispatch = useDispatch();

	const { currHero } = useContext(HeroContext);

	const handleDelete = async () => {
		const data = await dispatch(deleteOneHeroAbil(currHero, abil))
		// TODO if Data, its an error
	}


	return (
		<>
			<div className="fdcol mlr10 fww aicen" >
					<div className="abilFrame fdcol jccen aicen">
						<img
							className="abilFrameImg"
							// className="abilImgCarousel hcp" // TODO use or remove
							src={abil.abilityImage}
							alt="abilityFrame"
						/>
						<div>{abil.name}</div>
					</div>
					<button
						className="hcp w60p cancelShadow"
						onClick={handleDelete}
					>
						X
					</button>
			</div>
		</>
	)
}

export default HeroAbilCard;