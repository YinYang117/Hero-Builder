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
			setCurrAbil,
			setEditingAbil
			} = useContext(AbilContext);

	const buildNewAbilFunc = () => {
		setCurrAbil()
		setBuildingNewAbil((!buildingNewAbil))
		setEditingAbil(false)
	}

	const clickAbilPortrait = (abil) => {
		setCurrAbil(abil)
		setBuildingNewAbil(false)
		setEditingAbil(false)
	}


	return (
		<div className="rgrid">
			<button
				className="hcp sideButton"
				type="button"
				onClick={e => buildNewAbilFunc()}
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
					className="AnamePlate hcp fww"
					onClick={e => clickAbilPortrait(abil)}
					>
						{abil.name}
					</div>
				))}
			</div>}
		</div>
	)
}

export default Right;