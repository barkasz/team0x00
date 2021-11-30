
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
import Login from './Login/Login';
import useToken from '../hooks/useToken';


function App() {
    const { token, setToken } = useToken();

    if(!token) {
      return <Login setToken={setToken} />
    }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Main />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;