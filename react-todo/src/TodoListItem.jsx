import React from 'react';
import styles from './TodoListItem.module.css';



function TodoListItem({ todo, onRemoveTodo }) {
    return(
        <li className={styles.ListItem}>{todo.title}
        <button className={styles.DeleteButton} type='button' onClick={() => onRemoveTodo(todo.id)}>Delete</button>
        </li>
    );
}


export default TodoListItem;