import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import "./stylings/styleAH.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import PreferencePage from './pages/PreferencePage';
import RequireAuth from './components/RequireAuth';
import { db, auth } from './firebase/firebase';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createBrowserHistory } from "history";


function App() {
  const [user, setUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const history = createBrowserHistory()
        if (!user.emailVerified && history.location.pathname.includes('/signup')) {
          auth.signOut();
          return
        }
        if (!user.emailVerified && !history.location.pathname.includes('/signup')) {
          alert("attempt to login email without verification");
          auth.signOut();
          return;
        }
        const docRef = doc(db, "user", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (!docSnap.exists()) {
            setDoc(doc(db, "user", user.uid), {
              name: "",
              //To be added
            }).then(
              //send to preference page
            );
          }
        })
      }
      setUser(user);
      setIsUserUpdated(true);
    });
  }, []);

  return (
    <div>
      <Navbar user={user} />

      <Routes>
        <Route element={
          <RequireAuth user={user}>
            <MainPage user={user} />
          </RequireAuth>
        } path='/' />

        <Route element={<PreferencePage />} path='/preference'></Route>
        <Route element={<HomePage />} path='/home'></Route>
        <Route element={<LoginPage />} path='/login'></Route>
        <Route element={<SignupPage />} path='/signup'></Route>
      </Routes>

    </div>
  );
}

export default App;
