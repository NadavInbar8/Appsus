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
        <form className='add-note-form' onSubmit={this.submit} action=''>
          <input
            type='text'
            onChange={this.handleChange}
            id='addNote'
            name='content'
            value={txt}
          />
          <button className='add-button'>
            <img src='assets/SVG/add.svg' alt='' />
          </button>
        </form>
      </div>
    );
  }
}
