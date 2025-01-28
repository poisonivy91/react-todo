import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = React.useState([]);
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
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if(isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addtodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removetodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <BrowserRouter>
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
                  <AddTodoForm onAddTodo={addtodo} />
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
    </BrowserRouter>
  );
}


export default App;