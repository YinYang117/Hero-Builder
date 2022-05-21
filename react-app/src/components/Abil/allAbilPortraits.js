import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { AbilContext } from "../../context/AbilContext";
import "./abil.css";

const AllAbilPortraits = () => {
	const abils = useSelector(state => state.abilities)

	const { setCurrAbil } = useContext(AbilContext);


	return (
		<>
			<div>
			{/* TODO CSS here */}
				These are all your Abilities
			</div>
			<div className="fdrow fww" >
				{abils?.arr?.map(abil => (
					<div className="hcp abilFrame fdcol"
						onClick={e => setCurrAbil(abil)}
					>
						<img
							className="abilFrameImg"
							// className="abilImgCarousel hcp" // TODO use or remove
							src={abil.abilityImage}
							alt="abilityFrame"
						/>
						<div>{abil.name}</div>
					</div>
				))}
			</div>
		</>
	)
}

export default AllAbilPortraits;