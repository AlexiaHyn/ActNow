import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

export default function EventCard(props) {
  const [collected, setCollected] = useState(false);
  const [going, setGoing] = useState(false);
  const [tags, setTags] = useState([]);
  let navigate = useNavigate();

  useEffect(()=>{
    handleTags(props.tags);
  }, [])

  useEffect(() => {
    const joinedRef = doc(db, 'user', props.user.uid, 'joined', props.id);
    getDoc(joinedRef).then((docSnap) => {
      if(docSnap.exists()){setGoing(true)};
    });
    const starredRef = doc(db, 'user', props.user.uid, 'starred', props.id);
    getDoc(starredRef).then((docSnap) => {
      if(docSnap.exists()){setCollected(true)};
    })
  }, [props.user]);

  function handleTags(tagData){
    for (const [key, value] of Object.entries(tagData)) {
      if (value && (!tags.includes(key))){
        const arr = tags;
        arr.push(key);
        setTags([...tags], arr);
      }
    }
  }

  async function handleJoin(e){
    const joinedRef = doc(db, 'user', props.user.uid, 'joined', props.id);
    if(!going){
      await setDoc(joinedRef, {eventID: props.id});
    } else {
      await deleteDoc(joinedRef);
    }
    setGoing(!going)
  }

  async function handleStar(e){
    const starredRef = doc(db, 'user', props.user.uid, 'starred', props.id);
    if(!collected){
      await setDoc(starredRef, {eventID: props.id});
    } else {
      await deleteDoc(starredRef);
    }
    setCollected(!collected)
  }

  return (
    <div className='card rounded event-card'>
      <div className='d-flex justify-content-between mb-3'>
        <h3>{props.title}</h3>
        <i className={"cursor bi bi-star" + `${collected ? "-fill" : ""}`} onClick={() => handleStar(!collected)}></i>
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
        <button type='button' className={'btn ms-1 ' + `${going ? "btn-outline-dark" : "btn-dark"}`} onClick={() => handleJoin(!going)}>
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
