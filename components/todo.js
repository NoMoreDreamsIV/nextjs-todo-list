export function Todo({ todo, toggleTask, removeTask, dragStartHandle, dragEndHandle, dragOverHandle, dropHandle }) {
    return (
        <div key={todo.id} className='item-todo'>
            <div
                onDragStart={(event) => dragStartHandle(event, todo)}
                onDragLeave={(event) => dragEndHandle(event)}
                onDragEnd={(event) => dragEndHandle(event)}
                onDragOver={(event) => dragOverHandle(event)}
                onDrop={(event) => dropHandle(event, todo)}
                draggable={true}
                className={todo.complete ? 'item-text strike' : 'item-text'}
                onClick={() => toggleTask(todo.id)}
            >
                {todo.task}
            </div>
            <div className='item-delete' onClick={() => removeTask(todo.id)}>X</div>
        </div>
    )
}