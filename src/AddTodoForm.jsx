import React from 'react'

function AddTodoForm() {
    return (
        <form>
            <label htmlFor="todoTitl">Title</label>
            <input type="text" id="todoTitle" />
            <button type="submit">Add</button>

        </form>
    )
}

export default AddTodoForm