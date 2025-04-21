import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem"; // Make sure this file exists

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
          />
        ))
      )}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
