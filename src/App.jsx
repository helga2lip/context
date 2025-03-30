import { ToDoList } from './ToDoList/ToDoList'
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { AppContext } from './context'

export function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addText, setAddText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterKey, setFilterKey] = useState('');
  const [isCreating, setIsCreating] = useState(false);
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
  }, []);

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
      .then((response) => {
        return response.json();
      })
      .then((todo) => {
        setTodos([...todos, todo]);
        setAddText('')
      })
      .finally(() => setIsCreating(false));
  }

  const editToDo = (todo) => {
    const newTodoTitle = prompt('Отредактируйте задачу', todo.title)

    if (!newTodoTitle) {
      return
    }

    fetch(`http://localhost:3005/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: todo.id,
        title: newTodoTitle,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((editedTodo) => {
        const editedTodoIndex = todos.findIndex((item) => item.id === editedTodo.id)
        const newTodos = [...todos]
        newTodos.splice(editedTodoIndex, 1, editedTodo)
        setTodos(newTodos)
      }
      )
      .finally(() => setIsUpdating(false));
  }

  const deleteToDo = (id) => {
    setIsDeleting(true);

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const deletedTodoIndex = todos.findIndex((item) => item.id === id)
        const newTodos = [...todos]
        newTodos.splice(deletedTodoIndex, 1)
        setTodos(newTodos)
      }
      )
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
          : <AppContext value={{ deleteToDo, editToDo, isDeleting, isUpdating }}>
            <ToDoList todos={filteredTodos}
              onSortToDo={sortToDo}
              onFilterToDo={filterTodo}
              isSorted={isSorted}
              filterText={filterText}
              setFilterText={setFilterText} />
          </AppContext >
        }
      </div>
    </div>

  )
}
