import { useState } from "react"

const DragAndDrop = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Trabajo', body: 'WordPress de Bloo! Travel https://blootravelagency.com/', list: 3 },
        { id: 2, title: 'Trabajo', body: 'WordPress de tienda Corinper https://www.corinper.com/', list: 3 },
        { id: 3, title: 'Personal', body: 'PLANEA: Software de Planificación Estratégica', list: 2 },
        { id: 4, title: 'Personal', body: 'FACTO: Sistema de Facturación', list: 2 },
        { id: 5, title: 'Profesional', body: 'Tesis: Lean Purchasing', list: 1 },
        { id: 6, title: 'Hogar', body: 'Construcción de 2do piso', list: 1 },
    ])

    const [nextId, setNextId] = useState(100)
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")

    const getList = (list) => {
        return tasks.filter(item => item.list === list)
    }

    const startDrag = (e, item) => {
        e.dataTransfer.setData('itemID', item.id)
    }

    const draggingOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e, list) => {
        const itemID = e.dataTransfer.getData('itemID')
        const item = tasks.find(item => item.id == itemID)
        item.list = list

        const newState = tasks.map(task => {
            if (task.id === itemID) return item
            return task
        })

        setTasks(newState)
    }

    const addTask = () => {
        if (!newTitle || !newBody) return

        const newTask = {
            id: nextId,
            title: newTitle,
            body: newBody,
            list: 1,
        }
        
        setTasks([...tasks, newTask])
        setNextId(nextId + 1)
        setNewTitle("")
        setNewBody("")
    }

    return (
        <>
            <h1>Tasks Drag and Drop</h1>
            <div className="add-task">
                <input 
                    type="text" 
                    placeholder="Título de la tarea" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Descripción de la tarea" 
                    value={newBody} 
                    onChange={(e) => setNewBody(e.target.value)} 
                />
                <button onClick={addTask}>Agregar Tarea</button>
            </div>
            <div className='drag-and-drop'>
                <div className='column column--1'>
                    <h3>Pendientes</h3>
                    <div className='dd-zone' droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => onDrop(e, 1)}>
                        {getList(1).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(e) => startDrag(e, item)}>
                                <strong className='title'>{item.title}</strong>
                                <p className='body'>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='column column--2'>
                    <h3>En Proceso</h3>
                    <div className='dd-zone' droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => onDrop(e, 2)}>
                        {getList(2).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(e) => startDrag(e, item)}>
                                <strong className='title'>{item.title}</strong>
                                <p className='body'>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='column column--3'>
                    <h3>Realizado</h3>
                    <div className='dd-zone' droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => onDrop(e, 3)}>
                        {getList(3).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(e) => startDrag(e, item)}>
                                <strong className='title'>{item.title}</strong>
                                <p className='body'>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DragAndDrop