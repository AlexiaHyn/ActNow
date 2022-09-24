import React from 'react'

export default function SetProfilePage() {
    function handleImageChange(e){
        e.preventDefault();
        var reader = new FileReader();
        var file = e.target.files[0];

    }
  return (
    <div className='white-background d-flex flex-column align-items-center justify-content-center poppins'>
        <h2 className='prefTitle mt-5 mb-4'>Create your profile</h2>
        <form className='d-flex flex-column align-items-center'>
            <div className='profile-pic'></div>
            <input id="avatarFor" style={{display:'none'}} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={(e)=>handleImageChange(e)}/>
            <label className='btn btn-secondary my-3 px-4' style={{borderRadius: "17px"}} htmlFor="avatarFor"> Change Profile Picture </label>
            <input className='input my-2 text-center fs-4 mb-5' placeholder='UserName'></input>
            <button type='submit' className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
        </form>
    </div>
  )
}
