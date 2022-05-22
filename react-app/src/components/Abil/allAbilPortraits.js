import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { AbilContext } from "../../context/AbilContext";
import "./abil.css";

const AllAbilPortraits = () => {
	const abils = useSelector(state => state.abilities)

	const { setCurrAbil, setEditingAbil, setBuildingNewAbil } = useContext(AbilContext);

	const setCurrAbilFunc = (abil) => {
		setCurrAbil(abil)
		setEditingAbil(false)
		setBuildingNewAbil(false)
	}

	return (
		<>
			<div className="mt30 mb10 Aflarg">
				These are all your Abilities
			</div>
			<div className="fdrow fww jccen" >
				{abils?.arr?.map(abil => (
					<div className="hcp abilFrame fdcol"
						onClick={e => setCurrAbilFunc(abil)}
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
			<div className="mb30"></div>
		</>
	)
}

export default AllAbilPortraits;