import { NoteService } from '../../services/note.service.js';

export class AddNoteTxt extends React.Component {
  state = {
    txt: '',
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, txt: value }));
  };

  submit = (ev) => {
    ev.preventDefault();
    const txt = this.state;
    NoteService.addNote('txt', txt).then(this.props.loadNotes());
    this.setState({ txt: '' });
  };

  render() {
    const { txt } = this.state;
    return (
      <div className='add-note-input'>
        <form onSubmit={this.submit} action=''>
          <label htmlFor='addNote'>Add note:</label>
          <input
            type='text'
            onChange={this.handleChange}
            id='addNote'
            name='content'
            value={txt}
          />
          <button>submit</button>
        </form>
      </div>
    );
  }
}
