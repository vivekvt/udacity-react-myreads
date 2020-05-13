import React from 'react'
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

class Books extends React.Component{
    render(){
        const {books, moveBook} = this.props;
        let currentlyReadingBooks, wantToReadBooks , readBooks;
        if(books[0]){
            currentlyReadingBooks = books.filter((book)=>book.shelf==='currentlyReading');
            wantToReadBooks = books.filter((book)=>book.shelf==='wantToRead');
            readBooks = books.filter((book)=>book.shelf==='read');
        }else{
            currentlyReadingBooks = wantToReadBooks = readBooks = books;
        }

        return(<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf heading="Currently Reading" books={currentlyReadingBooks} moveBook={moveBook} allowLink={true}/>
            <BookShelf heading="Want to Read" books={wantToReadBooks} moveBook={moveBook} allowLink={true}/>
            <BookShelf heading="Read" books={readBooks} moveBook={moveBook} allowLink={true}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>)
    }
}

export default Books;