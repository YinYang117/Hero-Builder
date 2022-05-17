import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editHero } from "../../store/heros"
import "./hero.css"


const EditHeroForm = ({ hero, heroAbil, editingHero, setEditingHero }) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	// const fullDate = hero.updatedAt
	// const shrtDate = fullDate.split('').splice(0, 16).join('')
	let shrtDate = "debugging"

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
	const [updatedAt, setUpdatedAt] = useState(hero.updatedAt)
	const [errors, setErrors] = useState([])

	// Notes: might be a cool way to style buttons on number inputs

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
					console.log("res in edits1", res)
					const data = await res.json()
					if (data && data.errors) setErrors(data.errors)
				})
		}

	}

	const handelCancel = () => {
		// clear Edits
		setEditingHero(false)
	}

	return (
		<div className="fdcol">
			{errors &&
			<div className="new-trip-errors">
				{errors.map((error, idx) => <p key={idx}>{error}</p>)}
			</div>}
			<form onSubmit={e => {
				e.preventDefault()
				submitEditHero()
			}}>

				<div className="fdrow">
					<div className="heroDetImg">
						<img src={hero.heroImage} alt={hero.name} className="heroDetImg" />
						<label className='label'>
							Hero Image
						</label>
						<div>TODO have a small carousel for the images you can choose from</div>
					</div>
					<div className="right hero stats container">
						<div>
							<label className='label'>
								Name
							</label>
							<input onChange={e => setHeroName(e.target.value)} type="text" className="" placeholder='Hero Name' required="required" value={heroName} />
						</div>
						<label className='label'>
							Hero Intro
						</label>
						<input onChange={e => setIntro(e.target.value)} type="textarea" rows="5" className="" placeholder='Introduction for your Hero' required="required" value={intro} />
						<div className="">
							<div className="fdrow heroDetSec" >
								<label className='label'>
									HP
								</label>
								<input onChange={e => setHp(e.target.value)} type="number" min='100' max='10000' step='10' className="" placeholder='HitPoints 100-10000' required="required" value={hp} />
								<label className='label'>
									Use Resources?
								</label>
								<input type="radio" name="resource" checked={resource === 1} value={1} onChange={e => setResource(e.target.value)} />
								<label htmlFor="true">Yes</label>
								<input type="radio" name="resource" checked={resource === 0} value={0} onChange={e => setResource(e.target.value)} />
								<label htmlFor="false">No</label>
								{(hero.resource === 1) &&
									<>
										<label className='label'>
											Resource Name
										</label>
										<input onChange={e => setResourceName(e.target.value)} type="text" className="" placeholder='Mana / Energy / Etc' value={resourceName} />
										<label className='label'>
											Resource Amount
										</label>
										<input onChange={e => setResourceAmount(e.target.value)} type="number" min='10' max='3000' step='1' className="" placeholder='10-3000' value={resourceAmount} />
									</>
								}
							</div>
							<div className="fdrow heroDetSec" >
								<label className='label'>
									Physical Armor
								</label>
								<input onChange={e => setPhysicalArmor(e.target.value)} type="number" min='0' max='500' step='1' className="" placeholder='0-500' required="required" value={physicalArmor} />
								<label className='label'>
									Magic Resist
								</label>
								<input onChange={e => setMagicResist(e.target.value)} type="number" min='0' max='500' step='1' className="" placeholder='0-500' required="required" value={magicResist} />
							</div>
							<div className="fdrow heroDetSec" >
								<label className='label'>
									Attack Damage
								</label>
								<input onChange={e => setAttackDamage(e.target.value)} type="number" min='10' max='2000' step='1' className="" placeholder='10-2000' required="required" value={attackDamage} />
								<label className='label'>
									Attack Range
								</label>
								<input onChange={e => setAttackRange(e.target.value)} type="number" min='1' max='500' step='1' className="" placeholder='1-500' required="required" value={attackRange} />
							</div>
							<div className="fdrow heroDetSec" >
								<label className='label'>
									Attack Speed
								</label>
								<input onChange={e => setAttackSpeed(e.target.value)} type="number" min='0.1' max='10.0' step='0.1' className="" placeholder='0.1 - 10.0' required="required" value={attackSpeed} />
								<label className='label'>
									Move Speed
								</label>
								<input onChange={e => setMoveSpeed(e.target.value)} type="number" min='1.0' max='20.0' step='0.1' className="" placeholder='1.0 - 20.0' required="required" value={moveSpeed} />
							</div>
							<div className="fdrow heroDetSec" >
								<label className='label'>
									Number of Abilities
								</label>
								<input onChange={e => setNumOfAbilities(e.target.value)} type="number" min='0' max='10' step='1' className="" placeholder='0 - 10' required="required" value={numOfAbilities} />
							</div>
						</div>
					</div>
				</div>
				<label className='label'>
					Hero Intro
				</label>
				<input onChange={e => setDetails(e.target.value)} type="textarea" rows="5" className="" placeholder='Additional Hero Details' value={details} />
				<button type="submit" >Submit Edits</button>
				<button type="" onClick={handelCancel} >Cancel</button>
			</form>
			<div className="hero last updated at" >last uptd: {shrtDate}</div>
			<div className="little space">
				spacer
				<div className="container for specific hero's abils">
					{/* drag drop. */}
					Current hero abilities
				</div>
			</div>
		</div>
	)
}

export default EditHeroForm;

