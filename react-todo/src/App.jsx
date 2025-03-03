import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import styles from './App.module.css';

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

  
=======
  const [sortOrder, setSortOrder] = React.useState("asc");

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => {
      const newOrder = prevSortOrder === "asc" ? "desc" : "asc";

      // Sort existing todoList instead of fetching again
      setTodoList((prevList) =>
        [...prevList].sort((a, b) =>
          newOrder === "asc"
            ? new Date(a.createdTime) - new Date(b.createdTime)
            : new Date(b.createdTime) - new Date(a.createdTime)
        )
      );

      return newOrder;
    });
  };


  const fetchData = async () => {
    console.log("Table name:", import.meta.env.VITE_TABLE_NAME);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;

    try {
      console.log("URL:", url);
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Fetch Error:", errorBody);
        throw new Error(`Error: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();

      console.log("Fetched Data:", data)

      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));


      if (!data.records || !Array.isArray(data.records)) {
        console.error("Unexpected API Response:", data);
        return;
      }

      console.log("Fetched Records:", data.records);

      const todos = data.records
        .filter((record) => record.fields && record.fields.title)
        .map((record) => ({
          title: record.fields.title.trim() || "Untitled",
          id: String(record.id),
          createdTime: record.createdTime,
        }));

      // Sort only once after fetching
      todos.sort((a, b) => {
        return sortOrder === "asc"
          ? new Date(a.createdTime) - new Date(b.createdTime)
          : new Date(b.createdTime) - new Date(a.createdTime);
      });


      console.log("Processed Todos:", todos);

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error.message);
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


    fetchData();

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


    if (!newTodo || !newTodo.title) {
      console.error("Invalid todo item:", newTodo);
      return;
    }

    const updatedTodoList = [...todoList, {
      title: newTodo.title.trim(),
      id: String(newTodo.id),
      createdTime: new Date().toISOString(),
    }];

    // Added sorting, searching, and pagination improvements

    updatedTodoList.sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.createdTime) - new Date(b.createdTime)
        : new Date(b.createdTime) - new Date(a.createdTime);
    });

    setTodoList(updatedTodoList);
  };

  const removetodo = (id) => {

    setTodoList(todoList.filter((todo) => todo.id !== id));

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
        <div className={styles.Container}>
        <button onClick={toggleSortOrder}>
          Sort by Date: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
        </button>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <h1>To Do App</h1>
                    <AddTodoForm onAddTodo={addTodo} />
                    <TodoList todoList={todoList} onRemoveTodo={removetodo} />
                  </>
                )}
              </>
            }
          />
          <Route path="/new" element={<h1>New To Do List</h1>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
