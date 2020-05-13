import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import Books from './Books';
import BookDetail from './BookDetail';
class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
        this.setState({books:books});
    })
  }

  moveBook = async(event, tempBookUpdate) =>{
    const value = event.target.value;
    const tempBook =tempBookUpdate;
    let bookOnShelf= false;
    

    BooksAPI.update(tempBook, event.target.value).then(res=>{

      this.state.books.find((book, i) => {
        if (book.id === tempBook.id) {
          let stateCopy = Object.assign({}, this.state);
          if(value==="none"){
          var arrayBooks = [...this.state.books];
          arrayBooks.splice(i, 1);
          this.setState({books: arrayBooks});
          }else{
            stateCopy.books[i].shelf = value;
            this.setState(stateCopy);
          }
          bookOnShelf = true;
          return true;
        }
      });

      if(!bookOnShelf){
        tempBook.shelf=value;
        this.setState({
          books:[...this.state.books, tempBook]
        })
      }

    })
  }
 

  render() {
    const {books} = this.state;
    return (
     
      <div className="app">
        <Route exact path="/" render={()=>(<Books books={books} moveBook={this.moveBook} />)} />
        <Route exact path="/search" render={()=>(<SearchPage books={books} moveBook={this.moveBook} />)} />
        <Route exact path="/book/:id" render={(props)=>(<BookDetail books={books} moveBook={this.moveBook} id={props.match.params.id} />)} />
      </div>
    )
  }
}

export default BooksApp
