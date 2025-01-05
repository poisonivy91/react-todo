import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Async Fetching
  React.useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: [
              { id: 1, title: "Brainstorm ideas for to-do app" },
              { id: 2, title: "Create a list" },
              { id: 3, title: "Complete assignment" },
            ],
          },
        });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList); // Update todoList state with fetched data
      setIsLoading(false); // Stop loading
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

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Todo App</h1>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} />
        </>
      )}
    </>
  );
}

export default App;




