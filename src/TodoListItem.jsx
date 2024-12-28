import React from 'react'

function TodoListItem({ toDo, onRemoveTodo }) {
    return (
        <li>
            {toDo.title}
            <button type='button' onClick={() => onRemoveTodo(toDo.id)}>Remove</button>
        </li>
    )

}

export default TodoListItem