import { mailService } from './mailServices/mail.service.js';
import { MailList } from './mailComponets/MailList.jsx';

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

  render() {
    const { mails } = this.state;
    return (
      <div>
        <h1>mailApp</h1>
        {/* <MailFilter /> */}
        <MailList mails={mails} />
      </div>
    );
  }
}
