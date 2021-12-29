import { NoteService } from '../../../js/services/note.service.js';

export class AddNoteImg extends React.Component {
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
    console.log(this.state);
    NoteService.addNote('img', this.state).then(this.props.loadNotes());
    this.setState({ title: '', url: '' });
  };

  render() {
    const { title, url } = this.state;
    return (
      <div className='add-note-input'>
        <div>
          <form onSubmit={this.submit} action=''>
            <label htmlFor='title'>title:</label>
            <input
              type='text'
              onChange={this.handleChange}
              id='title'
              name='title'
              value={title}
            />

            <br />
            <label htmlFor='url'>enter img url</label>
            <input
              type='text'
              onChange={this.handleChange}
              id='url'
              name='url'
              value={url}
              placeholder='Enter img url'
            />
            <button onClick={this.submit}>add img note</button>
          </form>
        </div>
      </div>
    );
  }
}

// {
//   "id": "n105",
//   "type": "note-img",
//   "info": {
//     "url": "https://picsum.photos/200/300",
//     "title": "Bobi and Me"
//   },
//   "style": {
//     "backgroundColor": "#00d"
//   }
// },
