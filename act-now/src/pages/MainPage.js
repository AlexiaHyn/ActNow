import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import InitiateEvent from '../components/InitiateEvent';

export default function MainPage() {

  const recList = [{ "title": "Women's chat", "intro": "Come and join us for a great sister time!", "tags": ["Gender Equality"] },
  { "title": "Tutor for grade 6-8 kids from low income family", "intro": "We host weekly tutor sessions for kids from low income families. We need grade 6-8 math, science, and English tutors.", "tags": ["Education"] },
  { "title": "Mental Illness Awareness Association", "intro": "Join our organization meetings to find creative ways to help spread mental illness awareness across campus.", "tags": ["Health"] },
  { "title": "Mural Painting for Pride Month", "intro": "Come paint the walls on campus to send positive messages to our community, in celebration of the pride month.", "tags":["LGPTQ+"] },
  { "title": "Climate March", "intro": "Join the Climate March on Sunday with your Rice classmates", "tags": ["Environmental"] }]

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
