import React, {Component} from 'react';

//import queryString from 'query-string';
// import ReactDOM from 'react-dom';
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// const columns = [{
//     dataField: 'id',
//     text: 'Product ID'
//   }, {
//     dataField: 'name',
//     text: 'Product Name'
//   }, {
//     dataField: 'price',
//     text: 'Product Price',
//     filter: textFilter() // apply text filter
//   }];




class Search extends Component{
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


  handleChange(event) {
    this.setState({value: event.target.value});
    
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();

     this.searchFunction();
     

  }

  searchFunction() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.value}&download=epub&key=AIzaSyDBgrZrpEGl_m_cONevbIKuqoY9_RX4pXw`).then((response) =>
    response.json()
  )
  .then(data => this.setState({results: data.items[0].volumeInfo.title}, console.log(data.items[0])))
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
      
       <div>
          
           <p>{this.state.results}</p>
           <p></p>
           <p></p>
       </div>

       

</div>
)

}}
export default Search;