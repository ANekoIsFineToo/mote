import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import Home from '../Home';
import Header from '../../components/Header';

import './index.css';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <Helmet titleTemplate="%s / Mote" defaultTitle="Mote" />

        <Header />

        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
