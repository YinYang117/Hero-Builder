import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { AbilContext } from '../../context/AbilContext';
import "./home.css"

const Right = () => {
	const abils = useSelector(state => state.abilities);

	const { showAbilPortraits,
			setShowAbilPortraits,
			buildingNewAbil,
			setBuildingNewAbil,
			setCurrAbil 
			} = useContext(AbilContext);


	return (
		<div className="rgrid">
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => setBuildingNewAbil(!buildingNewAbil)}
			>
				Build New Ability
			</button>
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => setShowAbilPortraits(!showAbilPortraits)}
			>
				Toggle All Abilities
			</button>
			{abils &&
			<div>
				{abils?.arr?.map(abil => (
					<div key={abil.id}
					className="namePlate hcp"
					onClick={e => setCurrAbil(abil)}
					>
						{abil.name}
					</div>
				))}
			</div>}
		</div>
	)
}

export default Right;