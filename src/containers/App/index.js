import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home';
import Header from '../../components/Header';

import './index.css';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <Header />

        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
