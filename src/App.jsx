import React, { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const apiToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const tableName = import.meta.env.VITE_TABLE_NAME;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableName}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      const data = await response.json();

      if (!data.records) throw new Error('No records found');

      const filteredData = data.records.filter(record => record.fields?.title);
      const sortedData = filteredData.sort((a, b) =>
        a.fields.title.localeCompare(b.fields.title)
      );

      setTodoList(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({
            fields: { title: title },
          }),
        }
      );
      const newTodo = await response.json();

      if (newTodo.id) {
        setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableName}/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      setTodoList((prevTodoList) => prevTodoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div>
      <h1>{tableName}</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </div>
  );
}

export default App;
