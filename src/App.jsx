import React, { useState, useEffect } from 'react'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'



function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data:{
            todoList: [
              {id: 1, title: 'Walk the dog'},
              {id: 2, title: 'Do laundry'}
            ]
          }
        })
      }, 2000);
    })

    fetchTodos.then(response => {
      setTodoList(response.data.todoList)
      setIsLoading(false);
    })

  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]) 

  function removeTodo(id) {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }


  return (
    <>
      <h1>To Do List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
        {isLoading ? (
          <p>Loading...</p>) : (
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          )
        }
      
      
      

    </>
  )
}

export default App
