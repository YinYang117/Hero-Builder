import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import logoutIcon from "./logout.png"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
            <img src={logoutIcon} alt="login"
            className="mlogo hcp ml10 m10"
            onClick={onLogout}
            />
  )
};

export default LogoutButton;
