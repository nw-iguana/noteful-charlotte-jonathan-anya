import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import AppContext from './AppContext';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Folder from './Components/Folder';
import AddFolder from './Components/AddFolder';
import Main from './Components/Main';
import NotePage from './Components/NotePage';
import AddNote from './Components/AddNote';

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

  handleDeleteFetch = (noteId, isClicked) => {
    // the problem here is that once the delete button is clicked, 'redirect' will be set to 'true', and you will no longer be able to click on individual notes, because it will then always redirect to the main page.

    // we could always just stop setting the state altogether, but then we have to find another way to redirect to the main page if the user clicks on the delete button on the note page.
    if (isClicked) {
      this.setState({ redirect: true });
    }

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(this.handleDelete(noteId));
  }

  handleDelete(id) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  handlePostFolder(folderName) {
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: folderName})
    })
  }

  handlePostNote({ name, folderId, content }) {
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
              <main className="app-content">
                <ErrorBoundary>
                  <Route exact path="/" component={Main} />
                </ErrorBoundary>
                <Route path="/folder/:folderId" component={Folder} />
                <Route exact path="/add-folder" component={AddFolder} />
                <Route exact path="/add-note" component={AddNote} />
                <Route path="/note/:noteId" render={routeProps => this.state.redirect ? <Redirect to="/" /> : <NotePage {...routeProps} />} />
                <div className="clear"></div>
              </main>
          </div>
        </AppContext.Provider>
      )
  }
}

export default App;


