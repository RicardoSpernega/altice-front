import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ListForm from './pages/ListForm/index'

ReactDOM.render(
  <React.StrictMode>
    <ListForm/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
