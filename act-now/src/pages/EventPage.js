import React, { useState } from 'react'
import '../stylings/styleCC.css'
import { useNavigate } from "react-router-dom";

export default function EventPage(props) {
    const [collected, setCollected] = useState(false);
    let navigate = useNavigate();

    return (
        <div className='poppins pt-5'>
            <div className="white-background d-flex justify-content-center pt-5" >
                <div className='event'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Event Name: {props.name}</h2>
                        <div className='d-flex align-items-center'>
                            <button type='button' className={'btn btn-dark mx-2'}>Join Event</button>
                            <i className={"cursor fs-5 bi bi-star" + `${collected ? "-fill" : ""}`} onClick={() => setCollected(!collected)}></i>
                        </div>
                    </div>

                    <div>Brief Overview: {props.intro}</div>
                    <div>Event Details:</div>
                    <div>{props.description}</div>
                    <div>Tags: {props.tags}</div>
                    <div className='d-flex align-items-center justify-content-end'>
                        <button type='button' className={'btn btn-outline-secondary mx-2'} onClick={() => navigate('/')}>{"<< Back to all events"}</button>
                        <button type='button' className={'btn btn-secondary'}>Chat with host</button>
                        
                    </div>
                </div>
            </div>
        </div>


    )
}
