import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class BookShelf extends React.Component{
  static propTypes={
    allowLink:PropTypes.bool,
    books:PropTypes.array.isRequired,
    heading:PropTypes.string.isRequired
  }
    render(){
        const {books, heading, moveBook, allowLink} = this.props;
        return(<div className="bookshelf">
                  <h2 className="bookshelf-title">{heading}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                    books.map((book, index)=>{
                  return (book.imageLinks && book.title && book.authors)
                  ?(
                    <li key={index}>
                    <div className="book">
                      <div className="book-top">
                      {
                        allowLink ? (<Link className="text-link" to={`/book/${book.id}`}>
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:` url(${book.imageLinks.thumbnail})` }}></div></Link>)
                        : (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:` url(${book.imageLinks.thumbnail})` }}></div>)
                      }
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
                      {
                        allowLink ? (<Link className="text-link" to={`/book/${book.id}`} ><div className="book-title">{book.title}</div></Link>)
                        : (<div className="book-title">{book.title}</div>)
                      }
                    
                    {book.authors.map((author, index)=>(<div key={index} className="book-authors">{author}</div>))}
                    </div>
                  </li>) 
                  : ""
                      })
                    }
                    </ol>
                  </div>
                </div>)
    }
}

export default BookShelf;