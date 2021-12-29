import { mailService } from './mailServices/mail.service.js';
import { MailList } from './mailComponets/MailList.jsx';
import { MailHeader } from './mailComponets/MailHeader.jsx';

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
      <div>
        <MailHeader onSetFilter={this.onSetFilter} />

        {/* <MailFilter /> */}
        <MailList mails={mails} />
      </div>
    );
  }
}
