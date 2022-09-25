import React, { useState } from 'react';
import {db, storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function SetProfilePage(props) {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imgURL, setURL] = useState("");
    const [progress, setProgress] = useState(-1)
    function handleImageChange(e){
        e.preventDefault();
        const choose = e.target.files[0];
        if(choose){
          if (choose.size > 10e5){
            alert('Please upload an image smaller than 1mb');
            return;
          }
          setFile(choose);
          setURL(URL.createObjectURL(choose));
        }
    }

    async function handleSubmit(e){
      e.preventDefault();
      const userRef = doc(db, "user", props.user.uid);
      await setDoc(userRef, {name: name}, {merge: true});

      if(file){
        const storageRef = ref(storage, '/profileImage/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(percent);
          },
          (err) => {
            alert(err.message);
            setProgress(-1);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDoc(userRef, {profileImage: url}, {merge: true}).then(() => {
                setProgress(-1);
              });
            })
          }
        )
      } else {
        //add random picture
      }

      navigate("/preference")

    }

  return (
    <div className='white-background d-flex flex-column align-items-center justify-content-center poppins'>
        <h2 className='prefTitle mt-5 mb-4'>Create your profile</h2>
        <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
            <div className='profile-pic'><img style={{objectFit: "contain", maxHeight: "20vw"}} src={imgURL}/></div>
            <input id="avatarFor" style={{display:'none'}} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={(e)=>handleImageChange(e)}/>
            <label className='btn btn-secondary my-3 px-4' style={{borderRadius: "17px"}} htmlFor="avatarFor"> Change Profile Picture </label>
            <input className='input my-2 text-center fs-4 mb-5' placeholder='UserName' value={name} onChange={(e) => setName(e.target.value)} required></input>
            <button type='submit' className='btn btn-dark continue p-2 px-5'>{"Continue  >>"}</button>
        </form>
    </div>
  )
}
