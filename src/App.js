import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
import config from './config';

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT + `/folders`)
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          folders: responseJson
        })
      );

    fetch(config.API_ENDPOINT + `/notes`)
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          notes: responseJson
        })
      );
  }

  handleDeleteFetch = (noteId) => {
    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
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
    fetch(config.API_ENDPOINT + `/folders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: folderName})
    })
  }

  handlePostNote({ name, folderId, content }) {
    fetch(config.API_ENDPOINT + `/notes`, {
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
                <Route path="/folders/:folderId" component={Folder} />
                <Route exact path="/add-folder" component={AddFolder} />
                <Route exact path="/add-note" component={AddNote} />
                <Route path="/notes/:noteId" render={routeProps => <NotePage {...routeProps} />} />
                <div className="clear"></div>
              </main>
          </div>
        </AppContext.Provider>
      )
  }
}

export default App;


