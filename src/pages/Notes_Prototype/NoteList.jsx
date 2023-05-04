import React from "react";

import "./notes.css";

function Note({ mood, title, date, content, image }) {
  return (
    <article
      className="note"
      style={{ backgroundImage: require("../../assets/note_img.png") }}
    >
      <p className="note__mood">{mood}</p>
      <div className="note__content">
        <h2 className="note__title">{title}</h2>
        <time className="note__date">
          {new Date(date).toLocaleDateString()}
        </time>
        <p className="note__caption">{content}</p>
      </div>
    </article>
  );
}

function NoteList({ notes }) {
  return (
    <React.Fragment>
      <main className="note-list">
        {notes.map((el) => (
          <Note key={el.id} {...el} />
        ))}
      </main>
    </React.Fragment>
  );
}

export default NoteList;
