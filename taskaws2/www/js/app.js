document.addEventListener('DOMContentLoaded', function() {
    // --- Función para obtener las tareas del localStorage ---
    function getTasks() {
        let stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : [];
    }

    // --- Función para guardar el array de tareas en localStorage ---
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskHandler() {
        const input = document.getElementById('taskText');
        const taskText = input.value.trim();
        if (taskText !== '') {
            const tasks = getTasks();
            tasks.push(taskText);
            saveTasks(tasks);
            renderTasks();
            input.value = '';
        }
    }

    function editTask() {
        const li = this.closest('li');
        const index = parseInt(li.getAttribute('data-index'), 10);
        const tasks = getTasks();
        const oldText = li.querySelector('.task-text').textContent;

        const newText = window.prompt('Edit Task', oldText);
        if (newText !== null) {
            const trimmed = newText.trim();
            if (trimmed !== '') {
                tasks[index] = trimmed;
                saveTasks(tasks);
                renderTasks();
            }
        }
    }

    function deleteTask() {
        const li = this.closest('li');
        const index = parseInt(li.getAttribute('data-index'), 10);
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    }

    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        const tasks = getTasks();

        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', index);

            const wrapper = document.createElement('div');
            wrapper.className = 'task-item';

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = taskText;

            const editBtn = document.createElement('button');
            editBtn.className = 'editBtn';
            editBtn.textContent = 'Edit';

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'deleteBtn';
            deleteBtn.textContent = 'X';

            editBtn.onclick = editTask;
            deleteBtn.onclick = deleteTask;

            wrapper.appendChild(span);
            wrapper.appendChild(editBtn);
            wrapper.appendChild(deleteBtn);
            li.appendChild(wrapper);
            taskList.appendChild(li);
        });
    }

    const addBtn = document.getElementById('addTask');
    if (addBtn) {
        addBtn.onclick = addTaskHandler;
    }

    // Renderizar las tareas al cargar la página
    renderTasks();
});
