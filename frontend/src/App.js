import React from 'react';
import { Swith, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import TodosList from './components/todos-list';
import AddTodo from './components/add-todo';
import Login from './components/login';
import Signup from './components/signup';

import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
