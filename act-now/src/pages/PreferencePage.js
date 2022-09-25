import React, { useEffect } from 'react'
import '../stylings/styleCC.css';
import {useState} from 'react';

export default function PreferencePage() {

    const [preferences, setPreferences] = useState([false, false, false, false,false, false,false, false,
        false, false,false, false]);

    //useEffect(() => {(preferences)}, [preferences]);

    function handleChange(index){
        let newArr = [...preferences];
        newArr[index] = !newArr[index];
        setPreferences(newArr);
    }

    return (
        <div className='white-background d-flex flex-column align-items-center justify-content-center poppins'>
            <h2 className='prefTitle mt-5'>What do you care about?</h2>
            <div className='subtitle'>Please select your interests (up to 5)</div>
            <form className='d-flex flex-column align-items-center'>

                <div className='button-container'>
                    <button type="button" className="button button1" onClick={() => {handleChange(0)}} style={{ backgroundColor: preferences[0] ? '#a7abaf':'#e9ecef'}}> Gender Equality</button>
                    <button type="button" className="button button2" onClick={() => {handleChange(1)}} style={{ backgroundColor: preferences[1]? '#72d87f':'#b2f2bb'}}>Environment</button>
                    <button type="button" className="button button3" onClick={() => {handleChange(2)}} style={{ backgroundColor: preferences[2]? '#d9a565':'#ffd8a8'}}>LGBTQ+</button>
                    <button type="button" className="button button4" onClick={() => {handleChange(3)}} style={{ backgroundColor: preferences[3]? '#f69595':'#ffc9c9'}}>Racial Justice</button>
                    <button type="button" className="button button5" onClick={() => {handleChange(4)}} style={{ backgroundColor: preferences[4]? '#d57598':'#fcc2d7'}}>Health</button>
                    <button type="button" className="button button6" onClick={() => {handleChange(5)}} style={{ backgroundColor: preferences[5]? '#cd84e0':'#eebefa'}}>Social Policy</button>
                    <button type="button" className="button button7" onClick={() => {handleChange(6)}} style={{ backgroundColor: preferences[6]? '#9278db':'#d0bfff'}}>Civil Rights</button>
                    <button type="button" className="button button8" onClick={() => {handleChange(7)}} style={{ backgroundColor: preferences[7]? '#7f95ec':'#bac8ff'}}>Education</button>
                    <button type="button" className="button button9" onClick={() => {handleChange(8)}} style={{ backgroundColor: preferences[8]? '#6eb4ea':'#a5d8ff'}}>Poverty</button>
                    <button type="button" className="button button10" onClick={() => {handleChange(9)}} style={{ backgroundColor: preferences[9]? '#52c6d3':'#99e9f2'}}>Animals</button>
                    <button type="button" className="button button11" onClick={() => {handleChange(10)}} style={{ backgroundColor: preferences[10]? '#ead05e':'#ffec99'}}>Anti-War</button>
                    <button type="button" className="button button12" onClick={() => {handleChange(11)}} style={{ backgroundColor: preferences[11]? '#4dd0a9':'#96f2d7'}}>Energy</button>
                </div>


                <button type="submit" className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
            </form>
        </div >
    )
}
