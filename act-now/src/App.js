import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';

import "./stylings/styleAH.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import PreferencePage from './pages/PreferencePage';
import EventPage from './pages/EventPage';
import SetProfilePage from './pages/SetProfilePage';
import ProfilePage from './pages/ProfilePage';
import InitiatePage from './pages/InitiatePage';

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

        }
        if (!user.emailVerified && !history.location.pathname.includes('/signup')) {
          alert("attempt to login email without verification");
          auth.signOut();

        }
        const docRef = doc(db, "user", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (!docSnap.exists()) {
            //delete once the preference page is done
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
      {
        isUserUpdated ?
          <Routes>
            <Route element={
              <RequireAuth user={user}>
                <MainPage user={user} />
              </RequireAuth>
            } path='/' />

            <Route element={
              <RequireAuth user={user}>
                <PreferencePage user={user} />
              </RequireAuth>
            } path='/preference'></Route>
            <Route element={
              <RequireAuth user={user}>
                <SetProfilePage user={user} />
              </RequireAuth>
            } path='/setprofile'></Route>
            <Route element={
              <RequireAuth user={user}>
                <EventPage />
              </RequireAuth>
            } path='/event'></Route>
            <Route element={
              <RequireAuth user={user}>
                <ProfilePage user={user} />
              </RequireAuth>
            } path='/profile'></Route>
            <Route element={
              <RequireAuth user={user}>
                <SetProfilePage user={user} />
              </RequireAuth>
            } path='/setprofile'></Route>
            <Route element={
              <RequireAuth user={user}>
                <InitiatePage user={user} />
              </RequireAuth>
            } path='/initiate'></Route>

            <Route element={<HomePage />} path='/home'></Route>
            <Route element={<LoginPage />} path='/login'></Route>
            <Route element={<SignupPage />} path='/signup'></Route>
            <Route element={<SetProfilePage user={user} />} path='/setprofile'></Route>
            <Route element={<EventPage />} path='/events/:id'></Route>
            <Route element={<ProfilePage user={user} />} path='/profile'></Route>
            <Route element={<SetProfilePage user={user} />} path='/setprofile'></Route>

          </Routes>
          :
          "Loading"
      }
    </div >
  );
}

export default App;
