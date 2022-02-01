import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route ,BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import Pets from './components/Pets/Pets';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);
