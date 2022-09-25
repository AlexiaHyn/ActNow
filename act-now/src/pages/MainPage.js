import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import InitiateEvent from '../components/InitiateEvent';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../firebase/firebase'
import React, { useEffect, useState } from 'react'

export default function MainPage() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"));
    getDocs(q).then((snapshots) => {
      let newArr = []
      snapshots.forEach((doc) => {
        const docData = doc.data();
        newArr.push(<EventCard title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tag={docData['tags']} id={docData['id']} creator={docData['creator']}/>);
      });
      setCards(newArr);
    });
  }, []);

  return (
    <div className='pt-5 Poppins'>
      <div className='pt-3'>
        <SearchBar />
      </div>

      <div className='d-flex flex-wrap'>
        {recList.map((item, i) => (<EventCard title={item.title} intro={item.intro} tags={item.tags} />))}
      </div>
      <div className='d-flex justify-content-center my-3'>
        <button type='submit' className='btn border-0 bg-transparent'>Click to Load More...</button>
      </div>
      
      <div className='initiate-wrapper'>
        <InitiateEvent />
      </div>

    </div>
  )
}
