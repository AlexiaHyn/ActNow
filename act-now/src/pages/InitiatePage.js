import React from 'react'

export default function InitiatePage() {
  return (
    <div className='white-background pt-5 poppins'>
      <form className='pt-5 d-flex flex-column align-items-center'>
        <div className="input-group mb-4" style={{fontSize: "36px", width: "70vw"}}>
          <input type="text" className="input p-3 ps-1" style={{width: "100%"}}  placeholder="Event Title" required/>
        </div>

        <div className="input-group mb-3 d-flex align-items-center" style={{width: "70vw"}}>
          <h5 className='pt-2'>{"Date & Time:"} </h5>
          <input type="date" className="input p-2 mx-2" placeholder="Event Date" required/>
          <input type="time" className="input p-2 mx-1" placeholder="Event Time" required/>
        </div>

        
        <div className="input-group mb-4 d-flex align-items-center" style={{width: "70vw"}}>
          <h5 className='pt-2'>Location: </h5>
          <input type="text" className="input p-2 mx-2" placeholder="Event Location" required/>
        </div>

        <div className="input-group mb-3" style={{width: "70vw"}}>
          <h5 className='me-3'>Brief Intro: </h5>
          <div style={{width: "100%"}}>
            <textarea maxLength={"150"} className="form-control" aria-label="With textarea" required></textarea>
            <div className='d-flex justify-content-end'>Please give a one-sentence introduction.</div>
          </div>
        </div>

        <div className="input-group mb-4" style={{width: "70vw"}}>
          <h5 className='me-3'>Full Description: </h5>
          <div style={{width: "100%"}}>
            <textarea className="form-control" aria-label="With textarea" required></textarea>
          </div>
        </div>
        <div className='d-flex justify-content-end' style={{width: "70vw"}}>
          <button type='submit' className='btn btn-dark continue px-4 fs-5'>Initiate Event</button>
        </div>

      </form>
    </div>
  )
}
