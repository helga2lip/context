import { ToDo } from '../assets/todo/todo'
import { Button } from '../Button/Button'
import styles from './ToDoList.module.css'

export function ToDoList(props) {

  const onSearchClick = () => {
    props.onFilterToDo();
  }

  const onSearchInputChange = (event) => {
    props.setFilterText(event.target.value);
  }

  const onSortClick = () => {
    props.onSortToDo()
  }

  return <>
    <div className={styles.searchBlock}>
      <input className={styles.searchInput} type="text" onChange={onSearchInputChange} value={props.filterText} placeholder='Введите задачу' />
      <Button onClick={onSearchClick} className={styles.searchButton}>Поиск</Button>
      <Button onClick={onSortClick} className={props.isSorted ? styles.buttonSortedActive : styles.buttonSorted}>Отсортировать по алфавиту</Button>
    </div>
    <ul className={styles.list}>
      {props.todos.map((todo) => {
        return <ToDo key={todo.id}
          todo={todo} />
      })}
    </ul>
  </>
}