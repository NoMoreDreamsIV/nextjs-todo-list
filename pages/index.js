import { TodoForm } from '/components/todoform.js'
import { Todo } from '/components/todo.js'
import { useState } from 'react'

export default function App() {
    const [todos, setTodos] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
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

    const dragStartHandle = (event, todo) => {
        setCurrentItem(todo);
    }

    const dragEndHandle = (event) => {
        event.target.style.background = 'rgb(0, 158, 150)';
    }

    const dragOverHandle = (event) => {
        event.preventDefault();
        event.target.style.background = 'rgb(0, 77, 73)';
    }   

    const dropHandle = (event, todo) => {
        event.preventDefault();
        setTodos(todos.map(item => {
            if (item.id === todo.id) {
                return {...item, id: currentItem.id}
            }
            if (item.id === currentItem.id) {
                return {...item, id: todo.id}
            }
            return item;
        }))
        event.target.style.background = 'rgb(0, 158, 150)';
    }

    const sortTodos = (a, b) => {
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
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
            {todos.sort(sortTodos).map((todo) => {
                return (
                    <Todo
                        todo={todo}
                        key={todo.id}
                        toggleTask={handleToggle}
                        removeTask={removeTask}
                        dragStartHandle={dragStartHandle}
                        dragEndHandle={dragEndHandle}
                        dragOverHandle={dragOverHandle}
                        dropHandle={dropHandle}
                    />
                )
            })}
        </div>
    );
}