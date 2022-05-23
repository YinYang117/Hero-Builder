import React, { useContext, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {fetchHeroAbilities} from "../../store/heroAbil";
import { AbilContext } from '../../context/AbilContext';
import { HeroContext } from '../../context/HeroContext';
import AllAbilPortraits from "./allAbilPortraits";
import ChooseAbilImage from "./chooseAbilImage";
import AbilDetails from "./abilDetails";
import AbilEdit from "./abilEdit";
import AbilBuild from "./abilBuild";
import "./abil.css";


const Abils = () => {
	const dispatch = useDispatch();

	const { currAbil, showAbilPortraits, buildingNewAbil, editingAbil } = useContext(AbilContext);
	const { currHero } = useContext(HeroContext);

	// useEffect(()=> {
	// 	if (currHero) dispatch(fetchHeroAbilities(currHero))
	// },[currAbil])

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