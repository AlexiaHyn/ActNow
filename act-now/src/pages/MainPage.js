import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import InitiateEvent from '../components/InitiateEvent';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../firebase/firebase'
import { useEffect, useState } from 'react'

export default function MainPage() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"));
    getDocs(q).then((snapshots) => {
      let newArr = []
      snapshots.forEach((doc) => {
        const docData = doc.data();
        newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']}/>);
      });
      setCards(newArr);
    });
  }, []);

  return (
    <div className='pt-5 poppins'>
      <div className='initiate-wrapper'>
        <InitiateEvent />
      </div>

      <div className='pt-3'>
        <SearchBar />
      </div>

      <select className="form-select m-2" style={{width: "20vw", minWidth: "180px", position: "relative"}}>
        <option selected>Recommended</option>
        <option value="1">Hot</option>
        <option value="2">Latest</option>
      </select>

      <div className='d-flex flex-wrap px-5 py-2'>
        {cards.map((card, i) => {return <div key={i}>{card}</div>})}
      </div>
      <div className='d-flex justify-content-center my-3'>
        <button type='submit' className='btn border-0 bg-transparent'>Click to Load More...</button>
      </div>

    </div>
  )
}
