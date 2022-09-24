import React from 'react'

export default function EventCard() {
  return (
    <div className='card rounded event-card'>
        <div className='d-flex justify-content-between align-items-center'>
            <h3>Event Name</h3>
            <i className="bi bi-star"></i>
        </div>
        <div>Event shoorrrrrt Introoooo</div>
        <div>tags</div>
        <div className='d-flex align-items-center justify-content-end'>
            <div>Learn more</div>
            <button type='button' className='btn btn-dark ms-1'>Going</button>
            
        </div>
    </div>
  )
}
