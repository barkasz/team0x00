import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import './styles/stylesheet.css'

import {Provider} from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './redux/reducer';


const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Route, BrowserRouter } from 'react-router-dom';
// import { CookiesProvider } from 'react-cookie';
// import Login from './components/Login/Login';
// import App from './components/App';

// function Router(){

//   return (
//     <React.StrictMode>
//       <CookiesProvider>
//         <BrowserRouter>
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/" component={App} />
//         </BrowserRouter>
//       </CookiesProvider>
//     </React.StrictMode>
//   )
// }

// ReactDOM.render(<Router />, document.getElementById('root'));