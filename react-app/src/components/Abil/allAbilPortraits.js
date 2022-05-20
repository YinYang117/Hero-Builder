import React, { useEffect, useState } from 'react';
import { useSelector } from "react-reduc";
import "./abil.css";

const AllAbilPortraits = ({ }) => {
	const abils = useSelector(state => state.abilities)

	return (
		<>

		</>
	)
}

export default AllAbilPortraits;

// {allAbils && showAbils && allAbils?.arr?.map(abil => (
// 	<div key={abil.id}>
// 		<img src={abil.abilityImage} alt={abil.name}
// 			className="abilImgCarousel hcp"
// 			onClick={e => setCurrAbilFunc(abil)}
// 		/>
// 		<div>{abil.name}</div>
// 	</div>
// ))}