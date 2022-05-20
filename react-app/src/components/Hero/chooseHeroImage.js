import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import "./hero.css";

const ChooseHeroImage = ({ }) => {
	const heros = useSelector(state => state.heros)

	return (
		<>

		</>
	)
}

export default ChooseHeroImage;