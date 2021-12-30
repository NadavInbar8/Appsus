import { NotePreview } from './NotePreview.jsx';

export function NotesList({ notes, loadNotes }) {
  //   console.log(notes);
  return (
    <div className='note-list'>
      <h2>you are in notes list</h2>
      {notes.map((note) => {
        return <NotePreview loadNotes={loadNotes} key={note.id} note={note} />;
      })}
    </div>
  );
}
