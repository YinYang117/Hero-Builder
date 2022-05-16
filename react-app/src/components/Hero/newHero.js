import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./hero.css"


const NewHeroForm = ({ editingHero, setEditingHero }) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	const fullDate = hero.updatedAt
	const shrtDate = fullDate.split('').splice(0,16).join('')
	
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

	// Notes: might be a cool way to style buttons on number inputs
	
	const editHero = (e) => {
		e.preventDefault();
		// submit editz
		setEditingHero(false)
	}
	
	return (
		<>
			<div className="fdrow">
				<div className="heroDetImg">
					<img src={hero.mainImage} alt={hero.name} />
					<label className='label'>
					Hero Image
					</label>
					<input onChange={e => setHeroImage(e.target.value)} type="text" className="" placeholder='Hero Image' required="required" value={heroImage} />
				</div>
				<div className="right hero stats container">
					<div>
						<label className='label'>
						Name
						</label>
						<input onChange={e => setHeroName(e.target.value)} type="text" className="" placeholder='Hero Name' required="required" value={heroName} />
						<button onClick={e => editHero(e)} >Edit</button>
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
							<input type="radio" id="huey" name="resource" value={true} checked onClick={e => setResource(e.target.value)} />
							<label for="true">Yes</label>
							<input type="radio" id="dewey" name="resource" value={false} onClick={e => setResource(e.target.value)} />
							<label for="false">No</label>
						{hero.resource &&
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
							
							<label className='label'>
							Last Update:
							</label>
							<div className="hero last updated at" >last uptd: {shrtDate}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="little space">
				spacer
				<div className="container for specific hero's abils">
					{/* drag drop. */}
					Current hero abilities
				</div>
			</div>
		</>
	)
}

export default NewHeroForm;
