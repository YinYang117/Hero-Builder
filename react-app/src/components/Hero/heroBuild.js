import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import { buildHero } from "../../store/heros"
import "./hero.css"

const HeroBuild = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.session.user)

	const { setBuildingNewHero, heroImage, setHeroImage, setCurrHero } = useContext(HeroContext);

	const [heroName, setHeroName] = useState("")
	const [intro, setIntro] = useState("")
	const [hp, setHp] = useState(100)
	const [resource, setResource] = useState(0)
	const [resourceName, setResourceName] = useState("")
	const [resourceAmount, setResourceAmount] = useState(10)
	const [physicalArmor, setPhysicalArmor] = useState(1)
	const [magicResist, setMagicResist] = useState(1)
	const [attackDamage, setAttackDamage] = useState(10)
	const [attackRange, setAttackRange] = useState(1)
	const [attackSpeed, setAttackSpeed] = useState(0.1)
	const [moveSpeed, setMoveSpeed] = useState(1.0)
	const [details, setDetails] = useState("")
	const [errors, setErrors] = useState([])

	useEffect(() => {
		if (heroImage) setHeroImage(heroImage)
		else setHeroImage("https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804287/Archer-Transparent-Background-2_u09kgp.png")
	},[heroImage, setHeroImage])

	const handelResourceCheckboxes = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setResource(int)
	}

	const submitNewHero = async (e) => {
		// const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
		setErrors([])
		const newHero = {}
		newHero.ownerId = user.id
		newHero.name = heroName
		newHero.intro = intro
		newHero.heroImage = heroImage
		newHero.hp = hp
		newHero.resource = resource
		if (resource === 1) {
			newHero.resourceName = resourceName
			newHero.resourceAmount = resourceAmount
		} else { // === 0
			delete newHero.resourceName
			delete newHero.resourceAmount
		}
		newHero.physicalArmor = physicalArmor
		newHero.magicResist = magicResist
		newHero.attackDamage = attackDamage
		newHero.attackRange = attackRange
		newHero.attackSpeed = attackSpeed
		newHero.moveSpeed = moveSpeed
		newHero.details = details

		const data = await dispatch(buildHero(newHero))
		if (!data) {
			setBuildingNewHero(false)
			// setCurrHero(newHero) // causing bug if immediately updating
		}
		else setErrors(data) // should be an array
	}


	return (
		<div className="fdcol">
			{errors &&
				<div className="TODO errors">
					{errors.map(error => (
						<div key={error} className="rerr">
							{error}
						</div>
						))}
				</div>}
			<form className="fdcol aicen"
				onSubmit={e => {
				e.preventDefault()
				submitNewHero()
			}}>
				{/* split img / main data */}
				<div className="fdrow sa">
					{/* left, image + name */}
					<div className="fdcol hfmn" >
						<div className="fdrow sb" >
							<label className="mlr10" >Name:</label>
							<input onChange={e => setHeroName(e.target.value)}
							className="w100p mr10"
							type="text"
							placeholder='Hero Name'
							required="required"
							value={heroName} />
						</div>
						<img src={heroImage} alt="new hero portrait" className="heroDetImg" />
					</div> 
					{/* right, main data */}
					<div className="fdcol hfmn">
						<div className="dataStripe1 fdrow sa aicen" >
							<button type="submit"
							className="w40p h80p confirmShadow"
							>
								Build Hero!</button>
							<button onClick={e => setBuildingNewHero(false)}
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
									<input type="checkbox" name="resource" checked={resource === 1} value={1} onClick={e => handelResourceCheckboxes(e)} />
									<label>Yes</label>
									<input type="checkbox" name="resource" checked={resource === 0} value={0} onClick={e => handelResourceCheckboxes(e)} />
									<label>No</label>
								</div>
							</div>
						</div>
						{(resource === 1) &&
						<div className="dataStripe3 fdrow sa aicen" >
							<div className="mlr10 fdcol" >
								<label  >Resource Name</label>
								<input onChange={e => setResourceName(e.target.value)}
								className="mr10"
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
								<label className="mr10">Physical Armor</label>
								<input onChange={e => setPhysicalArmor(e.target.value)}
								className=""
								type="number"
								min='0' max='500' step='1'
								placeholder='0-500'
								required="required"
								value={physicalArmor} />
							</div>
							<div className="mlr10 fdrow sa aicen" >
								<label className="mr10">Magic Resist</label>
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
								<label className="mr10">Attack Damage</label>
								<input onChange={e => setAttackDamage(e.target.value)}
								type="number"
								min='10' max='2000' step='1'
								className=""
								placeholder='10-2000'
								required="required"
								value={attackDamage} />
							</div>
							<div className="mlr10 fdrow sa aicen" >
								<label className="mr10">Attack Range</label>
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
								<label className="mr10">Attack Speed</label>
								<input onChange={e => setAttackSpeed(e.target.value)}
								type="number" min='0.1' max='10.0' step='0.1'
								className=""
								placeholder='0.1 - 10.0'
								required="required"
								value={attackSpeed} />
							</div>
							<div className="mlr10 fdrow sa aicen" >
								<label className="mr10">Move Speed</label>
								<input onChange={e => setMoveSpeed(e.target.value)}
								type="number"
								min='1.0' max='20.0' step='0.1'
								className=""
								placeholder='1.0 - 20.0'
								required="required"
								value={moveSpeed} />
							</div>
						</div>
						<div className="dataStripe2 hauto fdcol sa aicen mb10" >
							<label>Hero Intro</label>
							<textarea onChange={e => setIntro(e.target.value)}
							className="hauto editIntro rsn"
							id="editIntro"
							rows="6" cols="35"
							placeholder='Introduction for your Hero'
							required="required"
							value={intro} />
						</div>
					</div>
				</div>
				{/* resume column ordering */}
				<div className="bottomSpan fdcol aicen mlr10">
					<label >Technical Details</label>
					<textarea onChange={e => setDetails(e.target.value)}
					className="rsn m10"
					rows="5" cols="60"
					placeholder='Additional Hero Details'
					value={details} />
				</div>
			</form>
			{/* <div >Current hero abilities TODO </div> */}
		</div>
	)
}

export default HeroBuild;