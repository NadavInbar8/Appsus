import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
export class NoteTxt extends React.Component {
  state = {
    isEditNote: false,
    txt: this.props.note.info.txt,
    backgroundColor: '#454545',
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
    const field = target.name;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
    if (field === 'backgroundColor')
      NoteService.saveBackgroundColor(this.props.note.id, value).then(
        this.props.loadNotes()
      );
  };

  updateNote = () => {
    console.log(this.state);
    NoteService.updateTxtNote(this.props.note.id, this.state.txt).then(
      this.props.loadNotes()
    );
    this.setState({ isEditNote: !this.state.isEditNote });
  };

  sendToTop = () => {
    NoteService.sendToTop(this.props.note.id).then(this.props.loadNotes());
  };

  duplicateNote = () => {
    NoteService.duplicateNote(this.props.note.id).then(this.props.loadNotes());
  };

  render() {
    const { isEditNote: isEditNote, txt, backgroundColor } = this.state;
    return (
      <div
        onClick={this.editNote}
        className='note-preview txt-note'
        style={{ backgroundColor: this.props.note.style.backgroundColor }}
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

        <input
          onChange={this.handleChange}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          type='color'
          value={backgroundColor}
          name='backgroundColor'
        />
        <button onClick={this.sendToTop}>send to top of the list </button>
        <button onClick={this.duplicateNote}>duplicate</button>
        <button onClick={this.onDeleteNote}>X</button>
      </div>
    );
  }
}
