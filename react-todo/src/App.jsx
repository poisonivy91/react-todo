import * as React from 'react';

const todolist = [
  {id: 1, title:"Brain storm ideas for to do app"},
  {id: 2, title: "Create a list"},
  {id: 3, title: "Complete assignment"}
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todolist.map((item) => (
        <li key={item.id}>{item.title}</li>))}
      </ul>
    </div>
  );
}

export default App;