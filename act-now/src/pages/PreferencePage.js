import React from 'react'
import '../stylings/styleCC.css';

export default function PreferencePage() {

    return (
        <div className='white-background d-flex flex-column align-items-center justify-content-center poppins'>
            <h2 className='prefTitle mt-5'>What is Your Interest?</h2>
            <div className='subtitle'>Please select your interests (up to 5)</div>
            <form className='d-flex flex-column align-items-center'>
                <div className='button-container'>
                    <button className="button button1">Feminism</button>
                    <button className="button button2">Environment</button>
                    <button className="button button3">LGBTQ</button>
                    <button className="button button4">Black Lives Matter</button>
                    <button className="button button5">Equity and Inclusion</button>
                </div>

                <button type="submit" className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
            </form>
        </div >
    )
}
