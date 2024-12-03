import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value); // Update the input value
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }
    onAddTodo({ title: todoTitle, id: Date.now() }); // Pass a new todo object
    setTodoTitle(""); // Clear the input field
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;


