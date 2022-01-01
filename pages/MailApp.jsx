import { mailService } from '../apps/mail/services/mail.service.js';
import { MailList } from '../apps/mail/componets/MailList.jsx';
import { MailHeader } from '../apps/mail/componets/MailHeader.jsx';
import { MailFolderList } from '../apps/mail/componets/MailFolderList.jsx';
import { ComposeMail } from '../apps/mail/componets/ComposeMail.jsx';
import { NoteService } from '../apps/keep/services/note.service.js';

export class MailApp extends React.Component {
  state = {
    mails: [],
    filterBy: null,
    isNewMail: false,
    folderFilter: 0,
  };

  componentDidMount() {
    this.loadMails()
      .then(() => {
        let { mails } = this.state;
        console.log('mounting');
        mails.forEach((mail) => (mail.isOpen = false));
        mailService.saveMails(mails);
      })
      .then(() => this.loadMails());
  }

  loadMails = () => {
    const { filterBy, folderFilter } = this.state;
    mailService.query(filterBy, folderFilter).then((mails) => {
      this.setState({ mails });
    });
    return Promise.resolve();
  };
  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadMails);
  };

  onFolderFilter = (folderFilter) => {
    this.setState({ folderFilter: folderFilter }, this.loadMails);
  };

  togglePreview(mails, mailId) {
    mails.forEach((mail) => {
      if (mail.id === mailId) {
        mail.isOpen = !mail.isOpen;
        mail.isRead = true;
      }
    });
    mailService.saveMails(mails);
  }

  toggleStar(mails, mailId) {
    mails.forEach((mail) => {
      if (mail.id === mailId) {
        mail.star = !mail.star;
      }
    });
    mailService.saveMails(mails);
  }

  toggleRead(mails, mailId) {
    mails.forEach((mail) => {
      if (mail.id === mailId) {
        mail.isRead = !mail.isRead;
      }
    });
    mailService.saveMails(mails);
  }

  onMoveToTrash = (mailId) => {
    let mails = mailService.loadMails();
    if (this.state.folderFilter === 4) {
      mails.forEach((mail, idx) => {
        if (mail.id === mailId) {
          mails.splice(idx, 1);
        }
      });
      mailService.saveMails(mails);
    } else {
      mails.forEach((mail) => {
        if (mail.id === mailId) {
          mail.isTrash = true;
        }
      });
      mailService.saveMails(mails);
    }
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
    this.setState({ isNewMail: true }, this.loadMails);
  };

  closeComposeMail = () => {
    this.setState({ isNewMail: false }, this.loadMails);
  };

  onSortMail = () => {
    let sortedMails = [...this.state.mails].sort(function (x, y) {
      return x.sentAt - y.sentAt;
    });
    if (this.state.mails[1] === sortedMails[1]) {
      sortedMails = [...this.state.mails].sort(function (x, y) {
        return y.sentAt - x.sentAt;
      });
    }
    this.setState({ mails: sortedMails });
  };

  onTitleSort = () => {
    let sortedMails = [...this.state.mails].sort(function (x, y) {
      if (x.subject.toUpperCase() < y.subject.toUpperCase()) return -1;
      if (x.subject.toUpperCase() > y.subject.toUpperCase()) return 1;
      return 0;
    });
    if (this.state.mails[1] === sortedMails[1]) {
      sortedMails = [...this.state.mails].sort(function (x, y) {
        if (x.subject.toUpperCase() > y.subject.toUpperCase()) {
          return -1;
        }
        if (x.subject.toUpperCase() < y.subject.toUpperCase()) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ mails: sortedMails });
  };

  onSendNote = (subject, text) => {
    let noteText = `${subject}: ${text}`;
    let note = { txt: noteText };
    NoteService.addNote('txt', note);
  };

  render() {
    const { mails, filterBy, isNewMail } = this.state;
    return (
      <div className='mail-app flex'>
        <div className='header-mail'>
          <MailHeader
            composeMail={this.composeMail}
            onSetFilter={this.onSetFilter}
            closeComposeMail={this.closeComposeMail}
          />
        </div>
        <div className='body-mail flex'>
          <MailFolderList
            mails={mails}
            onFolderFilter={this.onFolderFilter}
            showUnreadCount={this.showUnreadCount}
          />

          <MailList
            togglePreview={this.togglePreview}
            toggleStar={this.toggleStar}
            toggleRead={this.toggleRead}
            onMoveToTrash={this.onMoveToTrash}
            loadMails={this.loadMails}
            onSendNote={this.onSendNote}
            onSortMail={this.onSortMail}
            onTitleSort={this.onTitleSort}
            mails={mails}
          />

          {isNewMail ? (
            <ComposeMail closeComposeMail={this.closeComposeMail} />
          ) : null}
        </div>
      </div>
    );
  }
}
