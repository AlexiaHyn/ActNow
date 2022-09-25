import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InitiateEvent() {
    const navigate = useNavigate();
  return (
    <button className='btn btn-dark initiate-event d-flex justify-content-center align-items-center fs-2'
        onClick={()=>{navigate("/initiate")}}
        style={{borderRadius: "50%"}}
    >+</button>
  )
}
