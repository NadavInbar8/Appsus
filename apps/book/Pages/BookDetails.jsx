import { BookService } from '../services/book.service.js';
import { ReviewAdd } from '../cmps/ReviewAdd.jsx';
import { LongTxt } from '../cmps/LongTxt.jsx';

// import { BookDetailsWithoutReview } from '../cmps/bookDeatailsWithoutReview.jsx';

const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
  state = {
    book: null,
    isAddReviewShown: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.loadBook();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook();
    }
  }

  getPageCount = (bookPageCount) => {
    if (bookPageCount > 500) return '-long reading';
    else if (bookPageCount > 200) return '-decent reading';
    else if (bookPageCount < 100) return '-light reading';
  };

  getPublishDate = (publishDate) => {
    if (publishDate < new Date().getFullYear() - 10) return ' Veteran Book';
    else if (publishDate > new Date().getFullYear() - 1) return ' New!';
    else return '';
  };

  getPriceClass = (price) => {
    if (price > 150) return 'expensive';
    else if (price < 20) return 'cheap';
  };
  getDisplayOfMore = (isOnSale) => {
    if (isOnSale) return 'block';
    else return 'none';
  };

  loadBook = () => {
    const { bookId } = this.props.match.params;
    BookService.getBookById(bookId).then((book) => {
      if (!book) return this.props.history.push('/');
      this.setState({ book });
    });
  };

  toggleReviewSection = (ev) => {
    if (!this.state.isAddReviewShown) ev.target.innerText = 'unshow review';
    else ev.target.innerText = 'show review';

    this.setState({ isAddReviewShown: !this.state.isAddReviewShown });
  };

  render() {
    const { book } = this.state;
    if (!book) return <div>loading..</div>;
    return (
      <div className='book-details-page'>
        {this.state.isAddReviewShown && (
          <ReviewAdd loadBook={this.loadBook} bookId={book.id} />
        )}

        {/* <BookDetailsWithoutReview
          urlId={this.props.match.params}
          toggleReviewSection={this.toggleReviewSection}
          book={book}
          loadBook={this.loadBook}
        /> */}

        <div className='book-details'>
          <h1>{book.title}</h1>
          <hr />
          <h2>{book.subtitle}</h2>
          <p>
            <b> language:</b> {book.language}, <b>authors:</b>
            {book.authors.toString()},<b> categories:</b>
            {book.categories.toString()}, <b>published At:</b>
            {book.publishedDate}
            {this.getPublishDate(book.publishedDate)}, <b>id</b>:{book.id}
          </p>
          <LongTxt text={book.description} />
          <h2 className={this.getDisplayOfMore(book.listPrice.isOnSale)}>
            on sale!!
          </h2>
          <img src={book.thumbnail} alt='' />
          <p>
            <b>page count:</b> {book.pageCount}
            {this.getPageCount(book.pageCount)}
          </p>
          <p className={this.getPriceClass(book.listPrice.amount)}>
            price:{book.listPrice.amount}
          </p>
          <button onClick={this.toggleReviewSection}>show review</button>
          <Link to={`/books/${BookService.getNearBookId(book.id, 1)}`}>
            next book
          </Link>
          <Link to={`/books/${BookService.getNearBookId(book.id, -1)}`}>
            prev book
          </Link>
        </div>
      </div>
    );
  }
}
