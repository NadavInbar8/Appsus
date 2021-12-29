import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
  query,
};

const KEY = 'mailsDb';
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};
// {mailSearch: ';lkj', filter: ''}
function query(filterBy = null) {
  let mails = _loadMailsFromStorage();

  if (!mails || !mails.length) {
    console.log('from server');
    return axios
      .get('./js/apps/mail/mailServices/emails.json')
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

function _getFilteredMails(mails, filterBy) {
  console.log(mails);
  console.log(filterBy);
  let { filter } = filterBy;
  let { mailSearch } = filterBy;
  console.log(filter);
  if (filter === '') return mails;
  let MailsFiltered = mails.filter((mail) => {
    console.log('filter', filter);
    console.log(mail.filter);
    return mail[filter].includes(mailSearch);
  });

  return MailsFiltered;

  // return mails.filter((mail) => {
  //   return mail.subject.includes(subject);
  // });
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
