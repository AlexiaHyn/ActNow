import React from 'react'
import '../stylings/styleCC.css';

export default function PreferencePage() {

    return (
        <div className='white-background d-flex flex-column align-items-center poppins'>
            <h2 className='prefTitle mt-5'>What is Your Interest?</h2>
            <div className='subtitle'>Please select your interests (up to 5)</div>

            <div className='button-container'>
                <button className="button button1">Gender Equality</button>
                <button className="button button2">Environment</button>
                <button className="button button3">LGBTQ+</button>
                <button className="button button4">Racial Justice</button>
                <button className="button button5">Health</button>

                <button className="button button6">Social Policy</button>
                <button className="button button7">Civil Rights</button>
                <button className="button button8">Education</button>
                <button className="button button9">Poverty</button>
                <button className="button button10">Animals</button>
                <button className="button button11">Anti-War</button>
                <button className="button button12">Energy</button>
            </div>

            <button className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
        </div >


    )
}
