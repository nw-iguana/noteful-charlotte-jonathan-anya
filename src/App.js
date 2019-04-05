import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Folder from './Components/Folder';
import AddFolder from './Components/AddFolder';
import Main from './Components/Main';
import NotePage from './Components/NotePage';
import AppContext from './AppContext';

// why doesn't this work here if it's a global variable?
// const AppContext = React.createContext();

class App extends Component {
  state = {
    folders: [],
    notes: [],
    redirect: null
  }

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

  handleDeleteFetch = (id, isClicked) => {
    if (isClicked) {
      this.setState({ redirect: true });
    }
    const url = `http://localhost:9090/notes/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(() => this.handleDelete(id));
  };

  handleDelete = id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  handlePostFetch(event, folderName) {
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: folderName})
    })
      // .then(response => response.json())
  }

  render() {
    const context = {
      folders: this.state.folders,
      notes: this.state.notes,
      handleDeleteFetch: this.handleDeleteFetch,
      handleDelete: this.handleDelete,
      handlePostFetch: this.handlePostFetch
    }

    return (
      <AppContext.Provider value={(context)}>
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
              <Route path="/addfolder" component={AddFolder} />
              <Route
                path="/note/:noteId"
                render={routeProps =>
                  this.state.redirect ? <Redirect to="/" /> : <NotePage {...routeProps} />}
              />
            </main>
          </section>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
