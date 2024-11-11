function AddTodoForm(){
    return(
    <form>
        <label text="Title" htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" />
            <button text="submit">Add</button> 
    </form>
    );
}

export default AddTodoForm;