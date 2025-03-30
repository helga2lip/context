import { useContext } from 'react';
import { Button } from '../../Button/Button'
import styles from './ToDo.module.css'
import { AppContext } from '../../context';

export function ToDo(props) {

  const { deleteToDo, editToDo, isDeleting, isUpdating } = useContext(AppContext);

  return <li className={styles.listItem}>
    <div className={styles.todoText}>{props.todo.title}</div>
    <Button onClick={() => editToDo(props.todo)} disabled={isUpdating} className={styles.editButton}>Редактировать</Button>
    <Button onClick={() => deleteToDo(props.todo.id)} disabled={isDeleting} className={styles.deleteButton}>Удалить</Button>
  </li>
}