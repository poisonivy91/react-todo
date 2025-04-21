import React from "react";
import PropTypes from "prop-types";
import styles from "./ToDoListItem.module.css"; // Make sure this matches your CSS module file

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.todoItem}>
      {todo.title}
      <button onClick={() => onRemoveTodo(todo.id)} className={styles.removeButton}>
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
