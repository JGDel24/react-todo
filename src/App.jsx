import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddTodoForm from "./components/AddTodoForm";
import InputWithLabel from "./components/InputWithLabel";
import TodoList from "./components/TodoList";
import TodoListItem from "./components/TodoListItem";


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
  
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      
      const sortedTodos = data.records.sort((a, b) => {
        const titleA = a.fields.title.toLowerCase();
        const titleB = b.fields.title.toLowerCase();
  
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
  
      
      const todos = sortedTodos.map(record => ({
        title: record.fields.title,
        id: record.id,
      }));
  
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function removeTodo(id) {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>To-Do List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route path='/new'
          element={<h1>New Todo List</h1>}
        />
      </Routes>
    </BrowserRouter>
  ); 
  
}

export default App;
