import { utilService } from '../../../js/services/util.service.js';
import { NoteService } from '../services/note.service.js';
const { Link } = ReactRouterDOM;

// ({ note, loadNotes })
export class NoteTodos extends React.Component {
  state = {
    isNoteEdited: false,
    title: this.props.note.info.label,
    todos: '',
    backgroundColor: '#454545',
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
    if (field === 'backgroundColor')
      NoteService.saveBackgroundColor(this.props.note.id, value).then(
        this.props.loadNotes()
      );
  };

  onSubmit = () => {
    this.setState({ isNoteEdited: !this.state.isNoteEdited }),
      NoteService.updateTodosNote(this.props.note.id, this.state).then(
        this.props.loadNotes()
      );
  };

  sendToTop = () => {
    NoteService.sendToTop(this.props.note.id).then(this.props.loadNotes());
  };

  duplicateNote = () => {
    NoteService.duplicateNote(this.props.note.id).then(this.props.loadNotes());
  };

  toggleLine = (ev) => {
    ev.stopPropagation();
    ev.target.style = 'text-decoration:line-through';
  };

  render() {
    const { title, todos, isNoteEdited, backgroundColor } = this.state;
    return (
      <div
        onClick={this.editNote}
        className='note-preview todos-note'
        style={{ backgroundColor: this.props.note.style.backgroundColor }}
      >
        <div className='preview-content'>
          {!isNoteEdited ? (
            <React.Fragment>
              <h2>{this.props.note.info.label}</h2>
              <ul>
                {this.props.note.info.todos.map((todo, idx) => {
                  return (
                    <li
                      key={idx}
                      onClick={(ev) => {
                        this.toggleLine(ev);
                      }}
                    >
                      {todo.txt}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label htmlFor='title'></label>
              <input
                autoFocus
                onClick={(ev) => {
                  ev.stopPropagation();
                }}
                name='title'
                onChange={this.handleChange}
                value={title}
                type='text'
              />
              <input
                autoFocus
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
                  return <li key={idx}> {todo.txt}</li>;
                })}
              </ul>
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
              {' '}
              <img src='assets/SVG/trash.svg' alt='' />
            </button>
            <Link
              className='clean-link'
              to={`/mail/notemail?subject=${title}&body=${todos}`}
            >
              <button>
                <img src='assets/SVG/mailfornotes.svg' alt='' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
