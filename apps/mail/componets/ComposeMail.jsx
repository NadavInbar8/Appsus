import { mailService } from '../services/mail.service.js';

export class ComposeMail extends React.Component {
  state = {
    to: '',
    subject: '',
    text: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  onSendMail = (ev) => {
    ev.preventDefault();
    console.log(this.state);
    mailService.sendNewMail(this.state);
    this.setState({ to: '', subject: '', text: '' });
    this.props.closeComposeMail();
  };
  render() {
    const { to, subject, text } = this.state;
    return (
      <div className='compose-mail flex-column'>
        <div className='new-mail-header'>new message</div>
        <form onSubmit={this.onSendMail}>
          <div className='to-subject flex-column'>
            <input
              type='text'
              name='to'
              placeholder='To'
              value={to}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              value={subject}
              onChange={this.handleChange}
            />
            <textarea
              value={text}
              onChange={this.handleChange}
              name='text'
            ></textarea>
            <div className='send'>
              <button onClick={this.onSendMail}>Send</button>
            </div>
          </div>
        </form>
      </div>
      // </div>
    );
  }
}
