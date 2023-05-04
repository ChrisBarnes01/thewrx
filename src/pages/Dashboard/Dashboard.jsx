import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import NoteList from "../Notes_Prototype/NoteList";
import AddNote from "../Notes_Prototype/AddNote";


function Dashboard() {
  //Fetch user details
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const fetchNotes = async () => {
    try {
      const q2 = query(collection(db, "notes"));
      const doc2 = await getDocs(q2);
      const onlineNotes = doc2.docs.map(doc => doc.data());
      setNotes(onlineNotes)
    } catch (err) {
      console.log(err);
      alert("An error occured while fetching notes");
    }
  }
  
  useEffect(() => {
    fetchNotes();
  }, [])

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName])


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    //fetchNotes();
  }, [user, loading, navigate]);

  //Notes variables

  const [isNoteList, setIsNoteList] = useState(true);
  const [notes, setNotes] = useState([]);

  function onNavigate(val) {
    setIsNoteList(val);
  }

  function addNote(newNote) {
    setNotes([...notes, newNote]);
  }

  const className = "container" + (isNoteList ? "" : " add-note");

  return (
    <div className={className}>
      <header className="header">
        <div>
          <h1 className="logo__title">The Wrx</h1>
          <p>Hi, {name}</p>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="filter">
          <input type="text" className="input" placeholder="TODO: Add filter" />
          <select className="input mood-select">
            <option>😌</option>
            <option>😆</option>
            <option>😑</option>
            <option>🤔</option>
          </select>
        </div>
        <nav className="main-nav">
          <div
            className="btn btn--primary"
            onClick={() => onNavigate(true)}
          >
            <img src="./images/grid_icon.png" alt="" />
            <span>View All</span>
          </div>
          <div className="btn" onClick={() => onNavigate(false)}>
            <img src="./images/pen_icon.svg" alt="" />
            <span>New Entry</span>
          </div>
        </nav>
      </header>
      {isNoteList ? <NoteList notes={notes} /> : <AddNote addNote={addNote} />}
    </div>
  );
}

export default Dashboard;
