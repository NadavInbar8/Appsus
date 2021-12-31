import { mailService } from '../services/mail.service.js';
import { MailHeader } from '../componets/MailHeader.jsx';
import { MailFolderList } from '../componets/MailFolderList.jsx';

export class MailDetails extends React.Component {
  state = {
    mail: '',
  };

  componentDidMount() {
    this.loadMail();
  }

  loadMail = () => {
    const { mailId } = this.props.match.params;
    mailService.getMailById(mailId).then((mail) => {
      if (!mail) return this.props.history.push('/mail');
      this.setState({ mail });
    });
  };
  onGoBack = () => {
    this.props.history.push('/mail');
  };

  render() {
    const { mail } = this.state;
    if (!mail) return <div>loading</div>;
    return (
      <div className='mail-details flex-colunm'>
        <h1>{mail.subject}</h1>
        <div className='details-from-to'>
          <h2>{mail.from}</h2>
          <span>{mail.fromEmail}</span>
          <h5>to me</h5>
        </div>
        <div className='details-body'>
          <p>{mail.body}</p>
        </div>
        <button className='primary-btn' onClick={this.onGoBack}>
          Go back
        </button>
      </div>
    );
  }
}
