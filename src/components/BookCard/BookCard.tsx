import { useContext } from 'react';
import { Ibook } from '../../types/Ibook';
import { formatDate } from '../../utils/utils';
import './BookCard.scss';
import { BooksContext } from '../../context/BooksContext';
import { useNavigate } from 'react-router-dom';
interface Props {
  books: Ibook[];
}
export const BookCard: React.FC<Props> = (props) => {
  const { books } = props;
  const booksContext = useContext(BooksContext);

  const { removeBook } = booksContext!;

  const navigate = useNavigate();
  return (
    <div className="book-card">
      {books.map((book) => (
        <div key={book.id} className="book-card__item">
          <h2>Title:{book.title}</h2>
          <p className="book-card__item__text">Author: {book.author}</p>
          <p className="book-card__item__text">Category: {book.category}</p>
          <p className="book-card__item__text">ISBN: {book.isbn}</p>
          <p className="book-card__item__text">Created at: {formatDate(book.created)}</p>
          <p className="book-card__item__text">Modified at: {formatDate(book.modified!) || '--'}</p>
          <p className="book-card__item--actions">Actions</p>
          <div className="book-card__buttons">
            <button className="book-card__button book-card__button--toggle">
              {book.isActive ? 'Deactivate' : 'Re-Activate'}
            </button>
            <button
              className="book-card__button book-card__button--edit"
              onClick={() => {
                navigate(`/book/edit/${book.id}`);
              }}
            >
              Edit
            </button>
            <button
              className={`book-table__button book-table__button--delete ${book.isActive ? 'disabled' : ''}`}
              onClick={() => removeBook(book.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
