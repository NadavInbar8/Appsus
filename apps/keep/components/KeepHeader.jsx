import { NoteService } from '../services/note.service.js';
export class KeepHeader extends React.Component {
  state = {
    type: 'all',
    txt: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const field = target.name;
    // console.log(value, field);
    this.setState(
      (prevState) => ({ ...prevState, [field]: value }),
      this.onSelect
    );
  };

  onSelect = () => {
    const { type } = this.state;
    const { txt } = this.state;
    console.log(txt);
    console.log(this.state);
    this.props.onSetFilter(this.state);
  };

  onSubmit = (ev) => {
    ev.preventDefault();
  };

  render() {
    const { type, txt } = this.state;
    return (
      <div className='keep-header'>
        <form action=''>
          <label htmlFor='txt'>search for note:</label>
          <input onChange={this.handleChange} name='txt' type='text' id='txt' />

          <label htmlFor='type'>serch by note type</label>
          <select
            onChange={this.handleChange}
            value={type}
            name='type'
            id='type'
          >
            <option value=''>all</option>
            <option value='note-video'>video</option>
            <option value='note-img'>img</option>
            <option value='note-txt'>txt</option>
            <option value='note-todos'>todos</option>
          </select>
        </form>
      </div>
    );
  }
}
