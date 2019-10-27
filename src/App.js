import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Landing, LoggedIn } from './components';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Landing} />
        <Route path="/loggedIn" component={LoggedIn} />
      </div>
    </Router>
  );
}

export default App;
