import { useState } from "react";

export function TodoForm({ addTask, deleteMarked }) {
    const [userInput, setUserInput] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask(userInput);
        setUserInput('');
    }

    const handleChange = (event) => {
        setUserInput(event.currentTarget.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={userInput}
                type="text"
                onChange={handleChange}
                placeholder='Что добавить?'
            />
            <button>Добавить</button>
            <button onClick={deleteMarked}>Удалить отмеченное</button>
        </form>
    )
}