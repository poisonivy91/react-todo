import React from "react";

function AddTodoForm({ onAddTodo }) {
  const handleAddTodo = (event) => {
    event.preventDefault(); 
    const todoTitle = event.target.title.value; 
    if (todoTitle.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }
    onAddTodo(todoTitle); 
    event.target.reset(); 
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;

