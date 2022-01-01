import { storageService } from '../services/storage.service.js';
import { utilService } from '../services/util.service.js';

export const BookService = {
  query,
  getBookById,
  addReview,
  getBookReviews,
  deleteReview,
  getBookList,
  addBook,
  getNearBookId,
};

const KEY = 'bookDB';

function query(filterBy = null) {
  console.log('high');
  let books = _loadBooksFromStorage();

  if (!books || !books.length) {
    console.log('from server');
    return axios.get('apps/book/services/books.json').then((res) => {
      books = res.data;
      console.log(books);
      _saveBooksToStorage(books);
      return Promise.resolve(books);
    });
  } else {
    console.log('from storage');
    if (!filterBy) return Promise.resolve(books);
    const FilteredBooks = _getFilteredBooks(books, filterBy);
    console.log(FilteredBooks);
    return Promise.resolve(FilteredBooks);
  }
}

function getNearBookId(bookId, val) {
  let books = _loadBooksFromStorage();
  let bookIdx = books.findIndex((book) => book.id === bookId);
  let nextBookIdx = bookIdx + val;
  if (nextBookIdx === books.length) nextBookIdx = 0;
  if (nextBookIdx === -1) nextBookIdx = books.length - 1;
  return books[nextBookIdx].id;
}

function getBookList(val) {
  console.log(val);

  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${val}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log('Cannot get ans', err);
      throw err;
    });
}

function addBook(book) {
  const bookToAdd = {
    authors: book.volumeInfo.authors ? book.volumeInfo.authors : '',
    categories: book.volumeInfo.categories ? book.volumeInfo.categories : '',
    description: book.volumeInfo.description ? book.volumeInfo.description : '',
    id: book.id ? book.id : '',
    language: book.volumeInfo.language ? book.volumeInfo.language : '',
    listPrice: {
      amount: utilService.getRandomIntInclusive(50, 100),
      currencyCode: 'USD',
      isOnSale: false,
    },
    pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : '',
    publishedDate: book.volumeInfo.publishedDate
      ? book.volumeInfo.publishedDate
      : '',
    subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : '',
    thumbnail: book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : '',
    title: book.volumeInfo.title ? book.volumeInfo.title : '',
  };
  const books = _loadBooksFromStorage();
  books.unshift(bookToAdd);
  _saveBooksToStorage(books);
  return Promise.resolve();
}

function _getFilteredBooks(books, filterBy) {
  let { bookName, minPrice, maxPrice } = filterBy;
  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = Infinity;
  return books.filter((book) => {
    return (
      book.title.includes(bookName) &&
      book.listPrice.amount < maxPrice &&
      book.listPrice.amount > minPrice
    );
  });
}

function getBookById(BookId) {
  const books = _loadBooksFromStorage();
  var book = books.find((book) => {
    return BookId === book.id;
  });
  return Promise.resolve(book);
}

function addReview(bookId, review) {
  review.id = utilService.makeId();
  console.log(bookId);
  const books = _loadBooksFromStorage();
  console.log(books);
  const book = books.find((book) => book.id === bookId);
  console.log(book);
  if (!book.bookReviews || book.bookReviews.length === 0) {
    book.bookReviews = [review];
    console.log('in the if ');
  } else book.bookReviews.push(review);
  _saveBooksToStorage(books);
}

function getBookReviews(bookId) {
  const books = _loadBooksFromStorage();
  let book = books.find((book) => book.id === bookId);
  console.log(book.bookReviews);
  if (!book.bookReviews || !book.bookReviews.length) return;
  return book.bookReviews;
}

function deleteReview(reviewId, bookId) {
  const books = _loadBooksFromStorage();
  let book = books.find((book) => book.id === bookId);
  const reviewIdx = book.bookReviews.findIndex(
    (review) => review.id === reviewId
  );
  console.log(book.bookReviews);
  book.bookReviews.splice(reviewIdx, 1);
  console.log(book.bookReviews);
  _saveBooksToStorage(books);
}

function _loadBooksFromStorage() {
  return storageService.loadFromStorage(KEY);
}

function _saveBooksToStorage(books) {
  return storageService.saveToStorage(KEY, books);
}
