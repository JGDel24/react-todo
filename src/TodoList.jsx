import React from 'react';
import TodoListItem from './TodoListItem';



const todoList = [
    { id: 1, title: 'cook steak' },
    { id: 2, title: 'clean car' },
    { id: 3, title: 'shop' }
];

function TodoList() {

    return (
        <ul>
            {todoList.map(toDo => (
                <TodoListItem key={toDo.id} toDo={toDo}/>
            )
                
            
                
            )}
        </ul>
    )

}

export default TodoList;