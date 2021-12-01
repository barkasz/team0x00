
// import Main from './Main'
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import * as actions from '../redux/actions'
// import {withRouter} from 'react-router'
// function mapStateToProps(state) {
//     return {
//         posts: state.posts,
//         comments: state.comments
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(actions, dispatch)

// }

// const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

// export default App

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