import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';

export default function MainPage() {
  return (
    <div>
      <SearchBar/>
      <div className='d-flex flex-wrap'>
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
      </div>
    
    </div>
  )
}
