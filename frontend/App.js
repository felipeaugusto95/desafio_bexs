import React, { Component } from 'react';

import GlobalStyle from './styles/global';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Headers from './Components/Header';
import QuestionDetailed from './Components/QuestionDetailed';
import User from './Components/User';


class App extends Component{

  render(){
    return (
      <div>
        <GlobalStyle />
        <Headers />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/questionDetailed/:id" component={QuestionDetailed} />
          <Route path="/usuarios" component={User} />
        </Switch>        
      </div>
    );
  };
}

export default App;
