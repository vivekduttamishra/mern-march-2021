import React from 'react';
import './App.css';
import AppHeader from './components/header-component';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';


function App() {
  return (
    
      <Router>
        <div className="App">
          <AppHeader title='My App' />
          <Switch>
            {routes.map(route => (
              <Route key={route.path}
                path={route.path} exact={route.exact || false}
                component={route.component} />
            ))}
          </Switch>
        </div>

      </Router>
    

  );
}

export default App;
