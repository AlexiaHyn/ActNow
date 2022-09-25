import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';

export default function MainPage() {
  return (
    <div className='pt-5 Poppins'>
      <div className='pt-3'>
        <SearchBar />
      </div>

      <div className='d-flex flex-wrap'>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>

    </div>
  )
}
