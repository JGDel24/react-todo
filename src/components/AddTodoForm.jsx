import React from 'react'
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import PropTypes from "prop-types";


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
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        >
          Title
        </InputWithLabel>
        
        


        
      <button type="submit">Add</button>
    </form>
      
            
           
    )
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};




export default AddTodoForm