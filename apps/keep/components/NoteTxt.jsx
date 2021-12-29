import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
export class NoteTxt extends React.Component {
  state = {
    isNoteEdited: true,
    txt: '',
  };

  onDeleteNote = () => {
    console.log(this.props.note.id);
    NoteService.deleteNote(this.props.note.id).then(() => {
      this.props.loadNotes();
    });
  };

  editNote = () => {
    console.log('on edit');
    this.setState({ isNoteEdited: !this.state.isNoteEdited });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, txt: value }));
  };

  updateNote = (ev) => {
    ev.preventDefault();
    NoteService.updateTxtNote(this.props.note.id, this.state.txt).then(
      this.props.loadNotes()
    );
    this.setState({ isNoteEdited: !this.state.isNoteEdited, txt: '' });

    console.log(this.state);
  };

  render() {
    const { isNoteEdited, txt } = this.state;
    return (
      <React.Fragment>
        {isNoteEdited && (
          <div
            onClick={this.editNote}
            className='note-preview txt-note'
            style={{ backgroundColor: utilService.getRandomColor() }}
          >
            <h2>note!</h2>
            <p>{this.props.note.info.txt}</p>
            <button onClick={this.onDeleteNote}>X</button>
          </div>
        )}

        {!isNoteEdited && (
          <div
            className='note-preview txt-note'
            style={{ backgroundColor: utilService.getRandomColor() }}
          >
            <button onClick={this.editNote}> go back </button>

            <h2>now you can edit your text </h2>
            <form onSubmit={this.updateNote}>
              <label htmlFor='changeTxtNote'></label>
              <input
                name='changeTxtNote'
                value={txt}
                onChange={this.handleChange}
                id='changeTxtNote'
                value={this.txt}
                type='text'
              />
              <button>submit changes</button>
            </form>
            <button onClick={this.onDeleteNote}>X</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
