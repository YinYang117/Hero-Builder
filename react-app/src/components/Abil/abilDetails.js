import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import { AbilContext } from '../../context/AbilContext';
import { HeroContext } from '../../context/HeroContext';
import { deleteAbil } from "../../store/abilities"
import { addOneHeroAbil } from "../../store/heroAbil"
import "./abil.css";

const AbilDetails = () => {
	const dispatch = useDispatch();

	const { currHero } = useContext(HeroContext);
	const { currAbil, setCurrAbil, setEditingAbil } = useContext(AbilContext);

	const editAbilFunc = () => {
		setEditingAbil(true)
	}

	const addAbilToHero = async () => {
		const data = await dispatch(addOneHeroAbil(currHero, currAbil))
	}

	const deleteAbilFunc = async () => {
		await dispatch(deleteAbil(currAbil.id))
		.then(() => setCurrAbil())
	}

	const usesResourcesFunc = () => {
		if (currAbil.usesResource === 1) return <div>Yes</div>
		else return <div>No</div> // === 0
	}

	const usesChargesFunc = () => {
		if (currAbil.usesCharges === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // === 0
	}

	const usesCooldownFunc = () => {
		if (currAbil.usesCooldown === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // === 0
	}

	const channeledFunc = () => {
		if (currAbil.channeled === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // === 0
	}

	const ultimateFunc = () => {
		if (currAbil.ultimate === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // === 0
	}
	

	return (
		<>
			{currHero &&
			<div>
				Add this Ability to your currently selected Hero? <button onClick={addAbilToHero}>Add</button>
			</div>}
			{/* split img / main data */}
			<div className="fdrow sa">

				{/* left, image + name */}
				<div className="fdcol hfmn" >
					<div className="fdrow sb" >
						<div className="mlr10 w100p aicen abilDetName p5" >Name: {currAbil.name}</div>
					</div>
					<img src={currAbil.abilityImage} alt={currAbil.name} className="abilDetImg" />
				</div>
				{/* right, main data */}
				<div className="fdcol hfmn" >
					<div className="dataStripe1 fdrow sa aicen" >
						<button onClick={editAbilFunc}
							className="w40p h80p confirmShadow"
						>
							Edit
						</button>
						<button onClick={deleteAbilFunc}
							className="w40p h80p cancelShadow"
						>
							Delete
						</button>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdcol aicen">
							<div>Use Resources?</div>
							<div>{usesResourcesFunc()}</div>
						</div>
					</div>
					{(currAbil.usesRerources === 1) &&
					<div className="dataStripe3 fdrow sa aicen" >
						<div className="mlr10">Resource Name: {currAbil.resourceName}</div>
						<div className="mlr10">Resource Cost: {currAbil.resourceCost}</div>
					</div>}
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdcol aicen">
							<div>Use Charges?</div>
							<div>{usesChargesFunc()}</div>
						</div>
					</div>
					{(currAbil.usesCharges === 1) &&
					<div className="dataStripe3 fdrow sa aicen" >
						<div className="mlr10 fdcoln">Number of Charges: {currAbil.numCharges}</div>
						<div className="mlr10 fdcol">resource cost: {currAbil.chargeRechargeRate}</div>
					</div>}
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Uses Cooldown?</div>
							<div>{usesCooldownFunc()}</div>
						</div>
						{(currAbil.usesCooldown === 1) &&
						<div className="mlr10 fdrow aicen">
							<div>Cooldown Time: {currAbil.cooldown}</div>
						</div>}
					</div>
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="fdrow sa aicen">
							<div>Channeled Ability?</div>
							<div>{channeledFunc()}</div>
						</div>
						{(currAbil.channeled === 1) &&
						<div className="fdrow aicen">
							<div>Channel Time: {currAbil.channelTime}</div>
						</div>}
					</div>
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="fdrow sa aicen">
							<div>Ultimate Ability?</div>
							<div>{ultimateFunc()}</div>
						</div>
					</div>
				</div>
			</div>
			{currAbil.details && <div className='abilIntro p5'>
				{currAbil.details}
			</div>}
		</>
	)
}

export default AbilDetails;