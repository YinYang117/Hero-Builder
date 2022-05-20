import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editAbil } from "../../store/abilities"
import './abil.css'


const AbilEditCard = ({newAbilityImage, abil, editingAbil, setEditingAbil}) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([])
	const [name,setName] = useState(abil.name)
	const [description, setDescription] = useState(abil.description)
	const [abilityImage, setAbilityImage] = useState(abil.abilityImage)
	const [usesResource, setUsesResource] = useState(abil.usesResource)
	const [resourceName, setResourceName] = useState(abil?.resourceName)
	const [resourceCost, setResourceCost] = useState(abil?.resourceCost)
	const [usesCharges, setUsesCharges] = useState(abil.usesCharges)
	const [numCharges, setNumCharges] = useState(abil?.numCharges)
	const [chargeRechargeRate, setChargeRechargeRate] = useState(abil?.chargeRechargeRate)
	const [usesCooldown, setUsesCooldown] = useState(abil.usesCooldown)
	const [cooldown, setCooldown] = useState(abil?.cooldown)
	const [channeled, setChanneled] = useState(abil.channeled)
	const [channelTime, setChannelTime] = useState(abil?.channelTime)
	const [ultimate, setUltimate] = useState(abil.ultimate)
	const [details, setDetails] = useState(abil?.details)

	useEffect(() => {
		setAbilityImage(newAbilityImage)
	},[newAbilityImage])

	const submitEditedAbil = async () => {
		setErrors([])
		const editedAbil = abil
		editedAbil.name = name
		editedAbil.description = description
		editedAbil.abilityImage = abilityImage
		editedAbil.usesResource = usesResource
		if (usesResource === 1) {
			editedAbil.resourceName = resourceName
			editedAbil.resourceCost = resourceCost	
		} else { // === 0
			delete editedAbil.resourceName
			delete editedAbil.resourceCost
		}
		editedAbil.usesCharges = usesCharges
		if (usesCharges === 1) {
			editedAbil.numCharges = numCharges
			editedAbil.chargeRechargeRate = chargeRechargeRate
		} else {
			delete editedAbil.numCharges
			delete editedAbil.chargeRechargeRate
		}
		editedAbil.usesCooldown = usesCooldown
		if (usesCooldown === 1) {
			editedAbil.cooldown = cooldown
		} else {
			delete editedAbil.cooldown
		}
		editedAbil.channeled = channeled
		if (channeled === 1) {
			editedAbil.channelTime = channelTime
		} else {
			delete editedAbil.channelTime
		}
		editedAbil.ultimate = ultimate
		editedAbil.details = details

		const data = await dispatch(editAbil(editedAbil))
		if (!data) setEditingAbil(false) // TODO toggle build state
		else setErrors(data) // should be an array
	}

	const handleCancel = () => {
		// TODO clear fields?
		setEditingAbil(false)
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
				submitEditedAbil()
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
								Submit Edits!</button>
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
								type="number"
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

export default AbilEditCard;