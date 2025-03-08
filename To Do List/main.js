let totalTasks = 0;
let completedTasks = 0;

document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        document.getElementById('taskList').appendChild(li);
        if (task.completed) completedTasks++;
    });
    totalTasks = tasks.length;
    updateProgressBar();
    updateTaskCount();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = createTaskElement(taskText, false);
    taskList.appendChild(li);
    taskInput.value = '';

    totalTasks++;
    updateProgressBar();
    updateTaskCount();
    saveTasks();
}

function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${completed ? 'completed' : ''}">${taskText} ${completed ? '✓' : ''}</span>
        <button onclick="completeTask(this)">✅</button>
        <button onclick="editTask(this)">✏️</button>
        <button onclick="markImportant(this)">★</button>
        <button onclick="deleteTask(this)">❌</button>
    `;
    return li;
}

function completeTask(button) {
    const li = button.parentElement;
    li.querySelector('span').classList.toggle('completed');

   
    confetti();

    
    button.disabled = true;

   
    if (li.querySelector('span').classList.contains('completed')) {
        completedTasks++;
    } else {
        completedTasks--;
    }
    updateProgressBar();
    updateTaskCount();
    saveTasks();
}

function markImportant(button) {
    const li = button.parentElement;
    const taskSpan = li.querySelector('span');
    taskSpan.classList.toggle('important');
    if (taskSpan.classList.contains('important')) {
        taskSpan.innerHTML += ' ★';
    } else {
        taskSpan.innerHTML = taskSpan.innerHTML.replace(' ★', ''); 
    }
    saveTasks(); 
}

function deleteTask(button) {
    const li = button.parentElement;
    if (li.querySelector('span').classList.contains('completed')) {
        completedTasks--;
    }
    li.remove();
    totalTasks--;
    updateProgressBar();
    updateTaskCount();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const taskText = li.querySelector('span').innerText.replace(' ★', ''); 
        const completed = li.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = progressPercentage + '%';
}

function updateTaskCount() {
    const taskCountDisplay = document.getElementById('taskCount');
    taskCountDisplay.innerText = `${completedTasks}/${totalTasks}`;
}
