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
              <input
                type='text'
                id='searchMail'
                name='mailSearch'
                className='searchMail'
                placeholder='Search Mail'
                value={mailSearch}
                onChange={this.handleChange}
                onBlur={this.getFilter}
              />
            </form>
          </div>
          <div
            className='new-mail flex-column'
            onClick={this.props.composeMail}
          >
            <span className='compose-span'>Compose Mail</span>
            <img src='assets/SVG/plus.svg' alt='plus' />
          </div>
        </div>
      </div>
    );
  }
}
