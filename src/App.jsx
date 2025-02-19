import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import PropTypes from 'prop-types';
import './components/App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setTodoList(
          data.records.map((record) => ({
            id: record.id,
            title: record.fields.title,
          }))
        );
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    if (!todo.title) {
      console.error('Todo title is required');
      return;
    }
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              title: todo.title,
              completedAt: null,
            },
          }),
        }
      );
      const data = await response.json();
      if (data.id) {
        setTodoList((prevList) => [
          ...prevList,
          { id: data.id, title: data.fields.title },
        ]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        }
      );
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Todo List</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </div>
            }
          />
          <Route
            path="/todos"
            element={
              <div>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

App.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default App;
