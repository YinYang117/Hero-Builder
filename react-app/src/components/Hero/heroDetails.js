import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import { deleteHero } from "../../store/heros"
import "./hero.css";

const HeroDetails = () => {
	const dispatch = useDispatch();

	const { currHero, setCurrHero, setEditingHero } = useContext(HeroContext);

	const deleteHeroFunc = async () => {
		await dispatch(deleteHero(currHero.id))
		.then(() => setCurrHero())
	}

	const usesResourcesFunc = () => {
		if (currHero.resource === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // (currHero.resource === 0)
	}
	

	return (
		<>
			{/* split img / main data */}
			<div className="fdrow sa">
				{/* left, image + name */}
				<div className="fdcol hfmn" >
					<div className="fdrow sb" >
						<div className="mlr10 w100p aicen heroDetName p5" >Name: {currHero.name}</div>
					</div>
					<img src={currHero.heroImage} alt={currHero.name} className="heroDetImg" />
				</div>
				{/* right, main data */}
				<div className="fdcol hfmn" >
					<div className="dataStripe1 fdrow sa aicen" >
						<button onClick={e => setEditingHero(true)}
							className="w40p h80p confirmShadow"
						>
							Edit</button>
						<button onClick={deleteHeroFunc}
							className="w40p h80p cancelShadow"
						>
							Delete</button>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10">HP: {currHero.hp}</div>
						<div className="mlr10 fdcol aicen">
							<div>Use Resources?</div>
							<div>{usesResourcesFunc()}</div>
						</div>
					</div>
					{(currHero.resource === 1) &&
						<div className="dataStripe3 fdrow sa aicen" >
							<div className="mlr10 fdcoln">{currHero.resourceName}: </div>
							<div className="mlr10 fdcol">{currHero.resourceAmount}</div>
						</div>}
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Physical Armor: </div>
							<div>{currHero.physicalArmor}</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Magic Resist: </div>
							<div>{currHero.magicResist}</div>
						</div>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Attack Damage: </div>
							<div>{currHero.attackDamage}</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Attack Range: </div>
							<div>{currHero.attackRange}</div>
						</div>
					</div>
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="fdrow sa aicen">
							<div>Attack Speed: </div>
							<div className="mlr10">{currHero.attackSpeed}</div>
						</div>
						<div className="fdrow aicen">
							<div>Move Speed: </div>
							<div className="mlr10">{currHero.moveSpeed}</div>
						</div>
					</div>
					{/* <div className="dataStripe1 fdrow sb aicen" >
						<div className="" >Abilities: {currHero.numOfAbilities}</div>
					</div> */}
				</div>
			</div>
			<div className='heroIntro p5'>
				{currHero.intro}
			</div>
			{currHero.details && <div className='heroIntro p5'>
				{currHero.details}
			</div>}
		</>
	)
}

export default HeroDetails;