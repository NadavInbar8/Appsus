import { NoteService } from '../../services/note.service.js';

export class AddNoteVideo extends React.Component {
  state = {
    title: '',
    url: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  submit = (ev) => {
    ev.preventDefault();
    NoteService.addNote('video', this.state).then(this.props.loadNotes());
    this.setState({ title: '', url: '' });
  };

  render() {
    const { title, url } = this.state;
    return (
      <div className='add-note-input'>
        <div>
          <form className='add-note-form' onSubmit={this.submit} action=''>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              onChange={this.handleChange}
              id='title'
              name='title'
              value={title}
            />

            <br />
            <label htmlFor='url'>Enter video url</label>
            <input
              type='text'
              onChange={this.handleChange}
              id='url'
              name='url'
              value={url}
              placeholder='Enter img url'
            />
            <button onClick={this.submit}>
              {' '}
              <img src='assets/SVG/add.svg' alt='' />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
