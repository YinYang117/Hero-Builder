import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


const HeroDetailsCard = ({hero, heroAbil}) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	return (
		<div className="hero details container">
			<div className="left image container">
				image
				<img src={hero.mainImage} alt={hero.name}/>
			</div>
			<div className="right hero stats container">
				<div className="hero name" >name</div>
				<div className="hero intro" >intro</div>
				<div className="form container grid">
					<div className="grid row" >
						<div className="hp" >hp</div>
					{hero.resource &&  
						<div className="resource name and amount" ></div>
					}
					{/* change ^ to a func call return based off bool */}
					</div>
					<div className="grid row" >
						<div className="armor" >armor</div>
						<div className="magic res" >mag Res</div>
					</div>
					<div className="grid row" >
						<div className="attack damage" >atk dam</div>
						<div className="attack range" >atk rng</div>
					</div>
					<div className="grid row" >
						<div className="attack speed" >atk spd</div>
						<div className="move speed" >move spd</div>
					</div>
					<div className="grid row" >
						<div className="num of abilities" >num abil</div>
						<div className="hero last updated at" >last uptd</div>
					</div>
					<div className="" ></div>
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
	)
}

export default HeroDetailsCard;