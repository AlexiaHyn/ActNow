import React, { useState, useEffect} from 'react';
import {db, storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage(props) {
    const [name, setName] = useState("");
    const [readOnly, setReadOnly] = useState(true);
    const [file, setFile] = useState(null);
    const [imgURL, setURL] = useState("");
    const [progress, setProgress] = useState(-1);
    
    useEffect(() => {
      if (props.user){
        const userRef = doc(db, "user", props.user.uid);
      getDoc(userRef).then((docSnap)=>{
        if(docSnap.exists()){
          setName(docSnap.data()['name']);
          setURL(docSnap.data()['profileImage']);
        }
      });
      }
    }, [props.user]);
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
      const userRef = doc(db, "user", props.user.uid);
      e.preventDefault();
      
      await setDoc(userRef, {name: name}, {merge: true});

      if(file){
        const storageRef = ref(storage, '/profileImage/' + props.user.uid + '_' +file.name);
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

        <div>
            <ul className="nav nav-pills mt-4 mb-2" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-joined-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Up Coming</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-collected-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Collected</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-past-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Past</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-setting-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Settings</button>
                </li>
            </ul>
        </div>
        
        
        <div className="tab-content" id="pills-tabContent">
            <div className='line-segment'></div>
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-joined-tab" tabIndex="0">...</div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-collected-tab" tabIndex="0">...</div>
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-past-tab" tabIndex="0">...</div>
            <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-setting-tab" tabIndex="0">...</div>
        </div>
    </div>
  )
}