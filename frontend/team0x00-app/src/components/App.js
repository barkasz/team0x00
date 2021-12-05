import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;