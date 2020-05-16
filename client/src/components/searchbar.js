import React, {Component, useState, useEffect} from 'react';
//import queryString from 'query-string';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'name',
    text: 'Product Name'
  }, {
    dataField: 'price',
    text: 'Product Price',
    filter: textFilter() // apply text filter
  }];




class Search extends Component{
 //AIzaSyDBgrZrpEGl_m_cONevbIKuqoY9_RX4pXw
 //GET https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=yourAPIKey
  //     .then(data => this.setState({serverData: {user: {name: data.display_name}}}, console.log(data)))
//   state = {
//     query: '',
//     data: [],
// }

constructor(props) {
    super(props);
    //this.state = {value: ''};
    //this.state = {bookData: ''};
    this.state = {
        results: [],
        resultsTwo: [],
        resultsThree: [],
        value: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


// state = {
//     query: '',
//     results: []
// }

  handleChange(event) {
    this.setState({value: event.target.value});
    
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();

    this.componentDidMount()
  }

  
componentDidMount() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.value}&download=epub&key=AIzaSyDBgrZrpEGl_m_cONevbIKuqoY9_RX4pXw`).then((response) =>
    response.json()
  )
  .then(data => this.setState({results: data.items[0].volumeInfo.title, resultsTwo: data.items[1].volumeInfo.title, resultsThree: data.items[2].volumeInfo.title}, console.log(data.items[0].volumeInfo.title)))
      }
      
      handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.componentDidMount()
            }
          } 
        })
    }
      




render() {
return(
<div>

<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input placeholder="Search for..." type="text" ref={input => this.search = input} value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* <Search search={search} /> */}
{/* <form onSubmit={this.handleSubmit}>
         <label htmlFor="username">Search for Books</label>
         <input
           type="text"
           name="username"
           onChange={this.changeText.bind(this, 'currentText')}
         />
         <button onClick = {this.changeText.bind(this, 'currentText')}>Search!</button>
       </form> */}
       <div>
           {/* <p>Hey {this.state.value}</p>
           <p>Hello {this.totalReactPackages}</p> */}
           <p>{this.state.results}</p>
           <p>{this.state.resultsTwo}</p>
           <p>{this.state.resultsThree}</p>
       </div>

       {/* <BootstrapTable keyField='id' data={ results } columns={ columns } filter={ filterFactory() } /> */}

</div>
)

}}
export default Search;