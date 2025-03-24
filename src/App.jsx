import { ToDoList } from './ToDoList/ToDoList'
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';

export function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addText, setAddText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterKey, setFilterKey] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [refreshToDos, setRefreshToDos] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const fetchTodos = (isSorted = false) => {
    setIsLoading(true);
    fetch(`http://localhost:3005/todos${isSorted ? '?_sort=title' : ''}`)
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        setTodos(loadedToDos);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchTodos();
  }, [refreshToDos]);

  const addToDo = () => {
    setIsCreating(true);
    fetch('http://localhost:3005/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: Date.now(),
        title: addText,
      }),
    })
      .then(() => {
        setRefreshToDos(!refreshToDos)
        setAddText('')
      })
      .finally(() => setIsCreating(false));
  }

  const editToDo = (id) => {
    const newTodoTitle = prompt('Отредактируйте задачу', '')

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: id,
        title: newTodoTitle,
      }),
    })
      .then(() => {
        setRefreshToDos(!refreshToDos);
      })
      .finally(() => setIsUpdating(false));
  }

  const deleteToDo = (id) => {
    setIsDeleting(true);

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setRefreshToDos(!refreshToDos);
      })
      .finally(() => setIsDeleting(false));
  }

  const sortToDo = () => {
    setIsSorted(!isSorted)
    fetchTodos(!isSorted)
  }

  const filterTodo = () => {
    setFilterKey(filterText)
  }

  const onAddInputChange = (event) => {
    setAddText(event.target.value);
  }

  const filteredTodos = todos.filter((todo) => {
    return todo.title.toLowerCase().includes(filterKey.toLowerCase())
  })

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <input className={styles.addInput} type="text" onChange={onAddInputChange} value={addText} placeholder='Добавьте задачу' />
          <Button onClick={addToDo} disabled={isCreating} className={styles.addButton}>Добавить</Button>
        </header>
        {isLoading
          ? <div className='loader'>Loading...</div>
          : <ToDoList todos={filteredTodos}
            onDeleteToDo={deleteToDo}
            onEditToDo={editToDo}
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            onSortToDo={sortToDo}
            onFilterToDo={filterTodo}
            isSorted={isSorted}
            filterText={filterText}
            setFilterText={setFilterText} />
        }
      </div>
    </div>
  )
}
