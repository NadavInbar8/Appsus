import { NotesList } from '../apps/keep/components/NotesList.jsx';
import { NoteService } from '../apps/keep/services/note.service.js';
import { AddNote } from '../apps/keep/components/AddNote.jsx';
export class KeepApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadNotes();
  }
  loadNotes = () => {
    const { filterBy } = this.state;
    NoteService.query(filterBy).then((notes) => {
      this.setState({ notes });
      // console.log(notes);
    });
  };

  // onSetFilter = (filterBy) => {
  //   console.log(filterBy);
  //   this.setState({ filterBy }, this.loadMails);
  // };

  render() {
    const { notes } = this.state;

    return (
      <div>
        {/* <NotesHeader onSetFilter={this.onSetFilter} /> */}
        <AddNote loadNotes={this.loadNotes} />

        {notes && <NotesList loadNotes={this.loadNotes} notes={notes} />}
      </div>
    );
  }
}
