import React from 'react'
import '../stylings/styleCC.css';

export default function PreferencePage() {

    return (
        <div className='white-background justify-content-center align-items-center'>
            <h1 className='prefTitle'>What is Your Interest?</h1>
            <h1 className='subtitle'>Please select your interests (up to 5)</h1>

            <div>
                <button class="button button1">Feminism</button>
                <button class="button button2">Environment</button>
                <button class="button button3">LGBTQ</button>
                <button class="button button4">Black Lives Matter</button>
                <button class="button button5">Equity and Inclusion</button>
            </div>

            <button className='continue flex'>Continue</button>
        </div >


    )
}
