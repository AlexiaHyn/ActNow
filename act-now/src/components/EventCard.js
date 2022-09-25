import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function EventCard(props) {
  const [collected, setCollected] = useState(false);
  const [going, setGoing] = useState(false);
  let navigate = useNavigate();

  return (
    <div className='card rounded event-card'>
      <div className='d-flex justify-content-between'>
        <h3>{props.title}</h3>
        <i className={"cursor bi bi-star" + `${collected ? "-fill" : ""}`} onClick={() => setCollected(!collected)}></i>
      </div>
      <div>{props.intro}</div>
      <div>#{props.tags}</div>
      <div className='d-flex align-items-center justify-content-end'>
        <button type='button' className={'btn btn-outline-secondary'} onClick={() => navigate('/event/' + props.id)}>Learn more</button>
        <button type='button' className={'btn ms-1 ' + `${going ? "btn-outline-dark" : "btn-dark"}`} onClick={() => setGoing(!going)}>
          {
            going ?
              "Cancel Going"
              :
              "Going"

          }
        </button>

      </div>
    </div>
  )
}
