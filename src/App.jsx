import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
  
  const [todoList, setTodoList] = useState([]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }


  return (
    <>
      <h1>To Do List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      
      <TodoList todoList={todoList}/>

    </>
  )
}

export default App
