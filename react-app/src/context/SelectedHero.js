import { useState, createContext } from 'react';

export const HeroContext = createContext();

export const HeroProvider = props => {
    const [currHero, setCurrHero] = useState();

    return (
        <HeroContext.Provider
            value={{ currHero, setCurrHero }}
        >
            {props.children}
        </HeroContext.Provider>
    )
}
