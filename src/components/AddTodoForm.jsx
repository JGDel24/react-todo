import { useState } from 'react'

function AddTodoForm({ onAddTodo }) {
  const [todo, setTodo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (todo) {
      onAddTodo({ title: todo })
      setTodo('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default AddTodoForm
