import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import { AbilContext } from '../../context/AbilContext';
import { deleteHero } from "../../store/heros";
import {fetchHeroAbilities} from "../../store/heroAbil";
import HeroAbilCard from './heroAbilCard';
import "./hero.css";

const HeroDetails = () => {
	const dispatch = useDispatch();

	const currHeroAbils = useSelector(state => state.heroAbil)

	const { currHero, setCurrHero, setEditingHero } = useContext(HeroContext);
	const { currAbil, editingAbil } = useContext(AbilContext);


	const [loaded, setLoaded] = useState(false)

	const deleteHeroFunc = async () => {
		await dispatch(deleteHero(currHero.id))
		.then(() => setCurrHero())
	}

	const usesResourcesFunc = () => {
		if (currHero.resource === 1) return (<div>Yes</div>)
		else return (<div>No</div>) // (currHero.resource === 0)
	}

	// useEffect(() => {
	// 	fetchHeroAbilities(currHero)
	// },[])

	useEffect(() => {
		if (currHero) {
			dispatch(fetchHeroAbilities(currHero))
			setLoaded(true)
		}
	},[currHero, dispatch, currAbil, editingAbil])




	return loaded && (
		<>
			{/* split img / main data */}
			<div className="fdrow sa">
				{/* left, image + name */}
				<div className="fdcol hfmn aicen jccen" >
					<div className="fdrow w100p aicen heroDetName p5" >
						<div className="mlr10">Name: </div>
						<div>{currHero.name}</div>
					</div>
					<img src={currHero.heroImage} alt={currHero.name} className="heroDetImg m10" />
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
						<div className="fdrow aicen">
							<div>Use Resources?</div>
							<div className='mlr10'>{usesResourcesFunc()}</div>
						</div>
					</div>
					{(currHero.resource === 1) &&
						<div className="dataStripe3 fdrow sa aicen" >
							<div className="mlr10 fdcol">{currHero.resourceName}: </div>
							<div className="mlr10 fdcol">{currHero.resourceAmount}</div>
						</div>}
					<div className="dataStripe1 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Physical Armor: </div>
							<div className='mlr10'>{currHero.physicalArmor}</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Magic Resist: </div>
							<div className='mlr10'>{currHero.magicResist}</div>
						</div>
					</div>
					<div className="dataStripe2 fdrow sa aicen" >
						<div className="mlr10 fdrow aicen">
							<div>Attack Damage: </div>
							<div className='mlr10'>{currHero.attackDamage}</div>
						</div>
						<div className="mlr10 fdrow aicen">
							<div>Attack Range: </div>
							<div className='mlr10'>{currHero.attackRange}</div>
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
				</div>
			</div>
			<div className='heroIntro p10 bsbb'>
				{currHero.intro}
			</div>
			{currHero.details &&
			<div className='heroIntro p10 bsbb'>
				{currHero.details}
			</div>}
			{currHeroAbils &&
			<div className="heroIntro fdcol aicen bsbb">
				<div className="m10 flarg">
					Hero Equiped Abils {`(${currHeroAbils?.arr?.length}/6)`}
				</div>
				<div className='p5 fdrow fww mb10'>
					{currHeroAbils?.arr?.map(abil => (
						<HeroAbilCard key={abil.id} abil={abil}/>
					))}
				</div>
			</div>}
			<div className="mb30"></div>
		</>
	)
}

export default HeroDetails;
