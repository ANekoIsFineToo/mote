import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Home from '../Home';
import Note from '../Note';
import NoteAdd from '../NoteAdd';
import NoteEdit from '../NoteEdit';
import Header from '../../components/Header';

import './index.css';

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="App">
        <Helmet titleTemplate="%s / Mote" defaultTitle="Mote" />

        <Header />

        <CSSTransitionGroup
          className="router-group"
          transitionName={{
            enter: 'animated',
            enterActive: 'fadeIn',
            leave: 'animated',
            leaveActive: 'fadeOut',
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          <Switch key={this.props.location.key} location={this.props.location}>
            <Route exact path="/" component={Home} />

            <Route path="/note/add" component={NoteAdd} />
            <Route path="/note/:id/edit" component={NoteEdit} />
            <Route path="/note/:id" component={Note} />
          </Switch>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default withRouter(App);
