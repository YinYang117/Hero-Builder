import { useState, createContext } from 'react';

export const HeroContext = createContext();

export const HeroProvider = props => {
    const [currHero, setCurrHero] = useState();

    const heroStockImages = [
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804394/clipart-royalty-free-download-render-by-yugiohdragon-yugioh-dark-magician-11562867276kbcoi3kkiw_es0eo6.png",
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804287/Archer-Transparent-Background-2_u09kgp.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802957/woman-1959982_1920_snreod.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652803106/256-2569811_wizard-character-image-black-desert-xbox-wizard-pearl_vsyuto.jpg",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804285/archer-transparent-background_zjacoh.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802951/samurai-gd2a010672_1920_fjnszq.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802945/man-g48349dc3e_1920_wd47lb.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802939/hunter-3447873_1920_oqhotk.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652802933/fantasy-g8ad69c2ca_1920_fo8cmj.png",    
        "https://res.cloudinary.com/dzrimpg5t/image/upload/v1652804403/1125486710_4e2c6b05ab_b_qbkfti.jpg", 
    ]

    return (
        <HeroContext.Provider
            value={{ currHero, setCurrHero, heroStockImages }}
        >
            {props.children}
        </HeroContext.Provider>
    )
}
