import React, { useState, useContext } from 'react';
import { AbilContext } from '../../context/AbilContext';
// import { useSelector } from "react-redux";
import AllAbilPortraits from "./allAbilPortraits";
import ChooseAbilImage from "./chooseAbilImage";
import AbilDetails from "./abilDetails";
import AbilEdit from "./abilEdit";
import AbilBuild from "./abilBuild";
import "./abil.css";

const Abils = ({showAbilPortraits, buildingNewAbil, setBuildingNewAbil}) => {
	// const abils = useSelector(state => state.abilities);
	const { currAbil, setCurrAbil, abilStockImages } = useContext(AbilContext);

	const [editingAbil, setEditingAbil] = useState(false);
	const [abilImage, setAbilImage] = useState();

	return (
		<>
			{showAbilPortraits &&
			<AllAbilPortraits />
			}
			{(editingAbil || buildingNewAbil) &&
			<ChooseAbilImage abilImage={abilImage} setAbilImage={setAbilImage} />
			}
			{!editingAbil &&
			<AbilDetails setEditingAbil={setEditingAbil} />
			}
			{editingAbil && !buildingNewAbil &&
			<AbilEdit abilImage={abilImage} setAbilImage={setAbilImage} />
			}
			{buildingNewAbil &&
			<AbilBuild abilImage={abilImage} setAbilImage={setAbilImage} />
			}
		</>
	)
}

export default Abils;