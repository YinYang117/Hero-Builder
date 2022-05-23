import { useState, createContext } from 'react';

export const HeroContext = createContext();

export const HeroProvider = props => {
    const [showHeroPortraits, setShowHeroPortraits] = useState(false);
    const [buildingNewHero, setBuildingNewHero]     = useState(false);
    const [editingHero, setEditingHero]             = useState(false);
	const [heroImage, setHeroImage]                 = useState();
    const [currHero, setCurrHero]                   = useState();

    const heroStockImages = [
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804287/Archer-Transparent-Background-2_u09kgp.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802957/woman-1959982_1920_snreod.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804285/archer-transparent-background_zjacoh.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802951/samurai-gd2a010672_1920_fjnszq.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802945/man-g48349dc3e_1920_wd47lb.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802939/hunter-3447873_1920_oqhotk.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802933/fantasy-g8ad69c2ca_1920_fo8cmj.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279048/man-1889980_1920_nreptu.png",
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279221/man-1884911_1920_kcpevr.png",
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279194/girl-1998466_1920_jmmayy.png",
    ]


    return (
        <HeroContext.Provider
            value={{ heroStockImages, currHero, setCurrHero, heroImage, setHeroImage, editingHero, setEditingHero, buildingNewHero, setBuildingNewHero, showHeroPortraits, setShowHeroPortraits }}
        >
            {props.children}
        </HeroContext.Provider>
    )
}