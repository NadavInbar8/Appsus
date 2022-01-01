export class BookFilter extends React.Component {
  state = {
    filterBy: {
      bookName: '',
      minPrice: '',
      maxPrice: '',
    },
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  render() {
    const {
      filterBy: { bookName, minPrice, maxPrice },
    } = this.state;
    return (
      <form className='book-filter'>
        <div className='input'>
          <label htmlFor='by-bookName'>By Name:</label>
          <input
            placeholder='Enter book name'
            type='text'
            id='by-bookName'
            name='bookName'
            value={bookName}
            onChange={this.handleChange}
          />
        </div>
        <div className='input'>
          <label htmlFor='by-min-price'>Min Price:</label>
          <input
            placeholder='Enter price'
            type='number'
            min='0'
            id='by-min-price'
            name='minPrice'
            value={minPrice}
            onChange={this.handleChange}
          />
        </div>
        <div className='input'>
          <label htmlFor='by-max-price'>Max Price:</label>
          <input
            placeholder='Enter price'
            type='number'
            min='0'
            id='by-max-price'
            name='maxPrice'
            value={maxPrice}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
