import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes });
export class NoteImg extends React.Component {
  state = {
    isNoteEdited: false,
    title: this.props.note.info.title,
    url: this.props.note.info.url,
  };

  getColor = () => {
    return this.props.note.style.backgroundColor;
  };
  onDeleteNote = () => {
    console.log(this.props.note.id);
    NoteService.deleteNote(this.props.note.id).then(() => {
      this.props.loadNotes();
    });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    const field = target.name;
    console.log(value, field);
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  editNote = () => {
    if (this.state.isNoteEdited === true) this.onSubmit();
    this.setState({
      isNoteEdited: !this.state.isNoteEdited,
    });
  };

  onSubmit = () => {
    this.setState({ isNoteEdited: !this.state.isNoteEdited });
    NoteService.updateImgNote(this.props.note.id, this.state).then(
      this.props.loadNotes()
    );
  };

  render() {
    const { isNoteEdited, title, url } = this.state;
    return (
      <React.Fragment>
        <div
          onClick={this.editNote}
          className='note-preview img-note'
          style={{ backgroundColor: this.getColor() }}
        >
          {!isNoteEdited ? (
            <React.Fragment>
              <h2>{this.props.note.info.title}</h2>
              <img src={this.props.note.info.url} alt='' />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form>
                <label htmlFor='title'>update img title</label>
                <input
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                  name='title'
                  id='title'
                  onChange={this.handleChange}
                  value={title}
                  type='text'
                />

                <label htmlFor='url'>update img url</label>
                <input
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                  name='url'
                  id='url'
                  onChange={this.handleChange}
                  value={url}
                  type='text'
                />
                <img src={this.props.note.info.url} alt='' />
              </form>
            </React.Fragment>
          )}
          <button onClick={this.onDeleteNote}>X</button>
        </div>
      </React.Fragment>
    );
  }
}
