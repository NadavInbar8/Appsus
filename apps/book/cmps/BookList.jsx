import { BookPreview } from '../cmps/BookPreview.jsx';

export function BookList({ books }) {
  console.log(books);

  return (
    <div className='book-list'>
      {books.map((book, idx) => {
        return <BookPreview key={book.id} book={book} />;
      })}
    </div>
  );
}
