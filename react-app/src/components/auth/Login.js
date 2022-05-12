import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { login } from '../../store/session';
import loginIcon from "./login.png"
import './auth.css';



const Login = () => {
    const dispatch = useDispatch();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(credential, password));
        if (data) setErrors(data);
        // history.push("/home")
      };

    return (
        <>
            <img src={loginIcon} alt="login"
            className="smlogo"
            onClick={() => setShowLoginModal(true)} />
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <div className="formContainer">
                        <form className="form" onSubmit={login}>
                            <div>
                                {errors && errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                            <div>
                                <label>Username or Email</label>
                                <input
                                name='credential'
                                type='text'
                                placeholder='Credential'
                                value={credential}
                                onChange={e => setCredential(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor='password'>Password</label>
                                <input className="input"
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button id="loginButton" type='submit'>Login</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default Login;