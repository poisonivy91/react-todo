import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import styles from './components/App.module.css';


function App() {
  const [todoList, setTodoList] = React.useState(() => {
    const savedTodos = localStorage.getItem('savedTodoList');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isLoading, setIsLoading] = React.useState(true);
  

  const fetchData = async () => {
    console.log("Table name:", import.meta.env.VITE_TABLE_NAME);
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data)

      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));

      console.log("Processed Todos:", todos);

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  React.useEffect(() => {
    const savedTodos = localStorage.getItem("savedTodoList");
  
    if (!savedTodos) {
      fetchData();
    } else {
      setTodoList(JSON.parse(savedTodos));
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!isLoading && todoList.length > 0) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removetodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <BrowserRouter>
    <div className={styles.Container}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h1>Cosmic Obligations</h1>
                  <AddTodoForm onAddTodo={addTodo} />
                  <TodoList todoList={todoList} onRemoveTodo={removetodo} />
                </>
              )}
            </>
          }
        />
        <Route
        path="/new"
        element={
          <h1>New To Do List</h1>
        }
        />
      </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;