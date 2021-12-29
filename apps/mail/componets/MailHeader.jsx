import { mailService } from '../services/mail.service.js';

export class MailHeader extends React.Component {
  state = {
    mailSearch: '',
    filter: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  getFitler = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state);
  };

  render() {
    const { mailSearch, filter } = this.state;
    return (
      <div className='mail-header'>
        <div className='mail-main-header flex'>
          <div className='mail-logo'>
            <img src='./assets/SVG/mail.svg' alt='' />
          </div>
          <div className='search-mail'>
            <form onSubmit={this.getFitler} className='mail-filter'>
              <label htmlFor='searchMail'>search mail:</label>
              <input
                type='text'
                id='searchMail'
                name='mailSearch'
                value={mailSearch}
                onChange={this.handleChange}
              />

              <label htmlFor='filter'>Rate:</label>
              <select
                value={filter}
                onChange={this.handleChange}
                name='filter'
                id='filter'
              >
                <option value=''>All Mails</option>
                <option value='subject'>subject</option>
                <option value='body'>body</option>
                <option value='from'>from</option>
              </select>
              <button>submit</button>
            </form>
          </div>
          <div className='new-mail'>hello</div>
        </div>
      </div>
    );
  }
}
