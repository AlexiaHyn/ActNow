import React, { useEffect, useState } from "react";
import "../stylings/styleCC.css";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { createBrowserHistory } from "history";

export default function EventPage(props) {
  const [collected, setCollected] = useState(false);
  const [going, setGoing] = useState(false);
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loc, setLoc] = useState("");
  const [tags, setTags] = useState([]);
  const [creatorName, setCreatorName] = useState("");
  const [creatorPic, setCreatorPic] = useState("");

  let navigate = useNavigate();
  
  useEffect(() => {
    const history = createBrowserHistory();
    const pathname = history.location.pathname.split("/");
    const eventId = pathname[pathname.length - 1];

    const eventRef = doc(db, "events", eventId);
    getDoc(eventRef).then((snapshot) => {
        const data = snapshot.data();
        setName(data['title']);
        setIntro(data['intro']);
        setDes(data['description']);
        setDate(data['date']);
        setTime(data['time']);
        setLoc(data['loc']);
        const creatorRef = doc(db, "user", data['creator']);
        getDoc(creatorRef).then((creatorSnapshot)=>{
          const creatorData = creatorSnapshot.data();
          setCreatorName(creatorData['name']);
          setCreatorPic(creatorData['profileImage']);
        })
        handleTags(data['tags']);
    });
    const joinedRef = doc(db, 'user', props.user.uid, 'joined', eventId);
    getDoc(joinedRef).then((docSnap) => {
      if(docSnap.exists()){setGoing(true)};
    });
    const starredRef = doc(db, 'user', props.user.uid, 'starred', eventId);
    getDoc(starredRef).then((docSnap) => {
      if(docSnap.exists()){setCollected(true)};
    })
  }, []);

  function handleTags(tagData){
    for (const [key, value] of Object.entries(tagData)) {
      if (value && (!tags.includes(key))){
        const arr = tags;
        arr.push(key);
        setTags([...tags], arr);
      }
    }
  }

  async function handleJoin(e){
    const history = createBrowserHistory();
    const pathname = history.location.pathname.split("/");
    const eventId = pathname[pathname.length - 1];
    const joinedRef = doc(db, 'user', props.user.uid, 'joined', eventId);
    if(!going){
      await setDoc(joinedRef, {eventID: eventId});
    } else {
      await deleteDoc(joinedRef);
    }
    setGoing(!going)
  }

  async function handleStar(e){
    const history = createBrowserHistory();
    const pathname = history.location.pathname.split("/");
    const eventId = pathname[pathname.length - 1];
    const starredRef = doc(db, 'user', props.user.uid, 'starred', eventId);
    if(!collected){
      await setDoc(starredRef, {eventID: eventId});
    } else {
      await deleteDoc(starredRef);
    }
    setCollected(!collected)
  }

  return (
    <div className="poppins pt-5">
      <div className="white-background d-flex justify-content-center pt-5">
        <div className="event">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex mb-2 px-2" style={{width: "fit-content", borderRadius: "15px", backgroundColor: "#ddd"}}>
                  <div className="fw-bold me-2">Initiator:</div>
                  {creatorName}
                </div>
                <div className='profile-pic-md me-2'>
                    <img src={creatorPic} style={{objectFit: "contain", maxHeight: "100%"}}></img>
                </div>
              </div>
                
              <h1 className="fw-bold mx-2">:</h1>
              <h1 className="fw-bold">{name}</h1>
            </div>
            
            <div className="d-flex align-items-center">
              <button
                type="button"
                className={
                  "btn mx-1 " + `${going ? "btn-outline-dark" : "btn-dark"}`
                }
                onClick={() => handleJoin()}
              >
                {going ? "Cancel Going" : "Join"}
              </button>
              <i
                className={
                  "cursor fs-5 bi bi-star" + `${collected ? "-fill" : ""}`
                }
                onClick={() => handleStar()}
              ></i>
            </div>
          </div>

          <div className="mb-3">
            <div className="fw-bold me-2">Brief Overview:</div>
            {intro}
          </div>
          <div className="fw-bold">Event Details:</div>
          <div className="mb-3">{des}</div>
          <div className="d-flex mb-5 align-items-center">
            <div className="fw-bold me-2">Tags:</div>
            <div className='d-flex flex-wrap'>
              {tags.map((tag, idx)=> {return <div key={idx} className="m-1 text-info"> {"#" + tag} </div>})}
            </div>
          </div>
          
          <div className="d-flex align-items-center justify-content-end">
            <button
              type="button"
              className={"btn btn-outline-secondary mx-2"}
              onClick={() => navigate("/")}
            >
              {"<< Back to all events"}
            </button>
            <button type="button" className={"btn btn-secondary"}>
              <div className="d-flex">
                <i className="bi bi-chat me-1"></i>
                <div>Chat with Initiator</div>
              </div>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
