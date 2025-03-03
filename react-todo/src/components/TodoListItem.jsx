import React from 'react';
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';



function TodoListItem({ todo, onRemoveTodo }) {
    return(
        <li className={styles.ListItem}>{todo.title}
        <button className={styles.DeleteButton} type='button' onClick={() => onRemoveTodo(todo.id)}>Delete</button>
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