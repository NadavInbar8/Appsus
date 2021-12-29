import { mailService } from '../apps/mail/services/mail.service.js';
import { MailList } from '../apps/mail/componets/MailList.jsx';
import { MailHeader } from '../apps/mail/componets/MailHeader.jsx';
import { MailFolderList } from '../apps/mail/componets/MailFolderList.jsx';

export class MailApp extends React.Component {
  state = {
    mails: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails = () => {
    const { filterBy } = this.state;
    mailService.query(filterBy).then((mails) => {
      this.setState({ mails });
    });
  };
  onSetFilter = (filterBy) => {
    console.log(filterBy);
    this.setState({ filterBy }, this.loadMails);
  };

  render() {
    const { mails } = this.state;
    return (
      <div className='mail-app flex'>
        <MailHeader onSetFilter={this.onSetFilter} />
        <MailFolderList />
        <MailList loadMails={this.loadMails} mails={mails} />
      </div>
    );
  }
}
