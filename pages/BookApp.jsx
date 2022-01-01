import { BookService } from '../apps/book/services/book.service.js';
import { BookList } from '../apps/book/cmps/BookList.jsx';
import { BookFilter } from '../apps/book/cmps/BookFilter.jsx';
import { AddBook } from '../apps/book/cmps/addBook.jsx';

const { Route, Switch } = ReactRouterDOM;

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    const { filterBy } = this.state;
    BookService.query(filterBy).then((books) => {
      this.setState({ books });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks);
  };

  render() {
    var booksToShow = this.state.books;

    return (
      <div>
        <AddBook loadBooks={this.loadBooks} />
        <BookFilter
          filterBy={this.state.filterBy}
          onSetFilter={this.onSetFilter}
        />
        <BookList books={booksToShow} />
      </div>
    );
  }
}
