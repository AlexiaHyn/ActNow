import React from 'react';
import LogoWords from '../components/LogoWords';
import Logo from '../components/Logo';

export default function HomePage() {
  return (
    <div className='black-background d-flex flex-column justify-content-center align-items-center text-white poppins'>
      <div className='d-flex'>
        <div style={{width: "13vw"}} className="appear">
            <Logo color="white"/>
        </div>
        <div style={{width: "12vw"}} className="pt-5 me-5 appear">
          <LogoWords/>
        </div>
      </div>
        

        <h5 className='m-3 appear-slow'>Be active. Change our lives.</h5>

        {/* <div className='button-container position-absolute'>
            <button type="button" className="button button1" ></button>
            <button type="button" className="button button2" ></button>
            <button type="button" className="button button3" ></button>
            <button type="button" className="button button4" ></button>
            <button type="button" className="button button5" ></button>
            <button type="button" className="button button6" ></button>
            <button type="button" className="button button7" ></button>
            <button type="button" className="button button8" ></button>
            <button type="button" className="button button9" ></button>
            <button type="button" className="button button10" ></button>
            <button type="button" className="button button11" ></button>
            <button type="button" className="button button12" ></button>
        </div> */}
        
    </div>
  )
}
