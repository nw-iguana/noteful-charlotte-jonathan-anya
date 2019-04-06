import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Folder from './Components/Folder';
import AddFolder from './Components/AddFolder';
import Main from './Components/Main';
import NotePage from './Components/NotePage';
import AddNote from './Components/AddNote';
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

  handlePostFolder(event, folderName) {
    // if (isClicked) {
    //   this.setState({ redirect: true });
    // }
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: folderName})
    })
  }

  handlePostNote(event, {name, folderId, content}) {
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modified: new Date(),
        name,
        folderId,
        content
      })
    })
  }

  render() {
    const context = {
      folders: this.state.folders,
      notes: this.state.notes,
      handleDeleteFetch: this.handleDeleteFetch,
      handleDelete: this.handleDelete,
      handlePostFolder: this.handlePostFolder,
      handlePostNote: this.handlePostNote
    }

    return (
      <AppContext.Provider value={(context)}>
        <div className="App">
          <Route component={Header} />
          <Route component={Nav} />
          <section className="app-content">
            <main>
              <Route exact path="/" component={Main} />
              <Route path="/folder/:folderId" component={Folder} />

              <Route exact path="/add-folder" component={AddFolder} />

              <Route exact path="/add-note" component={AddNote} />
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
