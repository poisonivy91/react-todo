import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Brainstorm ideas for to-do app" },
    { id: 2, title: "Create a list" },
    { id: 3, title: "Complete assignment" },
  ]);

  const addTodo = (title) => {
    const newTodo = { id: todoList.length + 1, title };
    setTodoList([...todoList, newTodo]); // Update the todoList state
  };

  return (
    <div>
      <h1>Todo App</h1>
      {/* Pass the addTodo function as onAddTodo */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* Pass the updated todoList state to TodoList */}
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;


