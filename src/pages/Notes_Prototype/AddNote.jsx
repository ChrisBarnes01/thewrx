import "./notes.css";
import {submitNewNote} from '../../firebase'

const MOODS = [
  "😌",
  "😊",
  "😄",
  "🤣",
  "😰",
  "🥰",
  "🙃",
  "😔",
  "😇",
  "🤔",
  "😩",
  "😭",
  "😤",
  "😵",
  "🤒",
  "🤤",
];

function AddNote({ addNote }) {
  function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    console.log("New note to submit")
    console.log(data);
    submitNewNote(data);
  }

  return (
    <main>
      <div className="note-img note-img--filled"></div>
      <form className="add-form" onSubmit={onSubmit}>
        <input name="title" type="text" className="input" placeholder="title" />
        <div className="add-form__row">
          <select name="mood" className="input mood-select">
            {MOODS.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
          <input name="date" type="date" className="input" />
        </div>
        <textarea
          name="content"
          className="input add-form__textarea"
          placeholder="How did you live The Wrx today?"
        ></textarea>
        <button className="btn add-form__btn">
          <img src="" alt="" />
          <span>Submit</span>
        </button>
      </form>
    </main>
  );
}

export default AddNote;
