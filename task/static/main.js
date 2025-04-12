document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const fetchTasks = async () => {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    };

    const addTask = async () => {
        const task = taskInput.value.trim();
        if (task) {
            await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });
            taskInput.value = '';
            fetchTasks();
        }
    };

    window.deleteTask = async (index) => {
        await fetch('/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index }),
        });
        fetchTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    fetchTasks();
});