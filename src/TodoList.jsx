import React from 'react';
import TodoListItem from './TodoListItem';


function TodoList({todoList}) {

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