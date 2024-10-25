import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const todoList = [
    {id: 1, title: 'cook steak'},
    {id: 2, title: 'clean car'},
    {id: 3, title: 'shop'}
  ];

  return (
    <>
        <h1>To Do List</h1>
        <ul>
         {todoList.map(toDo =>
          <li key={toDo.id}>{toDo.title}</li>
         )}
        </ul>
    </>
  )
}

export default App
