import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from '../api.js'
import styles from './style.module.css';

export default function Books() {

    const [books, setBooks ] = useState([]);

    useEffect(() => {
        const getAllBooks = async () => {
            const bookResponse = await getBooks()
            console.log({ bookResponse }, 'FROM WITHIN USEEFFECT')
            setBooks(bookResponse);
        }
        getAllBooks();
    }, [])


    return (
        <div className="books">
            <h2 className={styles.h2style}>Browse Library:</h2>
            {books.map((book) =>
                (<h3 key={book.title} author={book.author}> {book.title} by {book.author}
                <Link to={`${book.id}`} className={styles.linkstyle}>details</Link>
                </h3>)
            )}

        </div>
    )
}