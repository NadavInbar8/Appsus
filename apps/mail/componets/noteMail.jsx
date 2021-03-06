import { mailService } from '../services/mail.service.js';

export class noteMail extends React.Component {
  state = {
    to: '',
    subject: '',
    text: '',
    labels: [],
  };

  get subjectSearchParams() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    return urlSearchParams.get('subject');
  }
  get bodySearchParams() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    return urlSearchParams.get('body');
  }
  get mailToDisplay() {
    const { subject, text } = this.state;
    const noteSubject = this.subjectSearchParams;
    const noteText = this.bodySearchParams;
    this.setState({ subject: noteSubject, text: noteText });
    console.log(noteSubject, noteText);
  }

  componentDidMount() {
    this.mailToDisplay;
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  handleLabel = ({ target }) => {
    const value = target.value;
    if (target.checked) {
      this.setState({ labels: [...this.state.labels, value] });
    } else {
      this.setState({
        labels: this.state.labels.filter((label) => label !== value),
      });
    }
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
            <div className='label-inputs flex'>
              <input
                type='checkbox'
                name='labels'
                value='Social'
                id='social'
                onChange={this.handleLabel}
              />
              <label htmlFor='social'>Social</label>
              <input
                type='checkbox'
                name='labels'
                value='Love'
                id='Love'
                onChange={this.handleLabel}
              />
              <label htmlFor='social'>Love</label>

              <input
                type='checkbox'
                name='labels'
                id='Family'
                value='Family'
                onChange={this.handleLabel}
              />
              <label htmlFor='Family'>Family</label>

              <input
                type='checkbox'
                name='labels'
                id='Promotion'
                value='Promotion'
                onChange={this.handleLabel}
              />
              <label htmlFor='Promotion'>Promotion</label>

              <input
                type='checkbox'
                name='labels'
                id='Gaming'
                value='Gaming'
                onChange={this.handleLabel}
              />
              <label htmlFor='Gaming'>Gaming</label>
            </div>

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
