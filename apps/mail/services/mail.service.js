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
  fullname: 'Nadav Inbar and Oded Kovo',
};
// {mailSearch: ';lkj', filter: ''}
function query(filterBy = null) {
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
    if (!filterBy) return Promise.resolve(mails);
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
    to: newMail.to,
    from: loggedinUser.fullname,
    isOpen: false,
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
  let { filter } = filterBy;
  let { mailSearch } = filterBy;
  if (filter === '') return mails;
  let MailsFiltered = mails.filter((mail) => {
    return mail[filter].includes(mailSearch);
  });
  return MailsFiltered;
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
