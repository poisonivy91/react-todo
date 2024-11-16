import * as React from 'react';
import TodoList from './TodoList';
import AddTodoList from './AddTodoForm';
import './App.css';


function App() {
  return(
  <div>
    <h1>Todo List</h1>
    <TodoList /> 
    <AddTodoList /> 
  </div>
  );
}

export default App;

