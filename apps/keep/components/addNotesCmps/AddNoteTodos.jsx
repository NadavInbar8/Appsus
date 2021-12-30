import { TodoInputs } from '../TodoInputs.jsx';
import { NoteService } from '../../services/note.service.js';
export class AddNoteTodos extends React.Component {
  state = {
    title: '',
    todos: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  submit = (ev) => {
    ev.preventDefault();
    NoteService.addNote('todos', this.state).then(this.props.loadNotes());
    this.setState({ title: '', todos: '' });
  };

  render() {
    const { title, todos } = this.state;
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
            <label htmlFor='todo'>Write your todos:</label>
            <input
              type='text'
              onChange={this.handleChange}
              id='todo'
              name='todos'
              value={todos}
              placeholder='Enter comma seperated list'
            />
            <button className='add-button'>
              <img src='assets/SVG/add.svg' alt='' />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
