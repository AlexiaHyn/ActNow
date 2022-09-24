import React from 'react'

export default function SetProfilePage() {
  return (
    <div className='white-background d-flex flex-column align-items-center justify-content-center poppins'>
        <h2 className='prefTitle mt-5 mb-4'>Create your profile</h2>
        <form className='d-flex flex-column align-items-center'>
            <div className='profile-pic'></div>
            <button type='button' className='btn btn-secondary my-3 px-4' style={{borderRadius: "17px"}}> Change Profile Picture </button>
            <input className='input my-2 text-center fs-4 mb-5' placeholder='UserName'></input>
            <button type='submit' className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
        </form>
    </div>
  )
}
