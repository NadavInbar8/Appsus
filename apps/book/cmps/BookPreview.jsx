const { Link } = ReactRouterDOM;
export function BookPreview({ book }) {
  function getMoneySymbol(book) {
    var symbol = '';
    switch (book.listPrice.currencyCode) {
      case 'USD':
        symbol = '$' + book.listPrice.amount;
        break;
      case 'EUR':
        symbol = book.listPrice.amount + 'Є';
        break;
      case 'ILS':
        symbol = book.listPrice.amount + '₪';
        break;
    }
    return symbol;
  }
  return (
    <Link className='clean-link' to={`/books/${book.id}`}>
      <article onClick={() => {}} className='book-preview'>
        <h4>book name: {book.title}</h4>
        <h4>price: {getMoneySymbol(book)}</h4>
        <img src={book.thumbnail} alt='' />
      </article>
    </Link>
  );
}
