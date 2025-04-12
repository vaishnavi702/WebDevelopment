from flask import Flask, request, jsonify, render_template
import os

app = Flask(__name__)

class TaskManager:
    def __init__(self, filename='tasks.txt'):
        self.filename = filename
        self.tasks = []
        self.load_tasks()

    def load_tasks(self):
        """Load tasks from the text file."""
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r') as file:
                    self.tasks = [line.strip() for line in file.readlines()]
            except Exception as e:
                print(f"Error loading tasks: {e}")

    def save_tasks(self):
        """Save tasks to the text file."""
        try:
            with open(self.filename, 'w') as file:
                for task in self.tasks:
                    file.write(task + '\n')
        except Exception as e:
            print(f"Error saving tasks: {e}")

    def add_task(self, task):
        """Add a new task."""
        self.tasks.append(task)
        self.save_tasks()

    def view_tasks(self):
        """View all tasks."""
        return self.tasks

    def update_task(self, index, new_task):
        """Update an existing task."""
        if 0 <= index < len(self.tasks):
            self.tasks[index] = new_task
            self.save_tasks()

    def delete_task(self, index):
        """Delete a task."""
        if 0 <= index < len(self.tasks):
            del self.tasks[index]
            self.save_tasks()

task_manager = TaskManager()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET', 'POST', 'PUT', 'DELETE'])
def tasks():
    if request.method == 'GET':
        return jsonify(task_manager.view_tasks())
    
    if request.method == 'POST':
        task = request.json.get('task')
        task_manager.add_task(task)
        return jsonify(task_manager.view_tasks()), 201

    if request.method == 'PUT':
        index = request.json.get('index')
        new_task = request.json.get('task')
        task_manager.update_task(index, new_task)
        return jsonify(task_manager.view_tasks())

    if request.method == 'DELETE':
        index = request.json.get('index')
        task_manager.delete_task(index)
        return jsonify(task_manager.view_tasks())

if __name__ == '__main__':
    app.run(debug=True)