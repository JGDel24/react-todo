import React, { useState, useEffect } from 'react'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem('savedTodoList');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));

  }, [todoList]);

  return [todoList, setTodoList]
}

function App() {

  function removeTodo(id) {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }

  const [todoList, setTodoList] = useSemiPersistentState();
 
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }


  return (
    <>
      <h1>To Do List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />

    </>
  )
}

export default App
