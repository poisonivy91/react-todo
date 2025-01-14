import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate async fetch and load initial data
  React.useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        const savedTodoList = localStorage.getItem("savedTodoList");
        resolve({
          data: {
            todoList: savedTodoList ? JSON.parse(savedTodoList) : [],
          },
        });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false); // Stop loading after fetching
    });
  }, []);

  // Save todoList to localStorage
  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Todo App</h1>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
