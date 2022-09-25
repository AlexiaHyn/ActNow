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
        handleTags(data['tags'])
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
          <div className="d-flex justify-content-between align-items-center">
            <h2>Event Name: {name}</h2>
            <div className="d-flex align-items-center">
              <button
                type="button"
                className={
                  "btn ms-1 " + `${going ? "btn-outline-dark" : "btn-dark"}`
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

          <div>Brief Overview: {intro}</div>
          <div>Event Details:</div>
          <div>{des}</div>
          <div>Tags: {tags}</div>
          <div className="d-flex align-items-center justify-content-end">
            <button
              type="button"
              className={"btn btn-outline-secondary mx-2"}
              onClick={() => navigate("/")}
            >
              {"<< Back to all events"}
            </button>
            <button type="button" className={"btn btn-secondary"}>
              Chat with host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
