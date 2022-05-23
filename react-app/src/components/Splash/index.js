import React from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import seige from "./seige.jpg"
import './splash.css'


const Splash = () => {
    const history = useHistory();
	const user = useSelector(state => state.session.user)

    const toHome = () => {
        history.push("/home")
    }

    return (
    <>
        <img 
        src={"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653189408/17450_ufsosh.jpg"}
        alt="Splash Seige"
        className="splash"
        />
        {user &&
            <button className="toHome" onClick={toHome}>Start Building Heros!</button>
        }
        {/* TODO fix this weird button, and add the other min req to splash */}
    </>
    )
}

export default Splash;