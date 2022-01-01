import { BookService } from '../services/book.service.js';
import { eventBusService } from '../services/event-bus.service.js';

export class AddBook extends React.Component {
  state = {
    bookName: '',
    bookList: '',
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, bookName: value }));
  };

  getBookList = (ev) => {
    ev.preventDefault();
    const { bookName } = this.state;
    this.setState({ bookName: '' });
    // var test = new Promise((resolve) => {
    BookService.getBookList(bookName).then((bookList) => {
      this.showBookList(bookList);
    });
  };

  showBookList = (bookList) => {
    console.log(bookList);
    this.setState({ bookList });
  };

  addBook = (book) => {
    console.log(book);

    BookService.addBook(book).then(() => {
      console.log(book);
      this.props.loadBooks();
      eventBusService.emit('user-msg', {
        text: `great ${book.volumeInfo.title} has added  `,
        link: book.id,
        type: 'happy ',
      });
    });
  };

  render() {
    const { bookName } = this.state;
    const { bookList } = this.state;
    return (
      <div>
        <form onSubmit={this.getBookList} action=''>
          <label htmlFor='book-name'>name:</label>
          <input
            className='name-input'
            value={bookName}
            onChange={this.handleChange}
            id='book-name'
            name='bookName'
            type='text'
          />
          <button>add</button>
        </form>
        {bookList && bookList.totalItems !== 0 && (
          <div>
            <h3>choose book to add:</h3>
            <ul>
              {bookList.items.map((book) => {
                return (
                  <li key={book.id}>
                    {book.volumeInfo.title}{' '}
                    <button onClick={() => this.addBook(book)}>+</button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
