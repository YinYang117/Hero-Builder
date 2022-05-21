import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { HeroContext } from '../../context/HeroContext';
import { buildHero } from "../../store/heros"
import "./hero.css"

const HeroBuild = () => {
	const dispatch = useDispatch(); 


	const { buildingNewHero, setBuildingNewHero, heroImage, currHero, setCurrHero } = useContext(HeroContext);


	return (
		<>

		</>
	)
}

export default HeroBuild;