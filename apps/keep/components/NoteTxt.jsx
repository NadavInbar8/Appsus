import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';

const { Link } = ReactRouterDOM;

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

  sendNote = () => {
    NoteService.sendNoteToMail(this.props.note);
  };

  render() {
    const { isEditNote: isEditNote, txt, backgroundColor } = this.state;
    return (
      <div
        onClick={this.editNote}
        className='note-preview txt-note'
        style={{ backgroundColor: this.props.note.style.backgroundColor }}
      >
        <div className='preview-content'>
          <h2>note!</h2>

          {isEditNote ? (
            <input
              autoFocus
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

          <div className='preview-buttons'>
            <input
              onChange={this.handleChange}
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              type='color'
              value={backgroundColor}
              name='backgroundColor'
            />
            <img className='paint-img' src='assets/SVG/paint.svg' alt='' />
            <button onClick={this.sendToTop}>
              <img src='assets/SVG/top.svg' alt='' />
            </button>
            <button onClick={this.duplicateNote}>
              {' '}
              <img src='assets/SVG/dup.svg' alt='' />
            </button>
            <button onClick={this.onDeleteNote}>
              {' '}
              <img src='assets/SVG/trash.svg' alt='' />
            </button>
            <Link
              className='clean-link'
              to={`/mail/notemail?subject=note&body=${txt}`}
            >
              <button onClick={console.log('m')}>
                <img src='assets/SVG/mailfornotes.svg' alt='' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
