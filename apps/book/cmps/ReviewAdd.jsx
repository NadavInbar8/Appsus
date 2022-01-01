import { BookService } from '../services/book.service.js';
import { Reviews } from '../cmps/Reviews.jsx';
import { eventBusService } from '../services/event-bus.service.js';

export class ReviewAdd extends React.Component {
  state = {
    reviewsToShow: '',
    review: {
      readerName: '',
      reviewText: '',
      rate: '',
      date: '',
    },
  };

  componentDidMount() {
    this.setState({ reviewsToShow: this.getReviewsToShow() });
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'select-one' ? +target.value : target.value;
    this.setState((prevState) => ({
      review: { ...prevState.review, [field]: value },
    }));
  };
  getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  };

  saveReview = (ev) => {
    ev.preventDefault();
    let { review } = this.state;
    if (review.date === '') review.date = this.getTodaysDate();
    console.log(review);
    let { bookId } = this.props;
    BookService.addReview(bookId, review);
    this.setState({
      review: { readerName: '', reviewText: '', rate: '', date: '' },
      reviewsToShow: this.getReviewsToShow(),
    });
    this.props.loadBook();
    eventBusService.emit('user-msg', {
      text: 'great you added a review',
      type: 'happy active',
    });
  };

  getReviewsToShow = () => {
    let { bookId } = this.props;
    const reviews = BookService.getBookReviews(bookId);
    return reviews;
  };

  convertNumToStars = (num) => {
    var str = '⭐';
    for (var i = 0; i < num; i++) {
      str += '⭐';
    }
    return str;
  };

  deleteReview = (reviewId, bookId) => {
    console.log('reviewId', reviewId);
    console.log('bookId', bookId);
    BookService.deleteReview(reviewId, bookId);
    this.setState(
      { reviewsToShow: this.getReviewsToShow() },
      eventBusService.emit('user-msg', {
        text: `youve deleted a review  `,
        link: '',
        type: 'sad ',
      })
    );
  };

  render() {
    const {
      review: { readerName, reviewText, rate, date },
    } = this.state;
    return (
      <div className='review-add'>
        <div className='review-inputs'>
          <h1>Add A review</h1>
          <hr />
          <form onSubmit={this.saveReview}>
            <label htmlFor='reader-name'>name:</label>
            <input
              className='name-input'
              value={readerName}
              onChange={this.handleChange}
              id='reader-name'
              name='readerName'
              type='text'
            />

            <label htmlFor='review-text'>write a review:</label>
            <textarea
              value={reviewText}
              onChange={this.handleChange}
              type='text-area'
              placeholder='write some thoughts about the book'
              name='reviewText'
              id='review-text'
            />

            <label htmlFor='rate'>Rate:</label>
            <select
              value={rate}
              onChange={this.handleChange}
              name='rate'
              id='rate'
            >
              <option type='number' value='1'>
                ⭐
              </option>
              <option type='number' value='2'>
                ⭐⭐
              </option>
              <option type='number' value='3'>
                ⭐⭐⭐
              </option>
              <option type='number' value='4'>
                ⭐⭐⭐⭐
              </option>
              <option type='number' value='5'>
                ⭐⭐⭐⭐⭐
              </option>
            </select>

            <label htmlFor='date'>Date</label>
            <input
              value={date}
              onChange={this.handleChange}
              type='date'
              id='date'
              name='date'
            />
            <button type='submit'>submit</button>
          </form>
        </div>
        {this.state.reviewsToShow && (
          <div className='reviews'>
            {this.state.reviewsToShow.map((review) => {
              return (
                <div className='review' key={review.id}>
                  <div className='review-content'>
                    <h2>review by :{review.readerName}</h2>
                    <p>
                      <b>review content:</b>
                      {review.reviewText}
                    </p>
                    <p>
                      <b>rate:</b>
                      {this.convertNumToStars(review.rate)}
                    </p>
                    <p>
                      <b>written on :</b>
                      {review.date}
                    </p>
                    <button
                      onClick={() => {
                        this.deleteReview(review.id, this.props.bookId);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
