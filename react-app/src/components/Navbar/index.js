import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import dwarf from "./dwarf.png"
import demo from "./demo.png"
import './navbar.css'


const NavBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user);

  const loginDemo = async () => {
    await dispatch(login("Demo", "password"))
      .then(() => history.push('/home'))
  }

  const [showMyLinks, setShowMyLinks] = useState();

  const myLinks = () => {
    setShowMyLinks(!showMyLinks)
  }


  return (
    <nav className="nav fdrow aicen sb bsbb">
      <div className="fdcol sa">
        <img src={dwarf} alt="dwarf logo" className="logo m10 hcp" onClick={myLinks} />
        <div className="profile-dropdown fdcol jccen"
          style={{ display: showMyLinks ? "flex" : "none" }}>
          <a href="https://www.linkedin.com/in/ryan-schneider-90830a217/" target="_blank" rel="noopener noreferrer">
            <img
              alt="Linkedin logo" className="logo m10 hcp"
              src={"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653190240/linkedin_jpy8fw.png"}
            />
          </a>
          <a href="https://github.com/YinYang117" target="_blank" rel="noopener noreferrer">
            <img
              alt="Github logo" className="logo m10 hcp"
              src={"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653190197/github-logo_zj8vq3.png"}
            />
          </a>
        </div>
      </div>
      {!user &&
      <h1 className="Aflarg title">
        Hero Builder
      </h1>}
      {user &&
			<h1 className="Aflarg title">
				Welcome to Hero Builder {user.username}!
			</h1>}
      <div>
        {!user &&
          <div className="fdrow m10">
            <div className="p10 hcp wrapper">
              <img src={demo} alt="demo login" className="smlogo jccen accen" onClick={() => loginDemo()} />
              <div className="textbubble">Demo</div>
            </div>
            <div className="p10 jccen accen">
              <Login />
            </div>
            <div className="p10 jccen accen">
              <Signup />
            </div>
          </div>
        }
        {user &&
          <div>
            <LogoutButton />
          </div>
        }
      </div>
    </nav>
  );
}

export default NavBar;
