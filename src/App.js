import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Folder from './Components/Folder';
import Main from './Components/Main';
import NotePage from './Components/NotePage';
// import dummyStore from './dummy-store';
import AppContext from './AppContext';

// why doesn't this work here if it's a global variable?
// const AppContext = React.createContext();

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          folders: responseJson
        })
      );

    fetch('http://localhost:9090/notes')
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          notes: responseJson
        })
      );
  }

  handleDelete = id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={Object.assign({}, this.state, {
          handleDelete: this.handleDelete
        })}
      >
        <div className="App">
          <header>
            <Link to="/">
              <h1>Noteful</h1>
            </Link>
          </header>
          <Nav />
          <section className="app-content">
            <main>
              <Route exact path="/" component={Main} />
              <Route path="/folder/:folderId" component={Folder} />
              <Route path="/note/:noteId" component={NotePage} />
            </main>
          </section>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
