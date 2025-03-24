import { Button } from '../../Button/Button'
import styles from './ToDo.module.css'

export function ToDo(props) {

  return <li className={styles.listItem}>
    <div className={styles.todoText}>{props.todo.title}</div>
    <Button onClick={() => props.onEditToDo(props.todo.id)} disabled={props.isUpdating} className={styles.editButton}>Редактировать</Button>
    <Button onClick={() => props.onDeleteToDo(props.todo.id)} disabled={props.isDeleting} className={styles.deleteButton}>Удалить</Button>
  </li>
}