import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav';
import Folder from './Components/Folder';
import Main from './Components/Main';
import NotePage from './Components/NotePage';
import dummyStore from './dummy-store';
import AppContext from './AppContext'


// why doesn't this work here if it's a global variable?
// const AppContext = React.createContext();

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
      <AppContext.Provider value={this.state}>
        <div className="App">
          <header>
            <Link to="/"><h1>Noteful</h1></Link>
          </header>
          <Nav />
          <section className="app-content">
            <main>
                <Route
                  exact path="/"
                  render={routeProps => <Main {...routeProps} />}
                />
                <Route
                  path="/folder/:folderId"
                  render={routeProps => <Folder {...routeProps} />}
                />
                <Route
                  path="/note/:noteId"
                  render={routeProps => <NotePage {...routeProps} />}
                />
            </main>
          </section>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
