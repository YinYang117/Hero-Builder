import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import "./hero.css";

const AllHeroPortraits = ({ }) => {
	const heros = useSelector(state => state.heros)

	return (
		<>
			{heros?.arr?.map(hero => (
			
			))}
		</>
	)
}

export default AllHeroPortraits;