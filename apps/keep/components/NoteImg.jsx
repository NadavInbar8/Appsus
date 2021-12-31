import { NoteService } from '../services/note.service.js';
const { Link } = ReactRouterDOM;

// ({ note, loadNotes });
export class NoteImg extends React.Component {
  state = {
    isNoteEdited: false,
    title: this.props.note.info.title,
    url: this.props.note.info.url,
    backgroundColor: '#454545',
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
    if (field === 'backgroundColor')
      NoteService.saveBackgroundColor(
        this.props.note.id,
        this.state.backgroundColor
      ).then(this.props.loadNotes());
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

  sendToTop = () => {
    NoteService.sendToTop(this.props.note.id).then(this.props.loadNotes());
  };

  duplicateNote = () => {
    NoteService.duplicateNote(this.props.note.id).then(this.props.loadNotes());
  };

  render() {
    const { isNoteEdited, title, url, backgroundColor } = this.state;
    return (
      <React.Fragment>
        <div
          onClick={this.editNote}
          className='note-preview img-note'
          style={{ backgroundColor: this.props.note.style.backgroundColor }}
        >
          <div className='preview-content'>
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
                  <img src={this.props.note.info.url} alt='' />
                </form>
              </React.Fragment>
            )}
            <div className='preview-buttons'>
              <input
                autoFocus
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
                to={`/mail/notemail?subject=${title}&body=${url}`}
              >
                <button onClick={console.log('h')}>
                  <img src='assets/SVG/mailfornotes.svg' alt='' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
