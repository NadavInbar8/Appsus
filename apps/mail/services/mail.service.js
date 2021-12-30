import { storageService } from '../../../js/services/storage.service.js';
import { utilService } from '../../../js/services/util.service.js';

export const mailService = {
  query,
  saveMails,
  sendNewMail,
};

const KEY = 'mailsDb';
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Nadav Inbar',
};
// {mailSearch: ';lkj', filter: ''}
function query(filterBy = null, folderFilter = 0) {
  let mails = _loadMailsFromStorage();

  if (!mails || !mails.length) {
    console.log('from server');
    return axios
      .get('apps/mail/services/emails.json')
      .then((res) => {
        console.log(res.data);
        _saveMailsToStorage(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('cannot get answer: ', err);
        throw err;
      });
  } else {
    console.log('from storage');
    if (folderFilter === 0) {
      let notTrash = mails.filter((mail) => mail.isTrash === false);
      return Promise.resolve(notTrash);
    }
    if (folderFilter === 1) {
      let didRead = mails.filter(
        (mail) => mail.isRead === true && mail.isTrash === false
      );
      return Promise.resolve(didRead);
    }
    if (folderFilter === 2) {
      let didntRead = mails.filter(
        (mail) => mail.isRead === false && mail.isTrash === false
      );
      return Promise.resolve(didntRead);
    }
    if (folderFilter === 3) {
      let isStar = mails.filter(
        (mail) => mail.star === true && mail.isTrash === false
      );
      return Promise.resolve(isStar);
    }
    if (folderFilter === 4) {
      let isTrash = mails.filter((mail) => mail.isTrash === true);
      return Promise.resolve(isTrash);
    }
    if (folderFilter === 5) {
      let sent = mails.filter(
        (mail) => mail.fromEmail === 'user@appsus.com' && mail.isTrash === false
      );
      return Promise.resolve(sent);
    }
    const FilteredMails = _getFilteredMails(mails, filterBy);
    console.log(FilteredMails);

    return Promise.resolve(FilteredMails);
  }
}

function sendNewMail(newMail) {
  let mail = {
    id: utilService.makeId(),
    subject: newMail.subject,
    body: newMail.text,
    isRead: false,
    sentAt: Date.now(),
    star: false,
    labels: [],
    fromEmail: loggedinUser.email,
    to: newMail.to,
    from: loggedinUser.fullname,
    isOpen: false,
    isTrash: false,
  };

  let mails = query(null).then((queryMails) => {
    queryMails.unshift(mail);
    console.log(queryMails);
    saveMails(queryMails);
  });
  console.log(mails);
}

function saveMails(mails) {
  _saveMailsToStorage(mails);
}

function _getFilteredMails(mails, filterBy) {
  let { mailSearch } = filterBy;
  if (mailSearch === '') {
    return mails;
  }
  let MailsFiltered = mails.filter((mail) => {
    if (mail.subject.toUpperCase().includes(mailSearch.toUpperCase())) {
      return mail;
    }
    if (mail.body.toUpperCase().includes(mailSearch)) return mail;
    if (mail.to.toUpperCase().includes(mailSearch)) return mail;
    if (mail.from.toUpperCase().includes(mailSearch)) return mail;
  });
  return MailsFiltered;
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
