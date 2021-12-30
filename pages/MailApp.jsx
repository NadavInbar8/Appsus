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
    folderFilter: 0,
  };

  componentDidMount() {
    this.loadMails();
  }

  closeMails(mails) {
    mails.forEach((mail) => {
      mail.isOpen = false;
    });
  }

  loadMails = () => {
    const { filterBy, folderFilter } = this.state;
    mailService.query(filterBy, folderFilter).then((mails) => {
      this.closeMails(mails);
      this.setState({ mails });
    });
  };
  onSetFilter = (filterBy) => {
    console.log(filterBy);
    this.setState({ filterBy }, this.loadMails);
  };

  onFolderFilter = (folderFilter) => {
    console.log(folderFilter);
    this.setState({ folderFilter: folderFilter }, this.loadMails);
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

  onMoveToTrash = (mails, mailId) => {
    mails.forEach((mail) => {
      if (mail.id === mailId) mail.isTrash = true;
    });
    mailService.saveMails(mails);
  };

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
    this.setState({ isNewMail: true }, this.loadMails);
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

        <MailFolderList
          mails={mails}
          onFolderFilter={this.onFolderFilter}
          showUnreadCount={this.showUnreadCount}
        />

        <MailList
          togglePreview={this.togglePreview}
          onMoveToTrash={this.onMoveToTrash}
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
