import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { buildAbil } from "../../store/abilities"
import './abil.css'


const NewAbilCard = (         ) => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.session.user)

	const [errors, setErrors] = useState([])
	const [ownerId,setOwnerId] = useState(user.id)
	const [name,setName] = useState("")
	const [description, setDescription] = useState("")
	const [abilityImage, setAbilityImage] = useState("https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916118/thorn_pre75p.png")
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

	// const handelCheck = (e) => {
	// 	let str = e.target.value
	// 	let int = parseInt(str, 10)
	// 	set()
	// }

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
		if (!data) return // TODO toggle build state
		else setErrors(data) // should be an array
	}

	// const handleCancel = () => {
	// 	// TODO clear fields?
	// 	setBuildNewAbil(false)
	// }

	// TODO setAbilityImage() based off click
	
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
				<div className="left side fdcol">
					<img src={abilityImage} alt="new ability portraite" className="heroDetImg" /> {/* TODO classname */}
					<div className="conditionGroup fdcol">
						<div>Uses Resources?</div>
						<div className="checkboxContainer fdrow">
							<input type="checkbox" name="" checked={ === 1} value={1} onClick={e => (e)} />
							<label>Yes</label>
							<input type="checkbox" name="" checked={ === 0} value={0} onClick={e => (e)} />
							<label>No</label>
						</div>
					</div>
					<div className="conditionGroup fdcol">
						<div>Uses Charges?</div>
						<div className="checkboxContainer fdrow">
							<input type="checkbox" name="" checked={ === 1} value={1} onClick={e => (e)} />
							<label>Yes</label>
							<input type="checkbox" name="" checked={ === 0} value={0} onClick={e => (e)} />
							<label>No</label>
						</div>
					</div>
					<div className="conditionGroup fdcol">
						<div>Uses Cooldowns?</div>
						<div className="checkboxContainer fdrow">
							<input type="checkbox" name="" checked={ === 1} value={1} onClick={e => (e)} />
							<label>Yes</label>
							<input type="checkbox" name="" checked={ === 0} value={0} onClick={e => (e)} />
							<label>No</label>
						</div>
					</div>
					<div className="conditionGroup fdcol">
						<div>Channeled While Casting?</div>
						<div className="checkboxContainer fdrow">
							<input type="checkbox" name="" checked={ === 1} value={1} onClick={e => (e)} />
							<label>Yes</label>
							<input type="checkbox" name="" checked={ === 0} value={0} onClick={e => (e)} />
							<label>No</label>
						</div>
					</div>
					<div className="conditionGroup fdcol">
						<div>Ultimate Ability?</div>
						<div className="checkboxContainer fdrow">
							<input type="checkbox" name="" checked={ === 1} value={1} onClick={e => (e)} />
							<label>Yes</label>
							<input type="checkbox" name="" checked={ === 0} value={0} onClick={e => (e)} />
							<label>No</label>
						</div>
					</div>
				</div>
				<div className="right side fdcol">
					<>
						<label className="mlr10" >Name:</label>
						<input onChange={e => (e.target.value)}
							className="w100p"
							type="text"
							placeholder='Ability Name'
							required="required"
							value={name} />
					</>
					<>
						<label>Description:</label>
						<textarea onChange={e => setIntro(e.target.value)}
							className="hauto wauto editIntro"
							id="editIntro"
							rows="6" cols="35"
							placeholder='General Description'
							required="required"
							value={intro} />
					</>
					<div className="conditionDetails1 fdrow sb">
						<div className="fdcol">
							<label>Resource Name</label>
							<input onChange={e => (e.target.value)}
								className=""
								type=""
								placeholder=''
								required="required"
								value={} />
						</div>
						<div className="fdcol">
							<label>Resource Amount</label>
							<input onChange={e => (e.target.value)}
								className=""
								type=""
								placeholder=''
								required="required"
								value={} />
						</div>
					</div>
					<div className="conditionDetails2 fdrow sb">
						<div className="fdcol">
							<label>Number of Charges</label>
							<input onChange={e => (e.target.value)}
								className=""
								type=""
								placeholder=''
								required="required"
								value={} />
						</div>
						<div className="fdcol">
							<label>Charge Replenish Rate</label>
							<input onChange={e => (e.target.value)}
								className=""
								type=""
								placeholder=''
								required="required"
								value={} />
						</div>
					</div>
					<div className="conditionDetails1 fdrow sa">
						<label>Cooldown Time</label>
						<input onChange={e => (e.target.value)}
							className=""
							type=""
							placeholder=''
							required="required"
							value={} />
					</div>
					<div className="conditionDetails2 fdrow sa">
						<label>Channel Duration</label>
						<input onChange={e => (e.target.value)}
							className=""
							type=""
							placeholder=''
							required="required"
							value={} />
					</div>
					
				</div>














			</form>
		</div>
	)
}

export default NewAbilCard;