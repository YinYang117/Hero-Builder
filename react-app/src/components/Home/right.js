import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { AbilContext } from '../../context/AbilContext';
import "./home.css"

const Right = ({showAbilPortraits, setShowAbilPortraits, buildingNewAbil, setBuildingNewAbil}) => {
	const abils = useSelector(state => state.abilities);
	const { setCurrAbil } = useContext(AbilContext);

	const startNewAbil = () => {
		setBuildNewAbil(!buildNewAbil)
	}

	const showAllAbilButton = () => {
		setShowAbilPortraits(!showAbilPortraits)
	}

	return (
		<>
			<button type="button"
				className="hcp sideButton"
				onClick={startNewAbil}
			>
				Build New Ability
			</button>
			<button type="button"
				className="hcp sideButton"
				onClick={showAllAbilButton}
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
		</>
	)
}

export default Right;