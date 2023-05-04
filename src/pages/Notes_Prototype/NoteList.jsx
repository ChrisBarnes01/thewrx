import React from "react";


import "./notes.css";

function Note({ mood, title, date, content, image }) {
  return (
    <a>
      <article className="note" style={{ backgroundImage: require("../../assets/note_img.png") }}>
        <p className="note__mood">{mood}</p>
        <div className="note__content">
          <h2 className="note__title">{title}</h2>
          <time className="note__date">
            {new Date(date).toLocaleDateString()}
          </time>
          <p className="note__caption">{content}</p>
        </div>
      </article>
    </a>
  );
}

function NoteList({ notes }) {
  const [modal, setModal] = React.useState(false);

  return (
    <React.Fragment>
      {modal ? (
        <main className="modal">
          <article className="full-note">
            <header className="full-note__header">
              <h2 className="full-note__title">
                <strong>😌</strong> mood
              </h2>
              <time className="full-note__date" dateTime="2021-08-21">
                3 May 2023
              </time>
              <button className="modal__btn">
                <img src="./images/close_icon.svg" alt="close modal" />
              </button>
            </header>
            <img
              className="full-note__img"
              src="./images/full_note_img.png"
              alt="night sky"
            />
            <div className="full-note__content">
              Hello - this is how we need to operate
            </div>
          </article>
        </main>
      ) : (
        <main className="note-list">
          {notes.map((el) => (
            <Note key={el.id} {...el} />
          ))}
        </main>
      )}
    </React.Fragment>
  );
}

export default NoteList;
