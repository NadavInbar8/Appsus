import { NoteAddType } from './noteAddType.jsx';

export class AddNote extends React.Component {
  state = {
    noteType: 'txt',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
    // console.log(field);
  };

  render() {
    const { noteType } = this.state;
    return (
      <div className='add-note'>
        <h3>add note:</h3>
        <form onSubmit={this.addNote} className='add-note-form'>
          <select
            value={noteType}
            onChange={this.handleChange}
            name='noteType'
            id='noteType'
          >
            <option value='txt'>text</option>
            <option value='img'>img</option>
            <option value='todos'>todos</option>
            <option value='video'>video</option>
          </select>
        </form>
        <NoteAddType loadNotes={this.props.loadNotes} noteType={noteType} />
      </div>
    );
  }
}
