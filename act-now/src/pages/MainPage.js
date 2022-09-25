import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import InitiateEvent from '../components/InitiateEvent';
import { collection, query, where, getDocs, limit, doc, getDoc, orderBy} from "firebase/firestore";
import { db } from '../firebase/firebase'
import { useEffect, useState } from 'react'
import { unstable_deprecatedPropType } from '@mui/utils';

export default function MainPage(props) {

  const [cards, setCards] = useState([]);
  const [num, setNum] = useState(50);
  const [selectValue, setSelectedValue] = useState("0");

  function loadmore(e) {
    e.preventDefault();
    const newNum = num + 50;
    setNum(newNum);
    const q = query(collection(db, "events"), limit(num));
    getDocs(q).then((snapshots) => {
      let newArr = []
      snapshots.forEach((doc) => {
        const docData = doc.data();
        newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
      });
      setCards(newArr);
    });
  }

  const searchCards = (searchTag) => {
    // console.log(searchTag);
    const q = query(collection(db, "events"));
    getDocs(q).then((snapshots) => {
      let newArr = []
      snapshots.forEach((doc) => {
        const tagsArray = [];
        const docData = doc.data();
        for (let tag in docData['tags']) {
          if (docData['tags'][tag] == true) {
            tagsArray.push(tag);
          }
        }
        if (tagsArray.includes(searchTag)) {
          newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
        }
      });
      setCards(newArr);
    });
  };

  useEffect(()=>{
    const recList = [];


    if (selectValue == "0") {
      let preferenceLst = [];
      const userRef = doc(db, 'user', props.user.uid)
      getDoc(userRef).then((snapshot) => {
        
        const prefData = snapshot.data()['preferences'];
        for (const [key, value] of Object.entries(prefData)) {
          if (value && (!preferenceLst.includes(key))){
            preferenceLst.push(key);
          }
        }
      })


      const q = query(collection(db, "events"));
      getDocs(q).then((snapshots) => {
        let newArr = []
        snapshots.forEach((doc) => {
          const tagsArray = [];
          const docData = doc.data();
          for (let tag in docData['tags']) {
            if (docData['tags'][tag] == true) {
              tagsArray.push(tag);
            }
          }
          const filteredArray = tagsArray.filter(value => preferenceLst.includes(value));
          if (filteredArray.length > 0) {
            newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
          }
        });
        setCards(newArr);
      });


      for (let tag in props.user) {
        recList.push(tag);
        console.log(recList);
      }

    }
    if (selectValue == "1"){
      const q = query(collection(db, "events"));
      getDocs(q).then((snapshots) => {
        let newArr = []
        snapshots.forEach((doc) => {
          const docData = doc.data();
          newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
        });
        setCards(newArr);
    });
  }
    if (selectValue == "2"){
      const q = query(collection(db, "events"), orderBy('createTime', 'desc'), limit(50));
      getDocs(q).then((snapshots) => {
        let newArr = []
        snapshots.forEach((doc) => {
          const docData = doc.data();
          newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
        });
        setCards(newArr);
    });
    }
  },[])

  const sortCards = (e) => {
    const selected = e.target.value;
    const recList = [];


    if (selected == "0") {
      let preferenceLst = [];
      const userRef = doc(db, 'user', props.user.uid)
      getDoc(userRef).then((snapshot) => {
        
        const prefData = snapshot.data()['preferences'];
        for (const [key, value] of Object.entries(prefData)) {
          if (value && (!preferenceLst.includes(key))){
            preferenceLst.push(key);
          }
        }
      })


      const q = query(collection(db, "events"));
      getDocs(q).then((snapshots) => {
        let newArr = []
        snapshots.forEach((doc) => {
          const tagsArray = [];
          const docData = doc.data();
          for (let tag in docData['tags']) {
            if (docData['tags'][tag] == true) {
              tagsArray.push(tag);
            }
          }
          const filteredArray = tagsArray.filter(value => preferenceLst.includes(value));
          if (filteredArray.length > 0) {
            newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
          }
        });
        setCards(newArr);
      });


      for (let tag in props.user) {
        recList.push(tag);
        console.log(recList);
      }

    }
    if (selected == "1"){
      const q = query(collection(db, "events"));
      getDocs(q).then((snapshots) => {
        let newArr = []
        snapshots.forEach((doc) => {
          const docData = doc.data();
          newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
        });
        setCards(newArr);
    });
  }
    if (selected == "2"){
      const q = query(collection(db, "events"), orderBy('createTime', 'desc'), limit(50));
      getDocs(q).then((snapshots) => {
        let newArr = []
        snapshots.forEach((doc) => {
          const docData = doc.data();
          newArr.push(<EventCard key={docData['id']} title={docData['title']} date={docData['date']} time={docData['time']} location={docData['location']} intro={docData['intro']} tags={docData['tags']} id={docData['id']} creator={docData['creator']} user={props.user} />);
        });
        setCards(newArr);
    });
    }
  setSelectedValue(e.target.value);
}

  return (
    <div className='pt-5 poppins'>
      <div className='initiate-wrapper'>
        <InitiateEvent />
      </div>

      <div className='pt-3'>
        <SearchBar searchCards={searchCards} />
      </div>

      <select className="form-select m-2 ms-5" style={{ width: "20vw", minWidth: "180px", position: "relative" }} value={selectValue} onChange={sortCards}>

        <option value="0">Recommended</option>
        <option value="1">Hot</option>
        <option value="2">Latest</option>
      </select>

      <div className='d-flex flex-wrap px-5 py-2'>
        {cards.map((card, i) => { return <div key={i}>{card}</div> })}
      </div>
      {/* <div className='d-flex justify-content-center my-3'>
        <button type='submit' className='cursor btn border-0 bg-transparent' onClick={loadmore}>Click to Load More...</button>
      </div> */}

    </div>
  )
}
