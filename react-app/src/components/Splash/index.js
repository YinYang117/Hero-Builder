import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
        <img src={seige} alt="Splash Seige" className="splash" />
        {user &&
            <button className="toHome" onClick={toHome}>Start Building Heros!</button>
        }
    </>
    )
}

export default Splash;