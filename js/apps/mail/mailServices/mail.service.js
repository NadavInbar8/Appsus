import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

function query(filterBy = null) {
  let mails = _loadBooksFromStorage();

  if (!mails || !mails.length) {
    console.log('from server');
    return axious
      .get('./emails.json')
      .then((res) => res.data)
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

function _saveBooksToStorage(Books) {
  storageService.saveToStorage(KEY, Books);
}

function _loadBooksFromStorage() {
  return storageService.loadFromStorage(KEY);
}
