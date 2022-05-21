import React, { useContext } from 'react';
import { HeroContext } from "../../context/HeroContext";
import AllHeroPortraits from "./allHeroPortraits";
import ChooseHeroImage from "./chooseHeroImage";
import HeroDetails from "./heroDetails";
import HeroEdit from "./heroEdit";
import HeroBuild from "./heroBuild";
import "./hero.css";


const Heros = () => {
	const { currHero, showHeroPortraits, buildingNewHero, editingHero } = useContext(HeroContext);

	
	return (
		<>
			{showHeroPortraits &&
			<AllHeroPortraits />
			}
			{(editingHero || buildingNewHero) &&
			<ChooseHeroImage />
			}
			{currHero && !editingHero && !buildingNewHero &&
			<HeroDetails />
			}
			{currHero && editingHero && !buildingNewHero &&
			<HeroEdit />
			}
			{buildingNewHero && !currHero && !editingHero &&
			<HeroBuild />
			}
		</>
	)
}

export default Heros;