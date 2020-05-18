import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
// import BuyBtn from "../components/Buy";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
//import Search from './searchbar';

import { SearchList, SearchListItem } from "../components/Results";


function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [results, setResults] = useState([]);


  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    searchFunction();
  }

  function searchFunction() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${formObject.title}&download=epub&key=AIzaSyDBgrZrpEGl_m_cONevbIKuqoY9_RX4pXw`
    )
      .then((response) => response.json())
      .then((data) =>
        setResults(
          { ...results, result: data.items[0].volumeInfo.title + " by " + data.items[0].volumeInfo.authors, resultTwo: data.items[1].volumeInfo.title + " by " + data.items[1].volumeInfo.authors, linkOne: data.items[0].saleInfo.buyLink, linkTwo: data.items[1].saleInfo.buyLink},
          console.log(data.items[0])
        )
      );
    //saveBook();
  }


  function saveResult(id) {
    if (results.result) {
      API.saveBook({
       book: results.result,
      })
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }


    // if (results.resultTwo) {
    //   API.saveBook({
    //    book: results.resultTwo,
    //   })
    //     .then((res) => loadBooks())
    //     .catch((err) => console.log(err));
    // }
    //saveBook()
  }

  function saveResultTwo(id) {
    // if (results.result) {
    //   API.saveBook({
    //    book: results.result,
    //   })
    //     .then((res) => loadBooks())
    //     .catch((err) => console.log(err));
    // }


    if (results.resultTwo) {
      API.saveBook({
       book: results.resultTwo,
      })
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }
    //saveBook()
  }

  


  // function saveBook() {
  
  //   if (results.result) {
  //     API.saveBook({
  //       result: results.result,
  //     })
  //       .then((res) => loadBooks())
  //       .catch((err) => console.log(err));
  //   }
  // }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Search for Books</h1>
          </Jumbotron>

          <form>
          <div class="form-row align-items-center">
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Search by Title"
            />

            <FormBtn disabled={!formObject.title} onClick={handleFormSubmit}>
              Search
            </FormBtn>
            </div>
          </form>
          {/* {results.length ? (
            <SearchList>
              {results.map((effort) => (
                <SearchListItem key={effort._id}>



                    <strong>{effort.result}</strong>
                </SearchListItem>
              ))}
            </SearchList>
          ) : (
            <h3>No Results to Display</h3>
          )} */}

          <SearchList>
            <SearchListItem key={results._id}>
            <strong>{results.result}</strong>
            <SaveBtn onClick={() => saveResult(results._id)} />
            <a to = "URL" href={results.linkOne} target = "_blank">Buy the book</a>
            </SearchListItem>
            <SearchListItem key={results._id}>
            <strong>{results.resultTwo}</strong>
            <SaveBtn onClick={() => saveResultTwo(results._id)} />
            <a to = "URL" href={results.linkTwo} target = "_blank">Buy the book</a>

            
            </SearchListItem>
          </SearchList>


        
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Reading List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((mongo) => (
                <ListItem key={mongo._id}>
                  <Link to={"/books/" + mongo._id}>
                    <strong>{mongo.book}</strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(mongo._id)} />
                  
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}

        </Col>
      </Row>
    </Container>
  );
}

export default Books;
