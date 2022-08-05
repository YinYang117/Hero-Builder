import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/Navbar';
import ButtonAppBar from './components/Navbar/copy';
import Splash from './components/Splash'
import Home from './components/Home'
import UserProfilePage from './components/UserProfile'
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
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <Route path="/short" exact={true}>
          <ButtonAppBar />
        </Route>
        <Route path="/profile" exact={true}>
          <UserProfilePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
