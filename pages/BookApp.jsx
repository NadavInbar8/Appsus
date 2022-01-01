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
    console.log(filterBy);
    this.setState({ filterBy }, this.loadBooks);
  };

  // onSelectBook = (id) => {
  //   console.log(id);
  //   let { books } = this.state;
  //   console.log(books);
  //   let selectedBook = books.find((book) => book.id === id);
  //   console.log(selectedBook);

  //   this.setState({ selectedBook });
  // };

  // onUnSelectBook = () => {
  //   this.setState({ selectedBook: null });
  // };

  render() {
    // if (!this.state.books.length) return <div>loading...</div>;
    // console.log(this.state);
    var booksToShow = this.state.books;
    // console.log(booksToShow);
    // var { selectedBook } = this.state;
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
