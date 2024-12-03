import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]); // Start with an empty list

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); // Add the new todo to the list
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;



