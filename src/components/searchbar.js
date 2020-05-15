import React, {Component} from 'react';
//import queryString from 'query-string';
import ReactDOM from 'react-dom';


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
    this.state = {
      initialState: "Search for movies, shows, actors, etc...",
      currentText: " "
    }
  }
handleInputChange = () => {
    this.setState({
        query: this.search.value
    })
    this.filterArray();
}


      componentDidMount() {
        fetch('https://www.googleapis.com/books/v1/volumes?q=peace+intitle:war&download=epub&key=AIzaSyDBgrZrpEGl_m_cONevbIKuqoY9_RX4pXw').then((response) =>
       response.json()
     )
     .then(currentText => this.setState({currentText}))
      }
render() {
return(
<div>

<form>
         <label htmlFor="username">Search for Books</label>
         <input
           type="text"
           name="username"
           onChange={this.changeText.bind(this, 'currentText')}
         />
         <button onClick = {this.changeText.bind(this, 'currentText')}>Search!</button>
       </form>

</div>
)

}}
export default Search;