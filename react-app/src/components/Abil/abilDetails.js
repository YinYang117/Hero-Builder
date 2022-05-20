import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from "react-redux";
import { AbilContext } from '../../context/AbilContext';
import { deleteAbil } from "../../store/abilities"
import "./abil.css";

const AbilDetails = ({setEditingAbil}) => {
	const dispatch = useDispatch();

	const { currAbil, setCurrAbil } = useContext(AbilContext);

	const editAbilFunc = () => {
		setEditingAbil(true)
	}

	const deleteAbilFunc = async () => {
		await dispatch(deleteAbil(currAbil.id))
		.then(() => setCurrAbil())
	}

	const usesResourcesFunc = () => {
		if (currAbil.usesResource === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // (currAbil.resource === 0)
	}

	return (
		<>
			{/* split img / main data */}
			<div className="fdrow sa">
				{/* left, image + name */}
				<div className="fdcol hfmn" >
					<div className="fdrow sb" >
						<div className="mlr10 w100p aicen heroDetName p5" >Name: {currAbil.name}</div>
					</div>
					<img src={currAbil.abilImage} alt={currAbil.name} className="heroDetImg" />
				</div>
				{/* right, main data */}
				<div className="fdcol hfmn" >
					<div className="dataStripe1 fdrow sa aicen" >
						<button onClick={e => editAbilFunc()}
							className="w40p h80p confirmShadow"
						>
							Edit</button>
						<button onClick={deleteAbilFunc}
							className="w40p h80p cancelShadow"
						>
							Delete</button>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10">HP:</div>
						<div className="mlr10 fdcol aicen">
							<div>Use Resources?</div>
							<div>{usesResourcesFunc}</div>
						</div>
					</div>
					<div className="dataStripe3 fdrow sa aicen" >
						<div className="mlr10 fdcoln">resource name: </div>
						<div className="mlr10 fdcol">resource cost</div>
					</div>
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Physical Armor: </div>
							<div>amt</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Magic Resist: </div>
							<div>amt</div>
						</div>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Attack Damage: </div>
							<div>da</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Attack Range: </div>
							<div>at</div>
						</div>
					</div>
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="fdrow sa aicen">
							<div>Attack Speed: </div>
							<div className="mlr10">sd</div>
						</div>
						<div className="fdrow aicen">
							<div>Move Speed: </div>
							<div className="mlr10">ms</div>
						</div>
					</div>
				</div>
			</div>
			{currAbil.details && <div className='heroIntro p5'>
				{currAbil.details}
			</div>}
		</>
	)
}

export default AbilDetails;