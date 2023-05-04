import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import NoteList from "../Notes_Prototype/NoteList";
import AddNote from "../Notes_Prototype/AddNote";

const defaultNotes = [
  {
    id: 'uuid.v4()',
    title: "Reflection 1",
    content: "Lorem ipsum fake fake fake generated",
    mood: "😌",
    date: 1626535547228,
    image: "src/assets/note_img.png",
  },
  {
    id: 'uuid.v4()',
    title: "Reflection 2",
    content: "Lorem ipsum fake fake fake generated",
    mood: "😆",
    date: 1626535547228,
    image: "../../assets/note_img.png",
  },
  {
    id: 'uuid.v4()',
    title: "Reflection 3",
    content: "Lorem ipsum fake fake fake generated",
    mood: "😆",
    date: 1626535547228,
    image: "../../assets/note_img.png",
  },
  {
    id: 'uuid.v4()',
    title: "Reflection 4",
    content: "Lorem ipsum fake fake fake generated",
    mood: "😑",
    date: 1626535547228,
    image: "../../assets/note_img.png",
  },
];


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
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate, fetchUserName]);

  //Notes variables

  const [isNoteList, setIsNoteList] = useState(true);
  const [notes, setNotes] = useState(defaultNotes);

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
          <a
            href="#"
            className="btn btn--primary"
            onClick={() => onNavigate(true)}
          >
            <img src="./images/grid_icon.png" alt="" />
            <span>View All</span>
          </a>
          <a href="#" className="btn" onClick={() => onNavigate(false)}>
            <img src="./images/pen_icon.svg" alt="" />
            <span>New Entry</span>
          </a>
        </nav>
      </header>
      {isNoteList ? <NoteList notes={notes} /> : <AddNote addNote={addNote} />}
    </div>
  );
}

export default Dashboard;
