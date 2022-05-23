import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from "react-redux";
import { AbilContext } from '../../context/AbilContext';
import { editAbil } from "../../store/abilities"
import "./abil.css";

const AbilEdit = () => {
	const dispatch = useDispatch();

	const { currAbil,
		abilImage,
		setAbilImage,
		setEditingAbil
	} = useContext(AbilContext);

	// console.log('curr abil in the abil edit', currAbil);

	const [errors, setErrors] = useState([])
	const [name, setName] = useState(currAbil.name)
	const [description, setDescription] = useState(currAbil.description)
	const [usesResource, setUsesResource] = useState(currAbil.usesResource)
	const [resourceName, setResourceName] = useState(currAbil?.resourceName)
	const [resourceCost, setResourceCost] = useState(currAbil?.resourceCost)
	const [usesCharges, setUsesCharges] = useState(currAbil.usesCharges)
	const [numCharges, setNumCharges] = useState(currAbil?.numCharges)
	const [chargeRechargeRate, setChargeRechargeRate] = useState(currAbil?.chargeRechargeRate)
	const [usesCooldown, setUsesCooldown] = useState(currAbil.usesCooldown)
	const [cooldown, setCooldown] = useState(currAbil?.cooldown)
	const [channeled, setChanneled] = useState(currAbil.channeled)
	const [channelTime, setChannelTime] = useState(currAbil?.channelTime)
	const [ultimate, setUltimate] = useState(currAbil.ultimate)
	const [details, setDetails] = useState(currAbil?.details)

	const submitEditedAbil = async () => {
		setErrors([])
		const editedAbil = currAbil
		// console.log("abilEdit submitting 1", name, currAbil.name)
		editedAbil.name = name
		editedAbil.description = description
		editedAbil.abilityImage = abilImage
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
		if (!data) setEditingAbil(false)
		else setErrors(data) // should be an array
	}

	useEffect(() => {
		setAbilImage(currAbil.abilityImage)
	}, [])

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
			<div className="mb30"></div>
			{errors &&
				<div className="TODO errors">
					{errors.map(error => (
						<div key={error} className="rerr">
							{error}
						</div>
					))}
				</div>}
			<form onSubmit={e => {
				e.preventDefault()
				submitEditedAbil()
			}}>
				<div className="fdrow">
					<div className="left side fdcol hfmn">
						<div className="fdrow sb AdataStripe1 aicen" >
							<label className="mlr10" >Name:</label>
							<input onChange={e => setName(e.target.value)}
								className="w100p mlr10"
								type="text"
								placeholder='Ability Name'
								required="required"
								value={name} />
						</div>
						<img src={abilImage} alt="new ability portrait" className="abilImg" />
						<div className="AdataStripe1 fdrow aicen jccen sa">
							<div>Ultimate Ability?</div>
							<div className="checkboxContainer fdrow aicen">
								<input type="checkbox" className="ml10" checked={ultimate === 1} value={1} onClick={e => ultCheck(e)} />
								<label className="mlr10">Yes</label>
								<input type="checkbox" className="mlr10" checked={ultimate === 0} value={0} onClick={e => ultCheck(e)} />
								<label className="mr10">No</label>
							</div>
						</div>
					</div>
					<div className="right side fdcol hfmn">
						<div className="AdataStripe1 fdrow sa aicen" >
							<button type="submit"
								className="w40p h80p confirmShadow"
							>
								Submit Edits!</button>
							<button onClick={e => setEditingAbil(false)}
								className="w40p h80p cancelShadow"
							>
								Cancel</button>
						</div>
						<div className="AdataStripe2 fdrow aicen jccen sa">
							<div>Uses Resources?</div>
							<div className="checkboxContainer fdrow aicen">
								<input type="checkbox" className="ml10" checked={usesResource === 1} value={1} onClick={e => resourceCheck(e)} />
								<label className="mlr10">Yes</label>
								<input type="checkbox" className="mlr10" checked={usesResource === 0} value={0} onClick={e => resourceCheck(e)} />
								<label className="mr10">No</label>
							</div>
						</div>
					{(usesResource === 1) &&
						<div className="AdataStripe2t fdrow sb">
							<div className="fdcol jccen aicen">
								<label>Resource Name</label>
								<input onChange={e => setResourceName(e.target.value)}
									className="w90p"
									type="text"
									placeholder='Resource Name'
									required="required"
									value={resourceName} />
							</div>
							<div className="fdcol jccen aicen mr10">
								<label>Resource Cost</label>
								<input onChange={e => setResourceCost(e.target.value)}
									className="w70p"
									type="number"
									min='1' max='1000' step='1'
									placeholder='1 - 1000'
									required="required"
									value={resourceCost} />
							</div>
						</div>}
						<div className="AdataStripe1 fdrow aicen jccen sa">
							<div>Uses Charge?</div>
							<div className="checkboxContainer fdrow aicen">
								<input type="checkbox" className="ml10" checked={usesCharges === 1} value={1} onClick={e => chargesCheck(e)} />
								<label className="mlr10">Yes</label>
								<input type="checkbox" className="mlr10" checked={usesCharges === 0} value={0} onClick={e => chargesCheck(e)} />
								<label className="mr10">No</label>
							</div>
						</div>
					{(usesCharges === 1) &&
						<div className="AdataStripe1t fdrow sb">
						<div className="fdcol jccen aicen">
								<label className="ml10">Number of Charges</label>
								<input onChange={e => setNumCharges(e.target.value)}
									type="number"
									min='1' max='100' step='1'
									placeholder='1 - 100'
									required="required"
									value={numCharges} />
							</div>
							<div className="fdcol jccen aicen mr10">
								<label>Charge Replenish Rate</label>
								<input onChange={e => setChargeRechargeRate(e.target.value)}
									className="w40p"
									type="number"
									min='1' max='120' step='1'
									placeholder='1 - 120'
									required="required"
									value={chargeRechargeRate} />
							</div>
						</div>}
						<div className="AdataStripe2t fdrow aicen sa jccen">
							<div>
								<div>Uses Cooldowns?</div>
								<div className="checkboxContainer fdrow aicen">
									<input type="checkbox" className="ml10" checked={usesCooldown === 1} value={1} onClick={e => cooldownCheck(e)} />
									<label className="mlr10">Yes</label>
									<input type="checkbox" className="mlr10" checked={usesCooldown === 0} value={0} onClick={e => cooldownCheck(e)} />
									<label className="mr10">No</label>
								</div>
							</div>
							{(usesCooldown === 1) &&
							<div>
								<div className="fdcol aicen sa">
									<label>Cooldown Time</label>
									<input onChange={e => setCooldown(e.target.value)}
										className="w50p"
										type="number"
										min='2' max='120' step='1'
										placeholder='1 - 120'
										required="required"
										value={cooldown} />
								</div>
							</div>}
						</div>
						<div className="AdataStripe1t fdrow aicen sa jccen">
							<div className="fdcol jccen aicen">
								<div>Channeled?</div>
								<div className="checkboxContainer fdrow aicen">
									<input type="checkbox" className="ml10" checked={channeled === 1} value={1} onClick={e => channeledCheck(e)} />
									<label className="mlr10">Yes</label>
									<input type="checkbox" className="mlr10" checked={channeled === 0} value={0} onClick={e => channeledCheck(e)} />
									<label className="mr10">No</label>
								</div>
							</div>
						{(channeled === 1) &&
							<div className=" fdcol aicen sa">
								<label>Channel Duration</label>
								<input onChange={e => setChannelTime(e.target.value)}
									className=""
									type="number"
									min='1.5' max='20' step='0.5'
									placeholder='1.5 - 20.0'
									required="required"
									value={channelTime} />
							</div>}
						</div>
					</div>
				</div>
				<div className="AbottomSpan fdcol aicen m10">
					<label className="m10">General Description:</label>
					<textarea onChange={e => setDescription(e.target.value)}
						className="rsn m10"
						id="setNewDescription"
						rows="5" cols="60"
						placeholder='General Description of the Ability'
						required="required"
						value={description} />
				</div>
				<div className="AbottomSpan fdcol aicen mlr10">
					<label className="m10">Aditional Technical Details</label>
					<textarea onChange={e => setDetails(e.target.value)}
						className="rsn m10"
						id=""
						rows="5" cols="60"
						placeholder='Additional Details on the workings of this Ability'
						value={details} />
				</div>
			</form>
			<div className="mb30"></div>
		</div>
		
	)
}

export default AbilEdit;