import React, { useEffect } from 'react';
import '../stylings/styleCC.css';
import {useState} from 'react';
import { doc, setDoc } from "firebase/firestore";
import {db} from '../firebase/firebase'

export default function PreferencePage(props) {

    const [preferences, setPreferences] = useState([false, false, false, false,false, false,false, false,
        false, false,false, false]);

    //useEffect(() => {(preferences)}, [preferences]);

    async function handleSubmit(e){
        e.preventDefault();
        if(props.user){
            const userRef = doc(db, "user", props.user.uid);
            await setDoc(userRef, {
                preferences: {'Gender Equality': preferences[0], 
                              'Environment': preferences[1],
                              'LGBTQ+': preferences[2],
                              'Racial Justice': preferences[3],
                              'Health': preferences[4],
                              'Social Policy': preferences[5],
                              'Civil Rights': preferences[6],
                              'Education': preferences[7],
                              'Poverty': preferences[8],
                              'Animals': preferences[9],
                              'Anti-War': preferences[10],
                              'Energy': preferences[11],}
            }, {merge : true});
        }
        window.location="/";
    }

    function handleChange(index){
        let newArr = [...preferences];
        newArr[index] = !newArr[index];
        setPreferences(newArr);
    }

    return (
        <div className='white-background d-flex flex-column align-items-center justify-content-center poppins'>
            <h2 className='prefTitle mt-5'>What do you care about?</h2>
            <div className='subtitle'>Please select your interests</div>
            <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>

                <div className='button-container'>
                    <button type="button" className="button button1" onClick={() => {handleChange(0)}} style={{color: preferences[0]? "white": "black", backgroundColor: preferences[0]? '#a7abaf':'#e9ecef'}}>Gender Equality</button>
                    <button type="button" className="button button2" onClick={() => {handleChange(1)}} style={{color: preferences[1]? "white": "black", backgroundColor: preferences[1]? '#72d87f':'#d5ffda'}}>Environment</button>
                    <button type="button" className="button button3" onClick={() => {handleChange(2)}} style={{color: preferences[2]? "white": "black", backgroundColor: preferences[2]? '#d9a565':'#fce0bd'}}>LGBTQ+</button>
                    <button type="button" className="button button4" onClick={() => {handleChange(3)}} style={{color: preferences[3]? "white": "black", backgroundColor: preferences[3]? '#f69595':'#f7d0d0'}}>Racial Justice</button>
                    <button type="button" className="button button5" onClick={() => {handleChange(4)}} style={{color: preferences[4]? "white": "black", backgroundColor: preferences[4]? '#d57598':'#fbd6e4'}}>Health</button>
                    <button type="button" className="button button6" onClick={() => {handleChange(5)}} style={{color: preferences[5]? "white": "black", backgroundColor: preferences[5]? '#cd84e0':'#f1d8f7'}}>Social Policy</button>
                    <button type="button" className="button button7" onClick={() => {handleChange(6)}} style={{color: preferences[6]? "white": "black", backgroundColor: preferences[6]? '#9278db':'#ded4fa'}}>Civil Rights</button>
                    <button type="button" className="button button8" onClick={() => {handleChange(7)}} style={{color: preferences[7]? "white": "black", backgroundColor: preferences[7]? '#7f95ec':'#d2dbfc'}}>Education</button>
                    <button type="button" className="button button9" onClick={() => {handleChange(8)}} style={{color: preferences[8]? "white": "black", backgroundColor: preferences[8]? '#6eb4ea':'#d1e9fb'}}>Poverty</button>
                    <button type="button" className="button button10" onClick={() => {handleChange(9)}} style={{ color: preferences[9]? "white": "black", backgroundColor: preferences[9]? '#52c6d3':'#d7f7fb'}}>Animals</button>
                    <button type="button" className="button button11" onClick={() => {handleChange(10)}} style={{  color: preferences[10]? "white": "black", backgroundColor: preferences[10]? '#ead05e':'#f7eec6'}}>Anti-War</button>
                    <button type="button" className="button button12" onClick={() => {handleChange(11)}} style={{  color: preferences[11]? "white": "black", backgroundColor: preferences[11]? '#4dd0a9':'#c7fcec'}}>Energy</button>
                </div>


                <button type="submit" className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
            </form>
        </div >
    )
}
