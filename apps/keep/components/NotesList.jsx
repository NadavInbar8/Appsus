import { NotePreview } from './NotePreview.jsx';

export function NotesList({ notes, loadNotes }) {
  return (
    <div className='note-list'>
      {notes.map((note) => {
        return <NotePreview loadNotes={loadNotes} key={note.id} note={note} />;
      })}
    </div>
  );
}
