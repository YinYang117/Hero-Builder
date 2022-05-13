import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


const HeroDetailsCard = ({hero, heroAbil}) => {
	const dispatch = useDispatch();
	// const currHeroAbils = useSelector(state => state.heroAbils)
	// might not need ^ depending on where I display these

	return (
		<div className="hero details container">
			<div className="left image container">
				<img src={hero.mainImage} alt={hero.name}/>
			</div>
			<div className="right hero stats container">
				<div className="hero name" ></div>
				<div className="hero intro" ></div>
				<div className="form container grid">
					<div className="grid row" >
						<div className="hp" ></div>
					{hero.resource &&  
						<div className="resource name and amount" ></div>
					}
					{/* change ^ to a func call return based off bool */}
					</div>
					<div className="grid row" >
						<div className="armor" ></div>
						<div className="magic res" ></div>
					</div>
					<div className="grid row" >
						<div className="attack damage" ></div>
						<div className="attack range" ></div>
					</div>
					<div className="grid row" >
						<div className="attack speed" ></div>
						<div className="move speed" ></div>
					</div>
					<div className="grid row" >
						<div className="num of abilities" ></div>
						<div className="hero last updated at" ></div>
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