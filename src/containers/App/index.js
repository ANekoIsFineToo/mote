import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Note from '../Note';
import NoteAdd from '../NoteAdd';
import Header from '../../components/Header';

import './index.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Helmet titleTemplate="%s / Mote" defaultTitle="Mote" />

        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/note/add" component={NoteAdd} />
          <Route path="/note/:id" component={Note} />
        </Switch>
      </div>
    );
  }
}

export default App;
