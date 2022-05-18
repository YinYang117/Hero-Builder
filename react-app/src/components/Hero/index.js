import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as heroActions from "../../store/heros"
import "./hero.css"


const HeroDetailsCard = ({ hero, heroAbil, editingHero, setEditingHero, setCurrHero }) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([])

	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	const [shrtDate, setShrtDate] = useState('')

	useEffect(() => {
		let fullDate = hero?.updatedAt
		if (fullDate) setShrtDate(fullDate.split('').splice(8, 8).join(''))
		// let shrtDate = "debugging"
	},[hero])

	const editHero = (e) => {
		e.preventDefault();
		setEditingHero(true)
	}

	const deleteHero = () => {
		dispatch(heroActions.deleteHero(hero.id))
		.then(() => {
			// setEditingHero(false)
			setCurrHero()
		})
		.catch(async (res) => {
			const data = await res.json()
			if (data && data.errors) setErrors(data.errors)
		})
	}
	
	const usesReso = () => {
		if (hero.resource === 1) return (<div>Yes</div>)
		else if (hero.resource === 0) return (<div>No</div>)
		else return (<div>BUG w/ Int</div>)
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
							<div className="mlr10 w100p aicen heroDetName" >Name: {hero.name}</div>
						</div>
						<img src={hero.heroImage} alt={hero.name} className="heroDetImg" />
				</div>
				{/* right, main data */}
				<div className="fdcol hfmn" >
					<div className="dataStripe1 fdrow sa aicen" >
						<button onClick={e => editHero(e)}
						className="w40p h80p confirmShadow"
						>
							Edit</button>
						<button onClick={deleteHero}
						className="w40p h80p cancelShadow"
						>
							Delete</button>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10">HP: {hero.hp}</div>
						<div className="mlr10 fdcol aicen">
							<div>Use Resources?</div>
							<div>{usesReso()}</div>
						</div>
					</div>
					{(hero.resource === 1) &&
					<div className="dataStripe3 fdrow sa aicen" >
							<div className="mlr10 fdcoln">{hero.resourceName}: </div>
							<div className="mlr10 fdcol">{hero.resourceAmount}</div>
					</div>}
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Physical Armor: </div>
							<div>{hero.physicalArmor}</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Magic Resist: </div>
							<div>{hero.magicResist}</div>
						</div>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Attack Damage: </div>
							<div>{hero.attackDamage}</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Attack Range: </div>
							<div>{hero.attackRange}</div>
						</div>
					</div>
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="fdrow sa aicen">
							<div>Attack Speed: </div>
							<div className="mlr10">{hero.attackSpeed}</div>
						</div>
						<div className="fdrow aicen">
							<div>Move Speed: </div>
							<div className="mlr10">{hero.moveSpeed}</div>
						</div>
					</div>
					<div className="dataStripe1 fdrow sb aicen" >
						<div className="m" >Abilities: {hero.numOfAbilities}</div>
						<div className="hero last updated at" >Updated: {shrtDate}</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HeroDetailsCard;