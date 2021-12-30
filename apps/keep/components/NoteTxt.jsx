import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
export class NoteTxt extends React.Component {
  state = {
    isEditNote: false,
    txt: this.props.note.info.txt,
  };

  onDeleteNote = () => {
    console.log(this.props.note.id);
    NoteService.deleteNote(this.props.note.id).then(() => {
      this.props.loadNotes();
    });
  };

  editNote = () => {
    if (this.state.isEditNote) this.updateNote();
    console.log('on edit');
    this.setState({ isEditNote: !this.state.isEditNote });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, txt: value }));
  };

  updateNote = () => {
    console.log(this.state);
    NoteService.updateTxtNote(this.props.note.id, this.state.txt).then(
      this.props.loadNotes()
    );
    this.setState({ isEditNote: !this.state.isEditNote });
  };

  render() {
    const { isEditNote: isEditNote, txt } = this.state;
    return (
      <div
        onClick={this.editNote}
        className='note-preview txt-note'
        style={{ backgroundColor: utilService.getRandomColor() }}
      >
        <h2>note!</h2>
        {isEditNote ? (
          <input
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            name='txt'
            value={txt}
            onChange={this.handleChange}
            type='text'
          />
        ) : (
          <p>{txt}</p>
        )}

        <button onClick={this.onDeleteNote}>X</button>
      </div>
    );
  }
}
