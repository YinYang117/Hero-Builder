import React, { useContext } from 'react';
import { AbilContext } from '../../context/AbilContext';
import AllAbilPortraits from "./allAbilPortraits";
import ChooseAbilImage from "./chooseAbilImage";
import AbilDetails from "./abilDetails";
import AbilEdit from "./abilEdit";
import AbilBuild from "./abilBuild";
import "./abil.css";


const Abils = () => {
	const { currAbil, showAbilPortraits, buildingNewAbil, editingAbil } = useContext(AbilContext);


	return (
		<>
			{showAbilPortraits &&
			<AllAbilPortraits />
			}
			{(editingAbil || buildingNewAbil) &&
			<ChooseAbilImage />
			}
			{currAbil && !editingAbil && !buildingNewAbil &&
			<AbilDetails />
			}
			{currAbil && editingAbil && !buildingNewAbil &&
			<AbilEdit />
			}
			{buildingNewAbil && !currAbil && !editingAbil &&
			<AbilBuild />
			}
		</>
	)
}

export default Abils;