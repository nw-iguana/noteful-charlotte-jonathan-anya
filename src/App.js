import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav';
import Folder from './Components/Folder';
import Main from './Components/Main';
import NotePage from './Components/NotePage';
import dummyStore from './dummy-store'

class App extends Component {
  state = {
    folders: [],
    notes: []
   }

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600)
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link to="/"><h1>Noteful</h1></Link>
        </header>
        <Nav state={this.state} />
        <section className="app-content">
          <main>
              <Route
                exact path="/"
                render={routeProps =>
                  <Main notes={this.state.notes} {...routeProps} />}
              />
              <Route
                path="/folder/:folderId"
                render={routeProps =>
                  <Folder props={this.state} {...routeProps} />}
              />
              <Route
                path="/note/:noteId"
                render={routeProps =>
                  <NotePage props={this.state} {...routeProps} />}
              />
          </main>
        </section>
      </div>
    );
  }
}

export default App;
