import { NoteImg } from './NoteImg.jsx';
import { NoteTxt } from './NoteTxt.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodos } from './NoteTodos.jsx';

export function NotePreview({ note, loadNotes }) {
  switch (note.type) {
    case 'note-img':
      return <NoteImg loadNotes={loadNotes} note={note} />;
    case 'note-txt':
      return <NoteTxt loadNotes={loadNotes} note={note} />;
    case 'note-todos':
      return <NoteTodos loadNotes={loadNotes} note={note} />;
    case 'note-video':
      return <NoteVideo loadNotes={loadNotes} note={note} />;
    default:
      return <React.Fragment></React.Fragment>;
  }
}
