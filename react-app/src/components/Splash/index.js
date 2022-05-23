import React from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
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
        alt="Blue and Purple Art"
        className="splash"
        />
        <div className="welcomeCard fdcol bsbb jccen aicen">
            <div className="Aflarg p10" >Welcome to</div>
            <div className="Aflarg" >The one and only</div>
            <div className="Aflarg p10" >Site for Building Heros!</div>
            <div>Log in now to start!</div>
        </div>
        {user &&
            <button
            className="toHome hcp"
            onClick={toHome}>
                Start Building Heros!
            </button>
        }
    </>
    )
}

export default Splash;