import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function EventCard(props) {
  const [collected, setCollected] = useState(false);
  const [going, setGoing] = useState(false);
  const [tags, setTags] = useState([]);
  let navigate = useNavigate();

  useEffect(()=>{
    handleTags(props.tags);
    console.log(tags);
  }, [])

  function handleTags(tagData){
    for (const [key, value] of Object.entries(tagData)) {
      if (value && (!tags.includes(key))){
        const arr = tags;
        arr.push(key);
        setTags([...tags], arr);
      }
    }
  }

  return (
    <div className='card rounded event-card'>
      <div className='d-flex justify-content-between mb-3'>
        <h3>{props.title}</h3>
        <i className={"cursor bi bi-star" + `${collected ? "-fill" : ""}`} onClick={() => setCollected(!collected)}></i>
      </div>
      <div className='d-flex'>
          <div className='fw-bold'>Time:</div>
          <div className='mx-2'>{props.date}</div>
          <div>{props.time}</div>
        </div>
        <div className='d-flex mb-3'>
          <div className='fw-bold'>Location:</div>
          <div className='mx-2'>{props.location}</div>
        </div>
      <div>{props.intro}</div>
      <div className='d-flex flex-wrap mb-3'>
        {tags.map((tag, idx)=> {return <div key={idx} className="m-1 text-info"> {"#" + tag} </div>})}
      </div>
      <div className='d-flex align-items-center justify-content-end'>
        <button type='button' className={'btn btn-outline-secondary'} onClick={() => navigate(`${'/event/' + props.id}`)}>Learn more</button>
        <button type='button' className={'btn ms-1 ' + `${going ? "btn-outline-dark" : "btn-dark"}`} onClick={() => setGoing(!going)}>
          {
            going ?
              "Cancel Going"
              :
              "Join"
          }
        </button>

      </div>
    </div>
  )
}
