import React, { useState, useEffect} from 'react';
import {db, storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, getDoc, setDoc, getDocs, query, collection} from "firebase/firestore";
import {auth} from '../firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth';
import EventCard from '../components/EventCard';
import Tooltip from '@mui/material/Tooltip';

export default function ProfilePage(props) {
    const [name, setName] = useState("");
    const [readOnly, setReadOnly] = useState(true);
    const [file, setFile] = useState(null);
    const [imgURL, setURL] = useState("");
    const [progress, setProgress] = useState(-1);
    const [notEditPreference, setEditPreference] = useState(true);

    const [preferences, setPreferences] = useState([false, false, false, false,false, false,false, false,
      false, false,false, false]);

    const [create, setCreate] = useState([]);
    const [joined, setJoined] = useState([]);
    const [starred, setStarred] = useState([]);
    
    useEffect(() => {
      if (props.user){
        const userRef = doc(db, "user", props.user.uid);
      getDoc(userRef).then((docSnap)=>{
        if(docSnap.exists()){
          setName(docSnap.data()['name']);
          setURL(docSnap.data()['profileImage']);
          const pref = docSnap.data()['preferences'];
          let newArray = [false, false, false, false,false, false,false, false, false, false,false, false];
          newArray[0] = pref['Gender Equality'];
          newArray[1] = pref['Environment'];
          newArray[2] = pref['LGBTQ+'];
          newArray[3] = pref['Racial Justice'];
          newArray[4] = pref['Health'];
          newArray[5] = pref['Social Policy'];
          newArray[6] = pref['Civil Rights'];
          newArray[7] = pref['Education'];
          newArray[8] = pref['Poverty'];
          newArray[9] = pref['Animals'];
          newArray[10] = pref['Anti-War'];
          newArray[11] = pref['Energy'];
          setPreferences(newArray);
        }
      });
      }
      const q1 = query(collection(db, "user", props.user.uid, "create"));
      getDocs(q1).then((snapshots) => {
        let newArr = [];
        snapshots.forEach((docsnap) => {
          const eventID = docsnap.data()['eventID'];
          const eventDoc = doc(db, "events", eventID);
          getDoc(eventDoc).then((docSnap) => {
            if(docSnap.exists()){
              const docData = docSnap.data();
              console.log(docData['title'])
              newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user}/>);
            }
          });
        })
        setCreate([...create], newArr)
      })
      const q2 = query(collection(db, "user", props.user.uid, "joined"));
      getDocs(q2).then((snapshots) => {
        let newArr = [];
        snapshots.forEach((docsnap) => {
          const eventID = docsnap.data()['eventID'];
          const eventDoc = doc(db, "events", eventID);
          getDoc(eventDoc).then((docSnap) => {
            if(docSnap.exists()){
              
              const docData = docSnap.data();
              console.log(docData['title'])
              newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user}/>);
            }
          });
        })
        setJoined([...joined], newArr)
      })
      const q3 = query(collection(db, "user", props.user.uid, "starred"));
      getDocs(q3).then((snapshots) => {
        let newArr = [];
        snapshots.forEach((docsnap) => {
          const eventID = docsnap.data()['eventID'];
          const eventDoc = doc(db, "events", eventID);
          getDoc(eventDoc).then((docSnap) => {
            if(docSnap.exists()){
              const docData = docSnap.data();
              newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user}/>);
            }
          });
        })
        setStarred([...starred], newArr)
      })
    }, []);
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
        const storageRef = ref(storage, '/profileImage/' + props.user.uid + '_' + file.name);
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

    function handleChange(index){
      let newArr = [...preferences];
      newArr[index] = !newArr[index];
      setPreferences(newArr);
    }

    function handleReset(e){
      e.preventDefault();
      sendPasswordResetEmail(auth, props.user.email).then(() => {
        alert('send reset email')
      })
    }

    async function handlePrefSet(e){
      e.preventDefault();
      const userRef = doc(db, "user", props.user.uid);
      await setDoc(userRef, {
        preferences: {'Gender Equality': preferences[0], 
                      'Environment': preferences[1],
                      'LGBTQ+': preferences[2],
                      'Racial Justice': preferences[3],
                      'Health': preferences[4],
                      'Social Policy': preferences[5],
                      'Civil Rights': preferences[6],
                      'Education': preferences[7],
                      'Poverty': preferences[8],
                      'Animals': preferences[9],
                      'Anti-War': preferences[10],
                      'Energy': preferences[11],}
    }, {merge : true});
    setEditPreference(true);
    }
  return (
    <div className='white-background d-flex flex-column align-items-center poppins pt-5'>
        <form className='d-flex align-items-center mt-4' onSubmit={handleSubmit}>
            <div className='d-flex flex-column align-items-center my-2'>
                <div className='profile-pic-md'>
                    <img src={imgURL} style={{objectFit: "contain", maxHeight: "100%"}}></img>
                </div>
                <input id="avatarFor" style={{display:'none'}} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={(e)=>handleImageChange(e)}/>
                <label className='btn btn-secondary my-2' style={{borderRadius: "17px", fontSize: "12px"}} htmlFor="avatarFor" hidden={readOnly}> Change Profile Picture </label>
            </div>
            <div className='d-flex'>
                <input className='input border-0 text-center fs-4' style={{maxWidth: "150px"}} placeholder='UserName' value={name} onChange={(e) => setName(e.target.value)} required readOnly={readOnly}></input>
                <Tooltip title="Edit Profile Pic or User Name">
                  <i className="bi bi-pen cursor pt-2" onClick={()=>setReadOnly(false)}></i>
                </Tooltip>
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
            <div style={{width: "100%"}} className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-joined-tab" tabIndex="0">
              <div className='d-flex flex-wrap px-5 py-2'>
                {create.map((card, i) => {return <div key={i}>{card}</div>})}
                {joined.map((card, i) => {return <div key={i}>{card}</div>})}
              </div>
            </div>
            <div style={{width: "100%"}} className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-collected-tab" tabIndex="0">
              <div className='d-flex flex-wrap px-5 py-2'>
                {starred.map((card, i) => {return <div key={i}>{card}</div>})}
              </div>
            </div>
            <div style={{width: "100%"}} className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-past-tab" tabIndex="0">...</div>
            <div style={{width: "100%"}} className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-setting-tab" tabIndex="0">
              <div className='d-flex justify-content-center'>
                <div className='p-4'>
                  <div className='d-flex mb-3 align-items-center'>
                    <div className='me-2'>My Password:</div>
                    <button type='button' className='btn btn-secondary rounded' onClick={handleReset}>Reset Password</button>
                  </div>

                  <div className='d-flex align-items-center'>
                    <div>My Preferences:</div>
                    <Tooltip title="Edit Preferences">
                      <i className="bi bi-pen cursor ms-3" onClick={()=>setEditPreference(!notEditPreference)}></i>
                    </Tooltip>
                  </div>
                  <form onSubmit={handlePrefSet}>
                    <div className='d-flex flex-wrap'>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[0] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(0)}}  disabled={notEditPreference}>#Gender Equality</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[1] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(1)}}  disabled={notEditPreference}>#Environment</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[2] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(2)}}  disabled={notEditPreference}>#LGBTQ+</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[3] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(3)}}  disabled={notEditPreference}>#Racial Justice</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[4] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(4)}}  disabled={notEditPreference}>#Health</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[5] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(5)}}  disabled={notEditPreference}>#Social Policy</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[6] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(6)}}  disabled={notEditPreference}>#Civil Rights</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[7] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(7)}}  disabled={notEditPreference}>#Education</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[8] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(8)}}  disabled={notEditPreference}>#Poverty</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[9] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(9)}}  disabled={notEditPreference}>#Animals</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[10] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(10)}} disabled={notEditPreference}>#Anti-War</button>
                      <button type="button" className={"my-2 mx-1 btn " + `${preferences[11] ? "btn-dark" : "btn-outline-dark"}`} onClick={() => {handleChange(11)}} disabled={notEditPreference}>#Energy</button>
                    </div>
                    <div className='d-flex justify-content-end my-2'>
                      <button type='submit' className='btn btn-dark p-2 px-3' style={{borderRadius: "20px"}} hidden={notEditPreference}>Save Changes</button>
                    </div>
                    
                  </form>
                  
                </div>
              </div>
              
            </div>
        </div>
    </div>
  )
}