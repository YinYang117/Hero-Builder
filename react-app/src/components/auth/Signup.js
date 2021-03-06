import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { Modal } from "../../context/Modal";
import { signUp } from '../../store/session';
import signupIcon from './signup.png'
import './auth.css'


const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (!data) history.push("/home")
      else setErrors(data)
    } else {
      setErrors(["Password and Confirm Password don't match"])
    }
  };

  return (
    <>
      <div className="smlogo hcp wrapper">
        <img
          src={signupIcon} alt="signup"
          className="smlogo hcp wrapper"
          onClick={() => setShowSignupModal(true)}
        />
        <div className="textbubble">Signup</div>
      </div>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <form onSubmit={onSignUp}
            className="formContainer form fdcol aicen">
            <div>
              {errors.map(error => (
                <div key={error} className="rerr">
                  {error}
                </div>
              ))}
            </div>
            <div className="aicen fdcol mt5">
              <label className="mt5">User Name</label>
              <input
                className="input"
                type='text'
                name='username'
                onChange={e => setUsername(e.target.value)}
                value={username}
              ></input>
            </div>
            <div className="aicen fdcol mt5">
              <label className="mt5">Email</label>
              <input
                className="input"
                type='email'
                name='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>
            <div className="aicen fdcol mt5">
              <label className="mt5">Password</label>
              <input
                className="input"
                type='password'
                name='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
            <div className="aicen fdcol mt5">
              <label className="mt5">Repeat Password</label>
              <input
                className="input"
                type='password'
                name='repeat_password'
                onChange={e => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type='submit' className="loginButton">Sign Up</button>
          </form>
        </Modal>)}
    </>
  );
};

export default Signup;