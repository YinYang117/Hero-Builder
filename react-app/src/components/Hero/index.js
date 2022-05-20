import React, { useState, useContext } from 'react';
import { HeroContext } from '../../context/HeroContext';
// import { useSelector } from "react-redux";
import AllHeroPortraits from "./allHeroPortraits";
import ChooseHeroImage from "./chooseHeroImage";
import HeroDetails from "./heroDetails";
import HeroEdit from "./heroEdit";
import HeroBuild from "./heroBuild";
import "./hero.css";

const Heros = ({showHeroPortraits, buildingNewHero, setBuildingNewHero}) => {
	// const heros = useSelector(state => state.abilities);
	const { currHero, setCurrHero, heroStockImages } = useContext(HeroContext);

	const [editingHero, setEditingHero] = useState(false);
	const [heroImage, setHeroImage] = useState();
		
	return (
		<>
			{showHeroPortraits &&
			<AllHeroPortraits />
			}
			{(editingHero || buildingNewHero) &&
			<ChooseHeroImage heroImage={heroImage} setHeroImage={setHeroImage} />
			}
			{!editingHero &&
			<HeroDetails setEditingHero={setEditingHero} />
			}
			{editingHero && !buildingNewHero &&
			<HeroEdit heroImage={heroImage} setHeroImage={setHeroImage} />
			}
			{buildingNewHero &&
			<HeroBuild heroImage={heroImage} setHeroImage={setHeroImage} />
			}
		</>
	)
}

export default Heros;