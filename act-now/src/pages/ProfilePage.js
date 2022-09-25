import React, { useState } from 'react';
import {db, storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function ProfilePage(props) {
    const [name, setName] = useState("");
    const [readOnly, setReadOnly] = useState(true);
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
      setReadOnly(true);
    }

  return (
    <div className='white-background d-flex flex-column align-items-center poppins pt-5'>
        <form className='d-flex align-items-center mt-4' onSubmit={handleSubmit}>
            <div className='d-flex flex-column align-items-center my-2'>
                <div className='profile-pic-md'>
                    <img src={imgURL} style={{objectFit: "contain", maxHeight: "10vw"}}></img>
                </div>
                <input id="avatarFor" style={{display:'none'}} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={(e)=>handleImageChange(e)}/>
                <label className='btn btn-secondary my-2' style={{borderRadius: "17px", fontSize: "12px"}} htmlFor="avatarFor" hidden={readOnly}> Change Profile Picture </label>
            </div>
            <div className='d-flex'>
                <input className='input border-0 text-center fs-4' style={{maxWidth: "150px"}} placeholder='UserName' value={name} onChange={(e) => setName(e.target.value)} required readOnly={readOnly}></input>
                <i className="bi bi-pen cursor pt-2" onClick={()=>setReadOnly(false)}></i>
            </div>
            
            <button type='submit' className='btn btn-dark p-2 px-5 mx-3' style={{borderRadius: "20px"}} hidden={readOnly}>{"Save Changes"}</button>
        </form>

        <ul class="nav nav-tabs" style={{width: "100vw"}}>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
            </li>
        </ul>
    </div>
  )
}