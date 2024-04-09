import {useEffect} from "react";
import { checkoutBook } from "../api";
import useToken from "../useToken";

// import { useNavigate } from "react-router-dom";
// import { deletePlayer } from "../api";

export default function ProductCard({ book, setBook }) {
//   const navigate = useNavigate();
const [token] = useToken();



//   async function handleDelete() {
//     try {
//       const result = await deletePlayer(player.id);
//       console.log(result);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   }

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
      {book.available && <button onClick={() => checkoutBook(book.id,token).then(setBook)}>CHECKOUT</button>}
      {/* checkout button here */}
      {/* <button onClick={handleDelete}>Delete Player</button> */}
    </div>
  );
}