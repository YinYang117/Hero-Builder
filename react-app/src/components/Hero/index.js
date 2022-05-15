import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./hero.css"


const HeroDetailsCard = ({ hero, heroAbil }) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these
	const fullDate = hero.updatedAt
	const shrtDate = fullDate.split('').splice(0,16).join('')
	
	return (
		<>
			<div className="fdrow">
				<div className="heroDetImg">
					image
					<img src={hero.mainImage} alt={hero.name} />
				</div>
				<div className="right hero stats container">
					<div className="heroDetName" >name</div>
					<div className="heroDetInt" >intro</div>
					<div className="">
						<div className="fdrow heroDetSec" >
							<div className="hp" >hp: {hero.hp}</div>
							{hero.resource &&
								<div className="resource name and amount" >{hero.resourceName}: {hero.resourceAmount}</div>
							}
							{/* change ^ to a func call return based off bool */}
						</div>
						<div className="fdrow heroDetSec" >
							<div className="armor" >armor: {hero.physicalArmor}</div>
							<div className="magic res" >mag Res: {hero.magicResist}</div>
						</div>
						<div className="fdrow heroDetSec" >
							<div className="attack damage" >atk dam: {hero.attackDamage}</div>
							<div className="attack range" >atk rng: {hero.attackRange}</div>
						</div>
						<div className="fdrow heroDetSec" >
							<div className="attack speed" >atk spd: {hero.attackSpeed}</div>
							<div className="move speed" >move spd: {hero.moveSpeed}</div>
						</div>
						<div className="fdrow heroDetSec" >
							<div className="num of abilities" >num abil: {hero.numOfAbilities}</div>
							<div className="hero last updated at" >last uptd: {shrtDate}</div>
						</div>
					</div>
				</div>
				<div className="ability display icons under hero + form">
					{/* abils && abilNum.map(abil => (
					{abil holder comp}
					pass hero abils into each somehow
					OR
					OR
					dont display it here, do it in home for easier
					Drag Drop integration.
				)) */}

				</div>
			</div>
			<div className="little space">
				spacer
				<div className="container for specific hero's abils">
					{/* drag drop. */}
					Current hero abilities
				</div>
			</div>
		</>
	)
}

export default HeroDetailsCard;