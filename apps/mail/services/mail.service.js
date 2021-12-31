import { storageService } from '../../../js/services/storage.service.js';
import { utilService } from '../../../js/services/util.service.js';

export const mailService = {
  query,
  saveMails,
  sendNewMail,
  getMailById,
  loadMails,
  saveDraft,
};

const KEY = 'mailsDb';
const TrashKEY = 'trashDB';
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Nadav Inbar',
};
const drafts = [];
// {mailSearch: ';lkj', filter: ''}
function query(filterBy = null, folderFilter = 0) {
  let mails = _loadMailsFromStorage();

  if (!mails || !mails.length) {
    console.log('from server');
    return axios
      .get('apps/mail/services/emails.json')
      .then((res) => {
        _saveMailsToStorage(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('cannot get answer: ', err);
        throw err;
      });
  } else {
    console.log('from storage');

    switch (folderFilter) {
      case 1:
        break;

      default:
        break;
    }
    const FilteredMails = _getFilteredMails(mails, filterBy);

    if (folderFilter === 0 && !filterBy) {
      let notTrash = FilteredMails.filter((mail) => mail.isTrash === false);
      return Promise.resolve(notTrash);
    }
    if (folderFilter === 1) {
      let didRead = FilteredMails.filter(
        (mail) => mail.isRead === true && mail.isTrash === false
      );
      return Promise.resolve(didRead);
    }
    if (folderFilter === 2) {
      let didntRead = FilteredMails.filter(
        (mail) => mail.isRead === false && mail.isTrash === false
      );
      return Promise.resolve(didntRead);
    }
    if (folderFilter === 3) {
      let isStar = FilteredMails.filter(
        (mail) => mail.star === true && mail.isTrash === false
      );
      return Promise.resolve(isStar);
    }
    if (folderFilter === 4) {
      let showTrash = FilteredMails.filter((mail) => mail.isTrash === true);
      return Promise.resolve(showTrash);
    }
    if (folderFilter === 5) {
      let sent = FilteredMails.filter(
        (mail) => mail.fromEmail === 'user@appsus.com' && mail.isTrash === false
      );
      return Promise.resolve(sent);
    }
    return Promise.resolve(FilteredMails);
  }
}

function sendNewMail(newMail) {
  console.log(newMail);
  let mail = {
    id: utilService.makeId(),
    subject: newMail.subject,
    body: newMail.text,
    isRead: false,
    sentAt: Date.now(),
    star: false,
    labels: newMail.labels,
    fromEmail: loggedinUser.email,
    to: newMail.to,
    from: loggedinUser.fullname,
    isOpen: false,
    isTrash: false,
  };

  let mails = query(null).then((queryMails) => {
    queryMails.unshift(mail);
    saveMails(queryMails);
  });
}

function saveMails(mails) {
  _saveMailsToStorage(mails);
}

function loadMails() {
  return _loadMailsFromStorage();
}

function saveDraft(draft) {
  console.log(draft);
}

function _getFilteredMails(mails, filterBy) {
  let mailSearch = '';
  if (filterBy) mailSearch = filterBy.mailSearch;
  if (mailSearch === '') {
    return mails;
  }
  let MailsFiltered = mails.filter((mail) => {
    if (mail.subject.toUpperCase().includes(mailSearch.toUpperCase())) {
      return mail;
    }

    if (mail.body.toUpperCase().includes(mailSearch.toUpperCase())) return mail;
    if (mail.to.toUpperCase().includes(mailSearch.toUpperCase())) return mail;
    if (mail.from.toUpperCase().includes(mailSearch.toUpperCase())) return mail;
  });
  return MailsFiltered;
}

function getMailById(mailId) {
  const mails = _loadMailsFromStorage();
  let mail = mails.find((mail) => mailId === mail.id);
  return Promise.resolve(mail);
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
