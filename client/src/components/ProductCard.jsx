import { useEffect } from "react";
import { checkoutBook } from "../api";
import useToken from "../useToken";


export default function ProductCard({ book, setProduct }) {
  const [token] = useToken();

  return (
    <div>
      <figure>
        <img
          src={book.coverimage}
          alt="A pic of a book's cover photo"
          height={300}
        />
        <figcaption>
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
        </figcaption>
      </figure>
      {book.available && (
        <button onClick={() => checkoutBook(book.id, token).then(setProduct)}>
          CHECKOUT
        </button>
      )}
      {/* checkout button here */}
      {/* <button onClick={handleDelete}>Delete Player</button> */}
    </div>
  );
}
