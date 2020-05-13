import React from 'react'
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

class BookDetail extends React.Component{
    
    render(){
        console.log(this.props.location);
        const {moveBook, id} = this.props;
        const books=this.props.books.filter(bok=>bok.shelf!=='move');
        console.log(books);
        const book = books.find((tempBook, i) => {
            if (tempBook.id === id) {
              return true;
            }
          });
          console.log(book);
        return book===undefined ? ""
        : (<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="bookshelf">
        <Link to="/"><button className="close-search">Close</button></Link>
        <h2 className="bookshelf-title">Book Details</h2>
          <div className="search-books-input-wrapper">
          </div>
        

        <div className="book-detail">
        <div className="books-grid">
        <div className="book-top">
                        <div className="book-cover" style={{ width: 256, height: 386, backgroundImage:` url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select onChange={(event)=>moveBook(event, book)} value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      </div>
                      <div className="book-detail-bottom">
                          <h1>{book.title}</h1>
                      <p><b>Author</b> - 
                    {book.authors.map((author, index)=>(<span key={index} className=""> {author} </span>))}
                    <br></br><span><b>Publisher</b> - {book.publisher}</span>
                    <br/><span><b>Description</b> - {book.description}</span></p>
                    
                      </div>
                      
        </div></div>

        <div className="list-books-content">
          <div>
            <BookShelf heading="Other Books On Shelf" books={books} moveBook={moveBook} allowLink={true}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>)
    }
}

export default BookDetail;