import React, {Component} from 'react';
import {CardList} from './components/card-list/card-list.component'
import {SearchBox} from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super(); 
    /*super() calls the constructor method onto the components class which
    *gives access to this.state which exists on class App and can be set
    */
    this.state =  {
      monsters: [], // updated on mount with users from fetch request
      searchField: ''
    };
    // .bind() is a method on any function which returns a new function where the context of 'thius' is set to what is passed to it
    this.handleChange = this.handleChange.bind(this);

  }

  /*
    componentDidMount fetches from a URL which converts the response into a usable .json format 
    then it takes users from the URL and sets monsters to users
  */
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json()) //Gives the response object in json format
    .then (users => this.setState({monsters: users}))
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value})
    };

  render() {
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase()))

    return(
    <div className="App">
      <h1>Monsters Rolodex</h1>
        <SearchBox 
        placeholder = 'search monsters'
        handleChange = {this.handleChange}
        />
      <CardList monsters = {filteredMonsters}> </CardList> 
    </div> // Map generates list of h1's and passes it through as children for the card-list component
    )
  }
}

export default App;
