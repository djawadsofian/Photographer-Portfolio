import React from 'react';
import Header from './components/Header';
import AnimRouters from './components/AnimRoutes';
import {BrowserRouter as Router} from 'react-router-dom';
import { motion } from 'framer-motion';

const App = () => {
  return <>
  <Router>
    <Header/>
    <AnimRouters/>
  </Router>
  </>;
};

export default App;
