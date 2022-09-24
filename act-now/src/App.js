import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import "./stylings/styleAH.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import RequireAuth from './components/RequireAuth';
import { createBrowserHistory } from "history";
import { auth } from './firebase/firebase';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged , deleteUser} from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const history = createBrowserHistory()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        if(!user.emailVerified && history.location.pathname.includes('/signup')){
          auth.signOut();
          return
        }
        if (!user.emailVerified && !history.location.pathname.includes('/signup')){
          alert("attempt to login email without verification");
          auth.signOut();
          return;
          //deleteUser(user);
        }
      }
      console.log('success update')
      setUser(user);
      setIsUserUpdated(true);
    });
  }, []);

  return (
   <BrowserRouter>
    <Navbar user={user}/>
    <Routes>
      <Route element={
          <RequireAuth user={user}>
            <MainPage user={user}/>
          </RequireAuth>
        } path='/'/>
      
      <Route element={<HomePage/>} path='/home'></Route>
      <Route element={<LoginPage/>} path='/login'></Route>
      <Route element={<SignupPage/>} path='/signup'></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
