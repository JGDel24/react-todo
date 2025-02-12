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
            ))}
        </ul>
    );
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired
};

export default TodoList;
