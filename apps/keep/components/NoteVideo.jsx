import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
const { Link } = ReactRouterDOM;

export class NoteVideo extends React.Component {
  state = {
    isNoteEdited: false,
    title: this.props.note.info.title,
    url: this.props.note.info.url,
    backgroundColor: '#454545',
  };

  onDeleteNote = () => {
    NoteService.deleteNote(this.props.note.id).then(() => {
      this.props.loadNotes();
    });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    const field = target.name;
    console.log(value, field);
    this.setState((prevState) => ({ ...prevState, [field]: value }));
    if (field === 'backgroundColor')
      NoteService.saveBackgroundColor(this.props.note.id, value).then(
        this.props.loadNotes()
      );
  };

  editNote = () => {
    if (this.state.isNoteEdited === true) this.onSubmit();
    this.setState({
      isNoteEdited: !this.state.isNoteEdited,
    });
  };

  onSubmit = (ev) => {
    this.setState({ isNoteEdited: !this.state.isNoteEdited }),
      NoteService.updateVideoNote(this.props.note.id, this.state).then(
        this.props.loadNotes()
      );
  };

  sendToTop = () => {
    NoteService.sendToTop(this.props.note.id).then(this.props.loadNotes());
  };

  duplicateNote = () => {
    NoteService.duplicateNote(this.props.note.id).then(this.props.loadNotes());
  };

  render() {
    const { backgroundColor, isNoteEdited, title, url } = this.state;

    return (
      <div
        style={{ backgroundColor: this.props.note.style.backgroundColor }}
        onClick={this.editNote}
        className='note-preview video-note'
      >
        <div className='preview-content'>
          {!isNoteEdited ? (
            <React.Fragment>
              <h3>{this.props.note.info.title}</h3>
              <iframe
                width='233'
                height='175'
                src={this.props.note.info.url}
              ></iframe>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form>
                <input
                  autoFocus
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                  name='title'
                  id='title'
                  onChange={this.handleChange}
                  value={title}
                  type='text'
                />
                <input
                  autoFocus
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                  name='url'
                  id='url'
                  onChange={this.handleChange}
                  value={url}
                  type='text'
                />
                <iframe
                  width='233'
                  height='175'
                  src={this.props.note.info.url}
                ></iframe>
              </form>
            </React.Fragment>
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
              <img src='assets/SVG/trash.svg' alt='' />
            </button>
            <Link
              className='clean-link'
              to={`/mail/?notemail=subject=${title}&body=${url}`}
            >
              <button onClick={this.sendNote}>
                <img src='assets/SVG/mailfornotes.svg' alt='' />
              </button>
            </Link>
          </div>
        </div>
      </div>

      /* {isNoteEdited && (
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
        )} */
    );
  }
}
