import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editHero } from "../../store/heros"
import "./hero.css"


const EditHeroForm = ({ hero, heroAbil, editingHero, setEditingHero }) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	let fullDate = hero?.updatedAt
	let shrtDate
	if (fullDate) shrtDate = (fullDate.split('').splice(8, 8).join(''))

	const [heroName, setHeroName] = useState(hero.name)
	const [intro, setIntro] = useState(hero.intro)
	const [heroImage, setHeroImage] = useState(hero.heroImage)
	const [hp, setHp] = useState(hero.hp)
	const [resource, setResource] = useState(hero.resource)
	const [resourceName, setResourceName] = useState(hero?.resourceName)
	const [resourceAmount, setResourceAmount] = useState(hero?.resourceAmount)
	const [physicalArmor, setPhysicalArmor] = useState(hero.physicalArmor)
	const [magicResist, setMagicResist] = useState(hero.magicResist)
	const [attackDamage, setAttackDamage] = useState(hero.attackDamage)
	const [attackRange, setAttackRange] = useState(hero.attackRange)
	const [attackSpeed, setAttackSpeed] = useState(hero.attackSpeed)
	const [moveSpeed, setMoveSpeed] = useState(hero.moveSpeed)
	const [numOfAbilities, setNumOfAbilities] = useState(hero.numOfAbilities)
	const [details, setDetails] = useState(hero?.details)
	// const [updatedAt, setUpdatedAt] = useState(hero.updatedAt)
	const [errors, setErrors] = useState([])

	// Notes: might be a cool way to style buttons on number inputs

	const handelCheck = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setResource(int)
	}

	const submitEditHero = (e) => {
		// const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
		setErrors([])
		const newHero = hero
		newHero.name = heroName
		newHero.intro = intro
		newHero.heroImage = heroImage
		newHero.hp = hp
		newHero.resource = resource
		if (resource === 1) {
			newHero.resourceName = resourceName
			newHero.resourceAmount = resourceAmount
		} else {
			delete newHero.resourceName
			delete newHero.resourceAmount
		}
		newHero.physicalArmor = physicalArmor
		newHero.magicResist = magicResist
		newHero.attackDamage = attackDamage
		newHero.attackRange = attackRange
		newHero.attackSpeed = attackSpeed
		newHero.moveSpeed = moveSpeed
		newHero.numOfAbilities = numOfAbilities
		// TODO add an extra notification or something if
		// hero has more abilities allocated then the new num of abils
		newHero.details = details
		if (!(errors.length > 1)) {
			dispatch(editHero(newHero))
				.then(() => setEditingHero(false))
				.catch(async (res) => {
					console.log("res in hero editing hero .catch", res)
					const data = await res.json()
					if (data && data.errors) setErrors(data.errors)
				})
		}
	}

	const handleCancel = () => {
		// clear Edits
		setEditingHero(false)
	}

	return (
		<div className="fdcol">
			{errors &&
				<div className="TODO errors">
					{errors.map((error, idx) => <p key={idx}>{error}</p>)}
				</div>}
			<form onSubmit={e => {
				e.preventDefault()
				submitEditHero()
			}}>
				{/* split img / main data */}
				<div className="fdrow sa">
					{/* left, image + name */}
					<div className="fdcol hfmn" >
						<div className="fdrow sb" >
							<label className="mlr10" >Name:</label>
							<input onChange={e => setHeroName(e.target.value)}
							className="w100p"
							type="text"
							placeholder='Hero Name'
							required="required"
							value={heroName} />
						</div>
						<img src={hero.heroImage} alt={hero.name} className="heroDetImg" />
						<div>TODO carousel for images you can choose</div>
					</div>
					{/* right, main data */}
					<div className="fdcol hfmn">
						<div className="dataStripe1 fdrow sa aicen" >
							<button type="submit"
							className="w40p h80p confirmShadow"
							>
								Submit Changes</button>
							<button onClick={handleCancel}
							className="w40p h80p cancelShadow"
							>
								Cancel</button>
						</div>
						<div className="dataStripe2 fdrow sa aicen" >
							<div className="mlr10" >
								<label>HP: </label>
								<input onChange={e => setHp(e.target.value)}
								className="h80p"
								type="number"
								min='100' max='10000' step='10'
								placeholder='100-10000'
								required="required"
								value={hp} />
							</div>
							<div className="mlr10" >
								<label  >Use Resources?</label>
								<div className="sb aicen">
									<input type="checkbox" name="resource" checked={resource === 1} value={1} onClick={e => handelCheck(e)} />
									<label>Yes</label>
									<input type="checkbox" name="resource" checked={resource === 0} value={0} onClick={e => handelCheck(e)} />
									<label>No</label>
								</div>
							</div>
						</div>
						{(resource === 1) &&
						<div className="dataStripe3 fdrow sa aicen" >
							<div className="mlr10 fdcoln" >
								<label  >Resource Name</label>
								<input onChange={e => setResourceName(e.target.value)}
								className=""
								type="text"
								placeholder='Mana / Energy / Etc'
								value={resourceName} />
							</div>
							<div className="mlr10 fdcol" >
								<label className=''>Amount</label>
								<input onChange={e => setResourceAmount(e.target.value)}
								className=""
								type="number"
								min='10' max='3000' step='1'
								placeholder='10-3000'
								value={resourceAmount} />
							</div>
						</div>}
						<div className="dataStripe1 fdrow sa aicen" >
							<div className="mlr10 fdrow sa aicen" >
								<label>Physical Armor</label>
								<input onChange={e => setPhysicalArmor(e.target.value)}
								className=""
								type="number"
								min='0' max='500' step='1'
								placeholder='0-500'
								required="required"
								value={physicalArmor} />
							</div>
							<div className="mlr10 fdrow sa aicen" >
								<label>Magic Resist</label>
								<input onChange={e => setMagicResist(e.target.value)}
								className=""
								type="number"
								min='0' max='500' step='1'
								placeholder='0-500'
								required="required"
								value={magicResist} />
							</div>
						</div>
						<div className="dataStripe2 fdrow sa aicen" >
							<div className="mlr10 fdrow sa aicen" >
								<label>Attack Damage</label>
								<input onChange={e => setAttackDamage(e.target.value)}
								type="number"
								min='10' max='2000' step='1'
								className=""
								placeholder='10-2000'
								required="required"
								value={attackDamage} />
							</div>
							<div className="mlr10 fdrow sa aicen" >
								<label>Attack Range</label>
								<input onChange={e => setAttackRange(e.target.value)}
								type="number"
								min='1' max='500' step='1'
								className=""
								placeholder='1-500'
								required="required"
								value={attackRange} />
							</div>
						</div>
						<div className="dataStripe1 fdrow sa aicen" >
							<div className="mlr10 fdrow sa aicen" >
								<label>Attack Speed</label>
								<input onChange={e => setAttackSpeed(e.target.value)}
								type="number" min='0.1' max='10.0' step='0.1'
								className=""
								placeholder='0.1 - 10.0'
								required="required"
								value={attackSpeed} />
							</div>
							<div className="mlr10 fdrow sa aicen" >
								<label>Move Speed</label>
								<input onChange={e => setMoveSpeed(e.target.value)}
								type="number"
								min='1.0' max='20.0' step='0.1'
								className=""
								placeholder='1.0 - 20.0'
								required="required"
								value={moveSpeed} />
							</div>
						</div>
						<div className="dataStripe2 hauto fdcol sa aicen" >
							<label>Hero Intro</label>
							<textarea onChange={e => setIntro(e.target.value)}
							className="hauto editIntro"
							// type="textarea"
							id="editIntro"
							rows="6" cols="35"
							placeholder='Introduction for your Hero'
							required="required"
							value={intro} />
						</div>
					</div>
				</div>
				{/* resume column ordering */}
				<div className="bottomSpan">
					<label >Technical Details</label>
					<input onChange={e => setDetails(e.target.value)}
					className=""
					type="textarea"
					rows="5"
					placeholder='Additional Hero Details'
					value={details} />
				</div>
			</form>
			<div >Hero last updated at: {shrtDate}</div>
			<div >Current hero abilities TODO</div>
		</div>
	)
}

export default EditHeroForm;
	// <div className="fdrow heroDetSec" >
		// 	<label  >
		// 		Number of Abilities
		// 	</label>
		// 	<input onChange={e => setNumOfAbilities(e.target.value)} type="number" min='0' max='10' step='1' className="" placeholder='0 - 10' required="required" value={numOfAbilities} />
		// </div>

