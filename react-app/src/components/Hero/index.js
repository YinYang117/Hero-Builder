import React, { useState, useContext } from 'react';
import { HeroContext } from "../../context/HeroContext";
import AllHeroPortraits from "./allHeroPortraits";
import ChooseHeroImage from "./chooseHeroImage";
import HeroDetails from "./heroDetails";
import HeroEdit from "./heroEdit";
import HeroBuild from "./heroBuild";
import "./hero.css";


const Heros = ({showHeroPortraits, buildingNewHero, setBuildingNewHero}) => {
	const { currHero } = useContext(HeroContext);

	const [editingHero, setEditingHero] = useState(false);
	const [heroImage, setHeroImage] = useState();
		
	return (
		<>
			{showHeroPortraits &&
			<AllHeroPortraits />
			}
			{(editingHero || buildingNewHero) &&
			<ChooseHeroImage heroImage={heroImage}
				setHeroImage={setHeroImage} />
			}
			{currHero && !editingHero && !buildingNewHero &&
			<HeroDetails setEditingHero={setEditingHero} />
			}
			{currHero && editingHero && !buildingNewHero &&
			<HeroEdit heroImage={heroImage}
				setHeroImage={setHeroImage}
				editingHero={editingHero}
				setEditingHero={setEditingHero} />
			}
			{buildingNewHero && !currHero && !editingHero &&
			<HeroBuild heroImage={heroImage}
				setHeroImage={setHeroImage} />
			}
		</>
	)
}

export default Heros;