import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as abilActions from "../../store/abilities"
import "./abil.css"

const AbilDetailsCard = ({ abil, setEditingAbil, setCurrAbil }) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([])

	const editAbil = (e) => {
		// e.preventDefault();
		setEditingAbil(true)
	}

	const deleteAbil = async () => {
		const data = await dispatch(abilActions.deleteAbil(abil.id))
		// TODO errors
	}

	return (
		<>
			{errors &&
			<div className="TODO errors">
				{errors.map((error) => <div key={error}>{error}</div>)}
			</div>}
			{/* split img / main data */}
			<div className="fdrow sa">
				{/* left, image + name */}
				<div className="fdcol hfmn" >
					<div className="fdrow sb" >
						<div className="mlr10 w100p aicen heroDetName p5" >Name: {abil.name}</div>
					</div>
					<img src={abil.abilImage} alt={abil.name} className="heroDetImg" />
				</div>
				{/* right, main data */}
				<div className="fdcol hfmn" >
					<div className="dataStripe1 fdrow sa aicen" >
						<button onClick={e => editAbil(e)}
							className="w40p h80p confirmShadow"
						>
							Edit</button>
						<button onClick={deleteAbil}
							className="w40p h80p cancelShadow"
						>
							Delete</button>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10">HP:</div>
						<div className="mlr10 fdcol aicen">
							<div>Use Resources?</div>
							<div>yes or no</div>
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
			{abil.details && <div className='heroIntro p5'>
				{abil.details}
			</div>}
		</>
	)
}

export default AbilDetailsCard;