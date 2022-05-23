import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AbilContext } from '../../context/AbilContext';
import { HeroContext } from '../../context/HeroContext';
import { deleteAbil } from "../../store/abilities"
import { addOneHeroAbil } from "../../store/heroAbil"
import "./abil.css";

const AbilDetails = () => {
	const dispatch = useDispatch();
	const currHeroAbils = useSelector(state => state.heroAbil)

	const { currHero } = useContext(HeroContext);
	const { currAbil, setCurrAbil, setEditingAbil } = useContext(AbilContext);

	const editAbilFunc = () => {
		setEditingAbil(true)
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
		if (currAbil.usesCharges === 1) return <div>Yes</div>
		else return <div>No</div> // === 0
	}

	const usesCooldownFunc = () => {
		if (currAbil.usesCooldown === 0) {
			return (
				<>
					<div>Uses Cooldown?</div>
					<div>No</div>
				</>
			)
		}
		else if (currAbil.usesCooldown === 1) {
			return (
				<>
					<div className="mlr10 fdcol aicen" >
						<div>Uses Cooldown?</div>
						<div className="mlr10">Yes</div>
					</div>
					<div className="mlr10 fdcol aicen">
						<div>Cooldown Time: </div>
						<div>{currAbil.cooldown}</div>
					</div>
				</>
			)
		}
	}

	const channeledFunc = () => {
		if (currAbil.channeled === 0) {
			return (
				<>
					<div>Channeled Ability?</div>
					<div>No</div>
				</>
			)
		}
		else if ((currAbil.channeled === 1)) {
			return (
				<>
					<div className="mlr10 fdcol aicen" >
						<div>Channeled Ability?</div>
						<div className="mlr10">Yes</div>
					</div>
					<div className="mlr10 fdcol aicen">
						<div>Channel Time: </div>
						<div>{currAbil.channelTime}</div>
					</div>
				</>
			)
		}
	}

	const ultimateFunc = () => {
		if (currAbil.ultimate === 1) return <div>Yes</div>
		else return <div>No</div> // === 0
	}
	
	const addAbilToHeroFunc = () => {
		if (currHero) {
			if (!(currHeroAbils[currAbil.id])) {
				return (			
					<div className="Aflarg ">
						Add this Ability to your currently selected Hero? <button className="hcp sideButton" onClick={addAbilToHero}>Add</button>
					</div>
				)
			}
		}
	}

	const addAbilToHero = async () => {
		if (currHeroAbils?.arr.length < 6) {
			const data = await dispatch(addOneHeroAbil(currHero, currAbil))
		}
		else if (currHeroAbils?.arr.length >= 6) {
			alert("This Hero already has the maximum number of abilities.")
		}
	}


	return (
		<>
			{addAbilToHeroFunc()}
			{/* split img / main data */}
			<div className="fdrow sa">
				{/* left, image + name */}
				<div className="fdcol hfmn" >
					<div className="fdrow sb" >
						<div className="mlr10 w100p aicen abilDetName p5" >Name: {currAbil.name}</div>
					</div>
					<img src={currAbil.abilityImage} alt={currAbil.name} className="abilDetImg" />
					<div className='abilIntro'>
						{currAbil.description}
					</div>
				</div>
				{/* right, main data */}
				<div className="fdcol hfmn" >
					<div className="AdataStripe1 fdrow sa aicen" >
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
					<div className="AdataStripe2 fdrow sa aicen" >
						<div>Use Resources?</div>
						<div className="mlr10">{usesResourcesFunc()}</div>
					</div>
					{(currAbil.usesResource === 1) &&
					<div className="AdataStripe3 fdrow sa aicen" >
						<div className="fdcol aicen">
							<div>Resource Name: </div>
							<div>{currAbil.resourceName}</div>
						</div>
						<div className="fdcol aicen">
							<div className="mlr10">Casting Cost: </div>
							<div>{currAbil.resourceCost}</div>
						</div>
					</div>}
					<div className="AdataStripe2 fdrow sa aicen" >
						<div>Use Charges?</div>
						<div className="mlr10">{usesChargesFunc()}</div>
					</div>
					{(currAbil.usesCharges === 1) &&
					<div className="AdataStripe3 fdrow sa aicen" >
						<div className="fdcol aicen">
							<div># of Charges: </div>
							<div>{currAbil.numCharges}</div>
						</div>
						<div className="fdcol aicen">
							<div>Recharge Rate: </div>
							<div>{currAbil.chargeRechargeRate} Seconds</div>
						</div>
					</div>}
					<div className="AdataStripe2 fdrow sa aicen" >
						{usesCooldownFunc()}
					</div>
					<div className="AdataStripe1 fdrow sa aicen" >
						{channeledFunc()}
					</div>
					<div className="AdataStripe2 fdrow sa aicen" >
						<div>Ultimate Ability?</div>
						<div>{ultimateFunc()}</div>
					</div>
				</div>
			</div>
			{currAbil.details &&
			<div className='abilIntro m10'>
				{currAbil.details}
			</div>}
			<div className="mb30"></div>
		</>
	)
}

export default AbilDetails;