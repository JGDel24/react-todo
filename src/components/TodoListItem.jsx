function TodoListItem({ todo }) {
  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  )
}

export default TodoListItem

