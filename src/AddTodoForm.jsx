import React from 'react'
import { useState } from 'react';

function AddTodoForm({onAddTodo}) {

    const [todoTitle,  setTodoTitle] = useState('');

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;

        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        
        console.log(todoTitle);
        onAddTodo({title: todoTitle, id: Date.now()})
        setTodoTitle('');


    }
    
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" name='title' 
            value={todoTitle}
            onChange={handleTitleChange}
            />
            <button type="submit">Add</button>

        </form>
    )
}

export default AddTodoForm