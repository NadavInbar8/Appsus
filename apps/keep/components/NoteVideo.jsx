import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
export class NoteVideo extends React.Component {
  state = {
    isNoteEdited: false,
    title: '',
    url: '',
  };

  onDeleteNote = () => {
    console.log(note.id);
    NoteService.deleteNote(this.props.note.id).then(() => {
      loadNotes();
    });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    const field = target.name;
    console.log(value, field);
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  editNote = () => {
    this.setState({
      isNoteEdited: !this.state.isNoteEdited,
    });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    NoteService.updateVideoNote(this.props.note.id, this.state).then(
      this.setState({
        isNoteEdited: !this.state.isNoteEdited,
        title: '',
        url: '',
      }),
      this.props.loadNotes()
    );
  };

  render() {
    const { isNoteEdited, title, url } = this.state;

    return (
      <React.Fragment>
        {!isNoteEdited && (
          <div onClick={this.editNote} className='note-preview video-note'>
            <h3>{this.props.note.info.title}</h3>
            <iframe
              width='233'
              height='175'
              src={this.props.note.info.url}
            ></iframe>
            <button onClick={this.onDeleteNote}>X</button>
          </div>
        )}

        {isNoteEdited && (
          <div className='note-preview img-note'>
            <form onSubmit={this.onSubmit}>
              <label htmlFor='title'>update img title</label>
              <input
                name='title'
                id='title'
                onChange={this.handleChange}
                value={title}
                type='text'
              />

              <label htmlFor='url'>update img url</label>
              <input
                name='url'
                id='url'
                onChange={this.handleChange}
                value={url}
                type='text'
              />
              <button>submit</button>
            </form>
            <button onClick={this.editNote}>go back </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
