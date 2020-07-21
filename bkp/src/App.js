import React from 'react';
import './App.css';
import Alert from 'react-s-alert';
import Childhood from './components/Childhood/Childhood';


// mandatory
import 'react-s-alert/dist/s-alert-default.css';

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Findme(){
    return (
      <div className="App">
      <section className="pt-2 bg-dark inner-header text-white">
        <h5 className="mb-1">Find by Childhood Photo</h5>
        <p className="p-3 h6 small">Please answer the Online Quiz below. You have only one attempt to take the Online Quiz test. </p>
      </section>
      <Childhood />
      <Alert stack={{limit: 3}} />
      </div>
    )
}

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/findme/:questionid" exact component={Findme} />
      </Switch>
    </Router>
  );
}

export default App;
