import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';


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

TodoList.PropTypes = {
    TodoList: PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number.isRequired,
            task: PropTypes.string.isRequired
        })
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired
}

export default TodoList;