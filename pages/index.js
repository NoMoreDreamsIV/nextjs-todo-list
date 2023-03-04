import { TodoForm } from '/components/todoform.js'
import { Todo } from '/components/todo.js'
import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const addTask = (userInput) => {
      if (userInput) {
          const newTask = {
              id: Date.now(),
              task: userInput,
              complete: false
          }
          setTodos([...todos, newTask]);
      }
  }

  const removeTask = (id) => {
      setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const handleToggle = (id) => {
      setTodos([...todos.map((todo) => todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo })])
  }

  const deleteMarked = () => {
      setTodos([...todos.filter((todo) => !todo.complete)])
  }

  return (
      <div className='App'>
          <header>
              <h1>Список задач: {todos.length}</h1>
          </header>
          <TodoForm
              addTask={addTask}
              deleteMarked={deleteMarked}
          />
          {todos.map((todo) => {
              return (
                  <Todo
                      todo={todo}
                      key={todo.id}
                      toggleTask={handleToggle}
                      removeTask={removeTask}
                  />
              )
          })}
      </div>
  );
}