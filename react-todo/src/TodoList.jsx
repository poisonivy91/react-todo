import React from "react";
import TodoListItem from "./TodoListItem";


const todolist = [
  {id: 1, title:"Brain storm ideas for to do app"},
  {id: 2, title: "Create a list"},
  {id: 3, title: "Complete assignment"}
];


  function TodoList(){
    return (
      <ul>
        {todolist.map((item) => (
          <TodoListItem key={item.id} todo={item} />
        ))}
      </ul>
    );
  }
 

export default TodoList;