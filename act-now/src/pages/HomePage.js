import React from 'react';
import LogoWords from '../components/LogoWords';
import Logo from '../components/Logo';

export default function HomePage() {
  return (
    <div className='black-background d-flex justify-content-center align-items-center text-white'>
        <div style={{width: "13vw"}} className="appear">
            <Logo color="white"/>
        </div>
        <div style={{width: "12vw"}} className="pt-5 me-5 appear">
          <LogoWords/>
        </div>
        
    </div>
  )
}
