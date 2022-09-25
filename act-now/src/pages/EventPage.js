import React, { useState } from 'react'
import '../stylings/styleCC.css'
import { useNavigate } from "react-router-dom";

export default function EventPage(props) {
    const [collected, setCollected] = useState(false);
    let navigate = useNavigate();

    return (
        <div>


            {/* <button type='button' className={'btn btn-outline-secondary'}>Back</button> */}
            <div class=" h-100 d-flex justify-content-center align-items-center" >

                <div className='card rounded event'>
                    <div className='d-flex justify-content-between'>
                        <h3>Event Name: {props.name}</h3>
                        <i className={"cursor bi bi-star" + `${collected ? "-fill" : ""}`} onClick={() => setCollected(!collected)}></i>
                    </div>

                    <div>What this event is about: {props.description}</div>
                    <div>Tags: {props.tags}</div>
                    <div className='d-flex align-items-center justify-content-end'>
                        {/* <button onClick={History.back()}>Back</button> */}
                        <button type='button' className={'btn btn-outline-secondary fixed-btn0'} onClick={() => navigate('/')}>Back to all events</button>
                        <button type='button' className={'btn btn-outline-secondary fixed-btn1'}>Chat with host</button>
                        <button type='button' className={'btn btn-outline-secondary fixed-btn2'}>Register now</button>
                    </div>
                </div>
            </div>
        </div>


    )
}
