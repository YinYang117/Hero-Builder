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
	const [resourceName, setResourceName] = useState()
	const [resourceCost, setResourceCost] = useState()
	const [usesCharges, setUsesCharges] = useState(0)
	const [numCharges, setNumCharges] = useState()
	const [chargeRechargeRate, setChargeRechargeRate] = useState()
	const [usesCooldown, setUsesCooldown] = useState(0)
	const [cooldown, setCooldown] = useState()
	const [channeled, setChanneled] = useState(0)
	const [channelTime, setChannelTime] = useState()
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
		if (!data) return "TODO make it stop building new"
		else setErrors(data) // should be an array
	}

	
	// const handleCancel = () => {
	// 	// TODO clear fields?
	// 	setBuildNewAbil(false)
	// }

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














			</form>
		</div>
	)
}

export default NewAbilCard;