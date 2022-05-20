import React, { useState } from 'react';

// import { useSelector } from "react-redux";
import AllHeroPortraits from "./allHeroPortraits";
import ChooseHeroImage from "./chooseHeroImage";
import HeroDetails from "./heroDetails";
import HeroEdit from "./heroEdit";
import HeroBuild from "./heroBuild";
import "./hero.css";


const Heros = ({showHeroPortraits, buildingNewHero, setBuildingNewHero}) => {

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
			{!editingHero &&
			<HeroDetails setEditingHero={setEditingHero} />
			}
			{editingHero && !buildingNewHero &&
			<HeroEdit heroImage={heroImage}
				setHeroImage={setHeroImage}
				editingHero={editingHero}
				setEditingHero={setEditingHero} />
			}
			{buildingNewHero &&
			<HeroBuild heroImage={heroImage}
				setHeroImage={setHeroImage} />
			}
		</>
	)
}

export default Heros;