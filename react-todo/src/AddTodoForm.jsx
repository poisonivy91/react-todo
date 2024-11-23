import React from "react";


function AddTodoForm(){
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        console.log(todoTitle);
        event.target.reset();
    };


    return(
    <form onSubmit={handleAddTodo}>
        <label text="Title" htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" name="title" />
            <button type="submit">Add</button> 
    </form>
    );
}

export default AddTodoForm;