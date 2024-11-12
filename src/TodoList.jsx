import React from 'react';

const todoList = [
    { id: 1, title: 'cook steak' },
    { id: 2, title: 'clean car' },
    { id: 3, title: 'shop' }
];

function TodoList() {

    return (
        <ul>
            {todoList.map(toDo =>
                <li key={toDo.id}>{toDo.title}</li>
            )}
        </ul>
    )

}

export default TodoList;