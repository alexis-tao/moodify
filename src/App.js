import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Landing } from './components';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Landing} />
      </div>
    </Router>
  );
}

export default App;
