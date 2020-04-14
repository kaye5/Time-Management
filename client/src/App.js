import React from 'react';
import Navbar from './layout/Navbar/Navbar';
import ScrollRestoration from './Routes/ScrollRestoration'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import axios from "axios";
import MainRoute from './Routes/MainRoute';
axios.defaults.baseURL = 'http://localhost:9000/api'
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <ScrollRestoration />
      <div className='container p-4'>
        <MainRoute/>
      </div>
      </Router>
    </div>
  );
}

export default App;
