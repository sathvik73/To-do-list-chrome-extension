document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const timeInput = document.getElementById('time-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskListUl = document.getElementById('task-list');

    let tasks = [];
    let dragSrcIndex = null;

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (taskInput === document.activeElement || timeInput === document.activeElement)) {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskTime = timeInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task description.');
            taskInput.focus();
            return;
        }
        if (taskTime === '' || parseInt(taskTime) <= 0) {
            alert('Please enter a valid positive number for time (minutes).');
            timeInput.focus();
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            text: taskText,
            time: parseInt(taskTime)
        };

        tasks.push(newTask);
        saveTasksToStorage();
        displayTasks();

        taskInput.value = '';
        timeInput.value = '';
        taskInput.focus();
    }

    function loadTasks() {
        chrome.storage.local.get({ tasks: [] }, (result) => {
            tasks = result.tasks;
            displayTasks();
        });
        }
    function displayTasks() {
        taskListUl.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('draggable', 'true');
            li.dataset.index = index;

            const taskNameSpan = document.createElement('span');
            taskNameSpan.className = 'task-name';
            taskNameSpan.textContent = task.text;

            const taskTimeSpan = document.createElement('span');
            taskTimeSpan.className = 'task-time';
            taskTimeSpan.textContent = `${task.time} min`;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-task-btn';
            deleteButton.textContent = 'x';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasksToStorage();
                displayTasks();
            });

            li.appendChild(taskNameSpan);
            li.appendChild(taskTimeSpan);

            // li.appendChild(taskTimeHoursSpan);
            li.appendChild(deleteButton);

            li.addEventListener('dragstart', (e) => {
                dragSrcIndex = index;
                e.dataTransfer.effectAllowed = 'move';
                li.style.opacity = '0.5';
            });

            li.addEventListener('dragend', () => {
                li.style.opacity = '';
            });

            li.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            li.addEventListener('drop', (e) => {
                e.preventDefault();
                const targetIndex = parseInt(li.dataset.index);
                if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
                    const movedTask = tasks.splice(dragSrcIndex, 1)[0];
                    tasks.splice(targetIndex, 0, movedTask);
                    saveTasksToStorage();
                    displayTasks();
                }
            });

            taskListUl.appendChild(li);
        });
    }
   

    // Drag and drop functionality
    function addDragAndDropHandlers() {
        const listItems = document.querySelectorAll('#task-list li');

        listItems.forEach((item) => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', item.dataset.index);
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const toIndex = parseInt(item.dataset.index);

                if (fromIndex !== toIndex) {
                    const moved = tasks.splice(fromIndex, 1)[0];
                    tasks.splice(toIndex, 0, moved);
                    saveTasksToStorage();
                    displayTasks();
                }
            });
        });
    }
    addDragAndDropHandlers();

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.tasks) {
            tasks = changes.tasks.newValue;
            displayTasks();
        }
    });
});
