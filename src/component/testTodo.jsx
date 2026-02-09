import { useState, useEffect } from 'react';

const TestTodo = () => {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('myTasks'));
        if (savedTasks && savedTasks.length > 0) {
            setTasksList(savedTasks);
        }
    }, []);
    useEffect(() => {
        if (tasksList && tasksList.length > 0) {
            localStorage.setItem('myTasks', JSON.stringify(tasksList));

        }
    }, [tasksList]);

    const handleSaveTask = () => {
        if (task.trim() == '') {
            return;
        }
        if (editIndex !== null) {
            const updatedTasks = [...tasksList];
            updatedTasks[editIndex].task = task;
            setTasksList(updatedTasks);
            setEditIndex(null);
        } else {
            const newTask = { task: task, completed: false };
            setTasksList([...tasksList, newTask]);
        }
        setTask('');
    }

    const startEdit = (index) => {
        setTask(tasksList[index].task);
        setEditIndex(index);
    };

    const handleComplete = (index) => {
        const updatedTasks = [...tasksList];
        let status = false;
        if (updatedTasks[index].completed == true) {
            status = false
        } else {
            status = true
        }

        updatedTasks[index].completed = status;
        setTasksList(updatedTasks);
    };

    // const deleteTask = (index) => {
    //     const updatedList = tasksList.filter((_, i) => i !== index);
    //     setTasksList(updatedList);
    //     if (editIndex === index) {
    //         setEditIndex(null);
    //         setTask('');
    //     }

    };
    return (
        <div>
            <div className='task-input'>
                <input type="text" placeholder='Add Your Task...' value={task}
                    onBlur={() => { setEditIndex(null); setTask('') }}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveTask()} />
                <button className='add-btn' onClick={handleSaveTask}>
                    { }{editIndex !== null ? 'Update' : 'Add Task'}</button>
            </div>
            <div className='task-list'>
                <h4>Todo List</h4>
                <ul className='ul1'>
                    {tasksList.map((item, i) => (
                        <li key={i} className='task-item' >
                            <span className={`${item.completed ? 'completed' : ''}`}
                                onClick={() => { handleComplete(i) }}>{item.task}</span>
                            <div className='btn-group'>
                                <button className='edit-btn' onClick={() => startEdit(i)}>Edit</button>

                                <button className='del-btn' onClick={() => deleteTask(i)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default TestTodo
