import React from 'react';
import TodoListItem from './TodoListItem';


function TodoList({ todoList, onRemoveTodo }) {

    return (
        <ul>
            {todoList.map(toDo => (
                <TodoListItem
                    key={toDo.id}
                    toDo={toDo}
                    onRemoveTodo={onRemoveTodo}
                />
            )



            )}
        </ul>
    )

}

export default TodoList;