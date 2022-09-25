import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import Logo from './Logo';
import {auth} from '../firebase/firebase'
import { doc, getDoc} from "firebase/firestore";
import { db } from '../firebase/firebase';

export default function NavBar(props) {
    const router = useNavigate()
    const location = useLocation()
    const [homePage, setHomePage] = useState(true)
    const [imgURL, setURL] = useState("");

    useEffect(()=>{
        if (location.pathname.includes("story")){
            setHomePage(false)
        } else{
            setHomePage(true)
        }
    }, [location])

    useEffect(() => {
        if(props.user){
            const userRef = doc(db, "user", props.user.uid);
            getDoc(userRef).then((docSnap)=>{
            if(docSnap.exists()){
              setURL(docSnap.data()['profileImage']);
            }
          });
        }
    }, [props.user]);
  return (
    <div className='poppins' style={{position: "fixed", width: "100%", zIndex: 999}}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-black roboto">
            <div className="container-fluid">
                <a className="navbar-brand ps-3" href="/">
                    <div style={{width: "50px"}}>
                        <Logo color="white"/>
                    </div>
                </a>
                
              
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <div className='d-flex align-items-center'> 
                        {
                            props.user ?
                            <>
                                <button className='btn btn-outline-light' onClick={() => {auth.signOut()}}>Sign Out</button>
                                <div className='headshot mx-2' onClick={()=>router("/profile")}>
                                    <img src={imgURL} style={{objectFit: "contain", maxHeight: "40px"}}></img>
                                </div>
                            </>
                            
                            :
                            <>
                                <button className='btn btn-light mx-1' onClick={()=>router("/signup")}>Sign Up</button>
                                <button className='btn btn-outline-light mx-1' onClick={()=>router("/login")}>Login</button>
                            </>
                        }
                            
                        </div>
                    </ul>
                    
                
                </div>
                
            </div>
        </nav>
    </div>
  )
}