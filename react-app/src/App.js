import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/Login';
import SignUpForm from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/Navbar';
import Splash from './components/Splash'
import Home from './components/Home'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/home' exact={true} >
          <Home />
        </Route>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
