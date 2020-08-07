import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter ,Switch, Route} from 'react-router-dom';
import AboutComponent from "./about-page/AboutComponent";

ReactDOM.render(
  <React.StrictMode>
      <>
          <BrowserRouter>
               <App/>
          </BrowserRouter>

      </>
  </React.StrictMode>,
  document.getElementById('root')
);


// If  y ou want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
