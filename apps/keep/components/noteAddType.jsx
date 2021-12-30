import { AddNoteImg } from './addNotesCmps/AddNoteImg.jsx';
import { AddNoteTxt } from './addNotesCmps/AddNoteTxt.jsx';
import { AddNoteTodos } from './addNotesCmps/AddNoteTodos.jsx';
import { AddNoteVideo } from './addNotesCmps/AddNoteVideo.jsx';

export function NoteAddType({ noteType, loadNotes }) {
  switch (noteType) {
    case 'img':
      return <AddNoteImg loadNotes={loadNotes} />;
    case 'txt':
      return <AddNoteTxt loadNotes={loadNotes} />;
    case 'todos':
      return <AddNoteTodos loadNotes={loadNotes} />;
    case 'video':
      return <AddNoteVideo loadNotes={loadNotes} />;
    default:
      return <React.Fragment></React.Fragment>;
  }
}
