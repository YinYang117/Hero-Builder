import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { login } from '../../store/session';
import loginIcon from "./login.png"
import './auth.css';


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const loginFunc = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(credential, password));
        if (!data) history.push("/home")
        else setErrors(data)
        // console.log("data, comp auth login", data)
    };

    return (
        <>
            <div className="smlogo hcp wrapper">
                <img
                    src={loginIcon} alt="login"
                    className="smlogo hcp wrapper"
                    onClick={() => setShowLoginModal(true)}
                />
                <div className="textbubble">Login</div>
            </div>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <form
                        className="formContainer form fdcol"
                        onSubmit={e => loginFunc(e)}>
                        <div>
                            {errors && errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className="aicen fdcol">
                            <label className="label">Username or Email</label>
                            <input className="input"
                                name='credential'
                                type='text'
                                placeholder='Credential'
                                value={credential}
                                onChange={e => setCredential(e.target.value)}
                            />
                        </div>
                        <div className="aicen fdcol">
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
                </Modal>
            )}
        </>
    )
}

export default Login;