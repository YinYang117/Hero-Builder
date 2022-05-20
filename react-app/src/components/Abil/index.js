import React, { useState, useContext } from 'react';
import { AbilContext } from '../../context/AbilContext';
import AllAbilPortraits from "./allAbilPortraits";
import ChooseAbilImage from "./chooseAbilImage";
import AbilDetails from "./abilDetails";
import AbilEdit from "./abilEdit";
import AbilBuild from "./abilBuild";
import "./abil.css";


const Abils = ({showAbilPortraits, buildingNewAbil, setBuildingNewAbil}) => {
	const { currAbil } = useContext(AbilContext);

	const [editingAbil, setEditingAbil] = useState(false);
	const [abilImage, setAbilImage] = useState();

	return (
		<>
			{showAbilPortraits &&
			<AllAbilPortraits />
			}
			{(editingAbil || buildingNewAbil) &&
			<ChooseAbilImage abilImage={abilImage}
				setAbilImage={setAbilImage} />
			}
			{currAbil && !editingAbil && !buildingNewAbil &&
			<AbilDetails setEditingAbil={setEditingAbil} />
			}
			{currAbil && editingAbil && !buildingNewAbil &&
			<AbilEdit abilImage={abilImage} setAbilImage={setAbilImage} />
			}
			{buildingNewAbil && !currAbil && !editingAbil &&
			<AbilBuild abilImage={abilImage} setAbilImage={setAbilImage} />
			}
		</>
	)
}

export default Abils;