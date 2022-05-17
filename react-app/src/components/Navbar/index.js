import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import dwarf from "./dwarf.png"
import demo from "./demo.png"
import './navbar.css'


const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);

  const loginDemo = () => {
    dispatch(login({credential: "Demo", password: "password"}))
  }

  return (
    <nav className="nav fdrow aicen sb">
      <div className="fdrow sb">
        <NavLink to='/' exact={true} activeClassName='active' className="m10">
          <img src={dwarf} alt="dwarf logo" className="logo" />
        </NavLink>
      </div>
      <h1 className="title">
        Hero Builder
      </h1>
      <div>
        {!user && 
        <div className="fdrow m10">
          <div>
            <div className="p10">
              <img src={demo} alt="demo login" className="smlogo jccen accen" onClick={() => loginDemo()} />
            </div>
          </div>
          <div>
            <div className="p10 jccen accen">
              <Login />
            </div>
          </div>
          <div>
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
