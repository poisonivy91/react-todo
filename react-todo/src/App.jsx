import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";


function useSemiPersistentState(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];

}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);
  

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); 
  };

  return (
    <>
      <h1>Todo App</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;



