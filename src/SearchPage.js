import React from 'react'
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
class SearchPage extends React.Component{

  state={
    query:'',
    searchResult:[]
  }

updateQuery=(query)=>{
  this.setState({query:query.trim()})
  this.searchBook(query);
  
}

searchBook=(query) =>{
  
  if(query){
    BooksAPI.search(query).then((searchResult)=>{
      if (searchResult.length===20) {
        let stateCopy = searchResult;
        this.props.books.forEach(book => {
          searchResult.forEach((searchBook, i) => {
            if(book.id===searchBook.id && stateCopy[i].shelf){
              stateCopy[i].shelf = book.shelf;
            }
            else if(book.id!==searchBook.id && !stateCopy[i].shelf){
              stateCopy[i].shelf = "move";
            }
          });
        });
        this.setState({...this.state, searchResult:stateCopy});
      } else {
       this.setState({searchResult:[]});
      }
     });
  }else{
    this.setState({searchResult:[]});
  }
  
}

    render(){
        const {moveBook} = this.props;
        const {query, searchResult} = this.state;
        
        return(<div className="search-books">
        <div className="search-books-bar">
       <Link to="/"><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={query}
             onChange={(event)=>this.updateQuery(event.target.value)} 
             />
          </div>
        </div>
        <div className="search-books-results">
          {searchResult.length > 0 && (<BookShelf heading="Search Result" books={searchResult} moveBook={moveBook} allowLink={false}/>)}
          <ol className="books-grid">
          </ol>
        </div>
      </div>)
    }
}

export default SearchPage;