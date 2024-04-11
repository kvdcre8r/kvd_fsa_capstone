import { useState, useEffect } from "react";
import useToken from "../useToken.js";
import { getAccount, deleteReservation } from "../api.js";

export default function Cart() {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      const fetchReso = async () => {
        const resoRes = await getAccount(token);
        setReservedBooks(resoRes);
      };
      fetchReso();
    }
  }, []);

  return (
    <div className="cart">
      <h2>Cart details:</h2>
      <ul>
        {reservedBooks.map((book) => (
          <li key={book.id}>
            {book.title}{" "}
            <button onClick={() => deleteReservation(book.id, token).then(() => getAccount(token)).then(setReservedBooks)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
