import { mailService } from '../apps/mail/services/mail.service.js';
import { MailList } from '../apps/mail/componets/MailList.jsx';
import { MailHeader } from '../apps/mail/componets/MailHeader.jsx';
import { MailFolderList } from '../apps/mail/componets/MailFolderList.jsx';
import { ComposeMail } from '../apps/mail/componets/ComposeMail.jsx';

export class MailApp extends React.Component {
  state = {
    mails: [],
    filterBy: null,
    isNewMail: false,
  };

  componentDidMount() {
    this.loadMails();
  }

  closeMails(mails) {
    mails.map((mail) => {
      mail.isOpen = false;
    });
  }

  loadMails = () => {
    const { filterBy } = this.state;
    mailService.query(filterBy).then((mails) => {
      this.closeMails(mails);
      this.setState({ mails });
    });
  };
  onSetFilter = (filterBy) => {
    console.log(filterBy);
    this.setState({ filterBy }, this.loadMails);
  };

  togglePreview(mails, mailId) {
    mails.map((mail) => {
      if (mail.id === mailId) {
        mail.isOpen = !mail.isOpen;
        mail.isRead = true;
        mailService.saveMails(mails);
      }
    });
  }

  showUnreadCount(mails) {
    let unreadCount = 0;
    mails.forEach((mail) => {
      if (!mail.isRead) unreadCount++;
    });
    let percent = (unreadCount / mails.length) * 100;

    return percent ? Math.trunc(percent) : 100;
  }

  composeMail = () => {
    console.log(this.state.isNewMail);
    this.setState({ isNewMail: true });
  };

  closeComposeMail = () => {
    this.setState({ isNewMail: false });
  };

  render() {
    const { mails, filterBy, isNewMail } = this.state;
    return (
      <div className='mail-app flex'>
        <MailHeader
          composeMail={this.composeMail}
          onSetFilter={this.onSetFilter}
        />
        {/* <button onClick={this.composeMail}>new mail</button> */}
        <MailFolderList mails={mails} showUnreadCount={this.showUnreadCount} />

        <MailList
          togglePreview={this.togglePreview}
          loadMails={this.loadMails}
          mails={mails}
        />
        {isNewMail ? (
          <ComposeMail closeComposeMail={this.closeComposeMail} />
        ) : null}
      </div>
    );
  }
}
