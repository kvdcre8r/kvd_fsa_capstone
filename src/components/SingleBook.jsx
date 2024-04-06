import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleBook } from "../api";
import BookPage from "./BookPage";

export default function SingleBook() {
  const { id } = useParams();

  const [book, setBook] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSingleBook() {
      const APIResponse = await fetchSingleBook(id);
      if (APIResponse.error) {
        setError(error.message);
      } else {
        setBook(APIResponse.book);
      }
    }
    getSingleBook()
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <p>{}</p> 
      
      {book && <BookPage book={book} setBook={setBook} />}

    </div>
  );
}