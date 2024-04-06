import bookLogo from './assets/book-buddy-logo-2.png'

export default function BrandLogo() {
    return (
        <img id='logo-image'
            src={bookLogo}
            style={{ width: 110, margin: 10 }}
            alt="image of map marker reading a book with a letter b on each cover"
        />
    )
}