import React, { useState } from 'react'
import '../stylings/styleCC.css'
import { useNavigate } from "react-router-dom";

export default function EventPage(props) {
    const [collected, setCollected] = useState(false);
    let navigate = useNavigate();

    return (
        <div>

            {/* <button type='button' className={'btn btn-outline-secondary'}>Back</button> */}
            <div className="white-background d-flex justify-content-center" >
                <div className='event'>

                    <div className='d-flex justify-content-between'>
                        <h3>Event Name: {props.name}</h3>
                        <i className={"cursor bi bi-star" + `${collected ? "-fill" : ""}`} onClick={() => setCollected(!collected)}></i>
                    </div>

                    <div>What this event is about: {props.description}</div>
                    <div>Tags: {props.tags}</div>
                    <div className='d-flex align-items-center justify-content-end'>
                        <button type='button' className={'btn btn-outline-secondary'} onClick={() => navigate('/')}>Back to all events</button>
                        <button type='button' className={'btn btn-outline-secondary'}>Chat with host</button>
                        <button type='button' className={'btn btn-outline-secondary'}>Register now</button>
                    </div>
                </div>
            </div>
        </div>


    )
}
