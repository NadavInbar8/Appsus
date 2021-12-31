import { mailService } from '../services/mail.service.js';

export class MailHeader extends React.Component {
  state = {
    mailSearch: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  getFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({ mailSearch: '' });
  };

  render() {
    const { mailSearch } = this.state;
    return (
      <div className='mail-header'>
        <div className='mail-main-header flex'>
          <div className='mail-logo'>
            <img src='./assets/SVG/mail.svg' alt='' />
          </div>
          <div className='search-mail'>
            <form onSubmit={this.getFilter} className='mail-filter'>
              <label htmlFor='searchMail'>search mail:</label>
              <input
                type='text'
                id='searchMail'
                name='mailSearch'
                value={mailSearch}
                onChange={this.handleChange}
                onBlur={this.getFilter}
              />
              <button>submit</button>
            </form>
          </div>
          <div className='new-mail' onClick={this.props.composeMail}>
            New Mail
          </div>
        </div>
      </div>
    );
  }
}
