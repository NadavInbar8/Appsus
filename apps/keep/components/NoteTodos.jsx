import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';
// ({ note, loadNotes })
export class NoteTodos extends React.Component {
  state = {
    isNoteEdited: false,
    title: this.props.note.info.label,
    todos: '',
  };

  // conponentDidMount() {
  //   this.setState({ todos: getTodosToShow() });
  // }

  getTodosToShow = () => {
    let todoTxt = this.props.note.info.todos.map((todo) => {
      return todo.txt;
    });
    return todoTxt.toString();
  };

  onDeleteNote = () => {
    NoteService.deleteNote(this.props.note.id).then(() => {
      this.props.loadNotes();
    });
  };

  editNote = () => {
    if (this.state.isNoteEdited === true) this.onSubmit();

    this.setState({
      isNoteEdited: !this.state.isNoteEdited,
      todos: this.getTodosToShow(),
    });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    const field = target.name;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  onSubmit = () => {
    this.setState({ isNoteEdited: !this.state.isNoteEdited }),
      NoteService.updateTodosNote(this.props.note.id, this.state).then(
        this.props.loadNotes()
      );
  };

  render() {
    const { title, todos, isNoteEdited } = this.state;
    return (
      <div
        onClick={this.editNote}
        className='note-preview todos-note'
        style={{ backgroundColor: utilService.getRandomColor() }}
      >
        {!isNoteEdited ? (
          <React.Fragment>
            <h2>{this.props.note.info.label}</h2>
            <ul>
              {this.props.note.info.todos.map((todo, idx) => {
                return <li key={idx}>{todo.txt}</li>;
              })}
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <label htmlFor='title'>update todos title</label>
            <input
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              name='title'
              onChange={this.handleChange}
              value={title}
              type='text'
            />
            <label htmlFor='todos'>create new todo list</label>
            <input
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              onChange={this.handleChange}
              value={todos}
              name='todos'
              type='text'
            />
            <ul>
              {this.props.note.info.todos.map((todo, idx) => {
                return <li key={idx}>{todo.txt}</li>;
              })}
            </ul>
          </React.Fragment>
        )}

        <button onClick={this.onDeleteNote}>X</button>
      </div>

      /* {!isNoteEdited && (
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
          </div> */
      /* )} */
    );
  }
}
