import { storageService } from '../../../js/services/storage.service.js';

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
