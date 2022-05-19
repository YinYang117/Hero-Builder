import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { buildAbil } from "../../store/abilities"
import './abil.css'


const NewAbilCard = ({newAbilityImage, setBuildNewAbil}) => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.session.user)

	const [errors, setErrors] = useState([])
	const [ownerId, setOwnerId] = useState(user.id)
	const [name,setName] = useState("")
	const [description, setDescription] = useState("")
	const [abilityImage, setAbilityImage] = useState(newAbilityImage)
	const [usesResource, setUsesResource] = useState(0)
	const [resourceName, setResourceName] = useState("")
	const [resourceCost, setResourceCost] = useState(0)
	const [usesCharges, setUsesCharges] = useState(0)
	const [numCharges, setNumCharges] = useState(0)
	const [chargeRechargeRate, setChargeRechargeRate] = useState(0)
	const [usesCooldown, setUsesCooldown] = useState(0)
	const [cooldown, setCooldown] = useState(0)
	const [channeled, setChanneled] = useState(0)
	const [channelTime, setChannelTime] = useState(0)
	const [ultimate, setUltimate] = useState(0)
	const [details, setDetails] = useState("")

	useEffect(() => {
		setAbilityImage(newAbilityImage)
	},[newAbilityImage])

	const submitNewAbil = async () => {
		setErrors([])
		const newAbil = {}
		newAbil.ownerId = ownerId
		newAbil.name = name
		newAbil.description = description
		newAbil.abilityImage = abilityImage
		newAbil.usesResource = usesResource
		if (usesResource === 1) {
			newAbil.resourceName = resourceName
			newAbil.resourceCost = resourceCost	
		} else { // === 0
			delete newAbil.resourceName
			delete newAbil.resourceCost
		}
		newAbil.usesCharges = usesCharges
		if (usesCharges === 1) {
			newAbil.numCharges = numCharges
			newAbil.chargeRechargeRate = chargeRechargeRate
		} else {
			delete newAbil.numCharges
			delete newAbil.chargeRechargeRate
		}
		newAbil.usesCooldown = usesCooldown
		if (usesCooldown === 1) {
			newAbil.cooldown = cooldown
		} else {
			delete newAbil.cooldown
		}
		newAbil.channeled = channeled
		if (channeled === 1) {
			newAbil.channelTime = channelTime
		} else {
			delete newAbil.channelTime
		}
		newAbil.ultimate = ultimate
		newAbil.details = details

		const data = await dispatch(buildAbil(newAbil))
		if (!data) setBuildNewAbil(false) // TODO toggle build state
		else setErrors(data) // should be an array
	}

	const handleCancel = () => {
		// TODO clear fields?
		setBuildNewAbil(false)
	}

	// TODO setAbilityImage() based off click

	const resourceCheck = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setUsesResource(int)
	}

	const chargesCheck = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setUsesCharges(int)
	}

	const cooldownCheck = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setUsesCooldown(int)
	}

	const channeledCheck = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setChanneled(int)
	}

	const ultCheck = (e) => {
		let str = e.target.value
		let int = parseInt(str, 10)
		setUltimate(int)
	}
	
	return (
		// whole container is col
		<div className="fdcol">
			{errors &&
			<div className="TODO errors">
				{errors.map((error, idx) => <div key={idx}>{error}</div>)}
			</div>}
			<form onSubmit={e => {
				e.preventDefault()
				submitNewAbil()
			}}>
				<div className="fdrow">
					<div className="left side fdcol hfmn">
						<img src={abilityImage} alt="new ability portraite" className="abilImg" /> {/* TODO classname */}
						<div className="conditionGroup fdcol">
							<div>Uses Resources?</div>
							<div className="checkboxContainer fdrow">
								<input type="checkbox" name="" checked={usesResource === 1} value={1} onClick={e => resourceCheck(e)} />
								<label>Yes</label>
								<input type="checkbox" name="" checked={usesResource === 0} value={0} onClick={e => resourceCheck(e)} />
								<label>No</label>
							</div>
						</div>
						<div className="conditionGroup fdcol">
							<div>Uses Charges?</div>
							<div className="checkboxContainer fdrow">
								<input type="checkbox" name="" checked={usesCharges === 1} value={1} onClick={e => chargesCheck(e)} />
								<label>Yes</label>
								<input type="checkbox" name="" checked={usesCharges === 0} value={0} onClick={e => chargesCheck(e)} />
								<label>No</label>
							</div>
						</div>
						<div className="conditionGroup fdcol">
							<div>Uses Cooldowns?</div>
							<div className="checkboxContainer fdrow">
								<input type="checkbox" name="" checked={usesCooldown === 1} value={1} onClick={e => cooldownCheck(e)} />
								<label>Yes</label>
								<input type="checkbox" name="" checked={usesCooldown === 0} value={0} onClick={e => cooldownCheck(e)} />
								<label>No</label>
							</div>
						</div>
						<div className="conditionGroup fdcol">
							<div>Channeled While Casting?</div>
							<div className="checkboxContainer fdrow">
								<input type="checkbox" name="" checked={channeled === 1} value={1} onClick={e => channeledCheck(e)} />
								<label>Yes</label>
								<input type="checkbox" name="" checked={channeled === 0} value={0} onClick={e => channeledCheck(e)} />
								<label>No</label>
							</div>
						</div>
						<div className="conditionGroup fdcol">
							<div>Ultimate Ability?</div>
							<div className="checkboxContainer fdrow">
								<input type="checkbox" name="" checked={ultimate === 1} value={1} onClick={e => ultCheck(e)} />
								<label>Yes</label>
								<input type="checkbox" name="" checked={ultimate === 0} value={0} onClick={e => ultCheck(e)} />
								<label>No</label>
							</div>
						</div>
					</div>
					<div className="right side fdcol hfmn">
						<div className="dataStripe1 fdrow sa aicen" >
							<button type="submit"
							className="w40p h80p confirmShadow"
							>
								Build Ability!</button>
							<button onClick={handleCancel}
							className="w40p h80p cancelShadow"
							>
								Cancel</button>
						</div>
						<>
							<label className="mlr10" >Name:</label>
							<input onChange={e => setName(e.target.value)}
								className="w100p"
								type="text"
								placeholder='Ability Name'
								required="required"
								value={name} />
						</>
						<>
							<label>Description:</label>
							<textarea onChange={e => setDescription(e.target.value)}
								className="hauto wauto"
								id="setNewDescription"
								rows="6" cols="35"
								placeholder='General Description of the Ability'
								required="required"
								value={description} />
						</>
						{(usesResource === 1) && 
						<div className="conditionDetails1 fdrow sb">
							<div className="fdcol">
								<label>Resource Name</label>
								<input onChange={e => setResourceName(e.target.value)}
									className=""
									type="text"
									placeholder='Resource Name'
									value={resourceName} />
							</div>
							<div className="fdcol">
								<label>Resource Cost</label>
								<input onChange={e => setResourceCost(e.target.value)}
									className=""
									type="number"
									min='1' max='1000' step='1'
									placeholder='1 - 1000'
									value={resourceCost} />
							</div>
						</div>}
						{(usesCharges === 1) &&
						<div className="conditionDetails2 fdrow sb">
							<div className="fdcol">
								<label>Number of Charges</label>
								<input onChange={e => setNumCharges(e.target.value)}
									className=""
									type="number"
									min='1' max='100' step='1'
									placeholder='1 - 100'
									value={numCharges} />
							</div>
							<div className="fdcol">
								<label>Charge Replenish Rate</label>
								<input onChange={e => setChargeRechargeRate(e.target.value)}
									className=""
									type="number"
									min='1' max='120' step='1'
									placeholder='1 - 120'
									value={chargeRechargeRate} />
							</div>
						</div>}
						{(usesCooldown === 1 ) &&
						<div className="conditionDetails1 fdrow sa">
							<label>Cooldown Time</label>
							<input onChange={e => setCooldown(e.target.value)}
								className=""
								type="number"
								min='2' max='120' step='1'
								placeholder='1 - 120'
								value={cooldown} />
						</div>}
						{(channeled === 1) &&
						<div className="conditionDetails2 fdrow sa">
							<label>Channel Duration</label>
							<input onChange={e => setChannelTime(e.target.value)}
								className=""
								type="float"
								min='1.5' max='20' step='0.5'
								placeholder='1.5 - 20.0'
								value={channelTime} />
						</div>}
					</div>
				</div>
				<div className="details container">
					<label>Ability Details</label>
					<textarea onChange={e => setDetails(e.target.value)}
						className="hauto wauto"
						id=""
						rows="6" cols="35"
						placeholder='Additional Details on the workings of this Ability'
						value={details} />
				</div>
			</form>
		</div>
	)
}

export default NewAbilCard;