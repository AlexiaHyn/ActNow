import React from 'react'

export default function InitiatePage() {
  return (
    <div className='white-background pt-5'>
      <form className='pt-5 d-flex flex-column align-items-center'>
        <div className="input-group mb-3 bg-dark" style={{fontSize: "25px", width: "70vw"}}>
          <input type="text" className="input" style={{width: "100%"}}  placeholder="Event Title"/>
        </div>

      </form>
    </div>
  )
}
