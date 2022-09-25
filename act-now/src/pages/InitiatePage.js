import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {db} from '../firebase/firebase'

export default function InitiatePage(props) {

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [intro, setIntro] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'events'), {
      title: title,
      date: date,
      time: time,
      location: location,
      intro: intro,
      description: description,
      creator: props.user.uid,
      num: 1
    });
    await setDoc(doc(db, 'events', docRef.id), {id:docRef.id}, {merge: true})
    alert('event added')
  }

  return (
    <div className='white-background pt-5 poppins'>
      <form className='pt-5 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
        <div className="input-group mb-4" style={{fontSize: "36px", width: "70vw"}}>
          <input type="text" className="input p-3 ps-1" style={{width: "100%"}}  placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>

        <div className="input-group mb-3 d-flex align-items-center" style={{width: "70vw"}}>
          <h5 className='pt-2'>{"Date & Time:"} </h5>
          <input type="date" className="input p-2 mx-2" placeholder="Event Date" value={date} onChange={(e) => setDate(e.target.value)} required/>
          <input type="time" className="input p-2 mx-1" placeholder="Event Time" value={time} onChange={(e) => setTime(e.target.value)} required/>
        </div>

        
        <div className="input-group mb-4 d-flex align-items-center" style={{width: "70vw"}}>
          <h5 className='pt-2'>Location: </h5>
          <input type="text" className="input p-2 mx-2" placeholder="Event Location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
        </div>

        <div className="input-group mb-3" style={{width: "70vw"}}>
          <h5 className='me-3'>Brief Intro: </h5>
          <div style={{width: "100%"}}>
            <textarea maxLength={"150"} className="form-control" aria-label="With textarea" value={intro} onChange={(e) => setIntro(e.target.value)} required></textarea>
            <div className='d-flex justify-content-end'>Please give a one-sentence introduction.</div>
          </div>
        </div>

        <div className="input-group mb-4" style={{width: "70vw"}}>
          <h5 className='me-3'>Full Description: </h5>
          <div style={{width: "100%"}}>
            <textarea className="form-control" aria-label="With textarea" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
        </div>
        <div className='d-flex justify-content-end' style={{width: "70vw"}}>
          <button type='submit' className='btn btn-dark continue px-4 fs-5'>Initiate Event</button>
        </div>

      </form>
    </div>
  )
}
