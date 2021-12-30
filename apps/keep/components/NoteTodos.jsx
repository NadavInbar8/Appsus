import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
export class NoteTodos extends React.Component {
  state = {
    isNoteEdited: true,
    title: '',
    todos: '',
  };

  onDeleteNote = () => {
    console.log(this.props.note.id);
    NoteService.deleteNote(this.props.note.id).then(() => {
      this.props.loadNotes();
    });
  };

  editNote = () => {
    console.log('on edit');
    this.setState({ isNoteEdited: !this.state.isNoteEdited });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    const field = target.name;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
    console.log(value, field);
  };

  updateNote = (ev) => {
    ev.preventDefault();
    console.log(this.state);
    NoteService.updateTodosNote(this.props.note.id, this.state).then(
      this.setState({
        isNoteEdited: !this.state.isNoteEdited,
        title: '',
        todos: '',
      }),
      this.props.loadNotes()
    );
  };

  render() {
    const { title, todos, isNoteEdited } = this.state;
    return (
      <React.Fragment>
        {isNoteEdited && (
          <div
            onClick={this.editNote}
            className='note-preview todos-note'
            style={{ backgroundColor: utilService.getRandomColor() }}
          >
            <h2>{this.props.note.info.label}</h2>
            <ul>
              {this.props.note.info.todos.map((todo, idx) => {
                return <li key={idx}>{todo.txt}</li>;
              })}
            </ul>
            <button onClick={this.onDeleteNote}>X</button>
          </div>
        )}

        {!isNoteEdited && (
          <div
            className='note-preview todos-note'
            style={{ backgroundColor: utilService.getRandomColor() }}
          >
            <form onSubmit={this.updateNote}>
              <label htmlFor='todosTitle'>create a new title</label>
              <input
                onChange={this.handleChange}
                value={title}
                name='title'
                id='todosTitle'
                type='text'
              />
              <br />
              <label htmlFor='todos'>create new todo list</label>
              <input
                onChange={this.handleChange}
                value={todos}
                name='todos'
                id='todos'
                type='text'
              />
              <button>update</button>
            </form>
            <button onClick={this.onDeleteNote}>X</button>
            <button onClick={this.editNote}>go back</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
