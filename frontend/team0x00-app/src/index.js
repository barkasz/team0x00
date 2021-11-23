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
