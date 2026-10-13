const taskForm = document.querySelector('#task-form');
const titleInput = document.querySelector('#task-title');
const titleLabel = document.querySelector('#title-label');
const titleError = document.querySelector('#title-error');
const submitButton = document.querySelector('#submit-button');
const cancelEditButton = document.querySelector('#cancel-edit');
const taskFilter = document.querySelector('#task-filter');
const taskCount = document.querySelector('#task-count');
const activeCount = document.querySelector('#active-count');
const taskList = document.querySelector('#task-list');
const clearCompletedButton = document.querySelector('#clear-completed');
const storageMessage = document.querySelector('#storage-message');

let tasks = loadTasks();
let editingId = null;
let nextId = 1;

tasks.forEach(task => {
    if (task.id >= nextId) {
        nextId = task.id + 1;
    }
});

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem('js02-tasks') || '[]');
        return Array.isArray(saved) ? saved : [];
    } catch {
        storageMessage.textContent = 'Не удалось загрузить задачи.';
        return [];
    }
}

function validateTitle(title) {
    if (title.length < 3 || title.length > 80) {
        titleError.textContent = 'Введите название от 3 до 80 символов.';
        return false;
    }

    titleError.textContent = '';
    return true;
}

function createButton(text, action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.dataset.action = action;
    return button;
}

function renderTasks() {
    taskList.replaceChildren();

    let visibleTasks = tasks;

    if (taskFilter.value === 'active') {
        visibleTasks = tasks.filter(task => !task.completed);
    } else if (taskFilter.value === 'completed') {
        visibleTasks = tasks.filter(task => task.completed);
    }

    visibleTasks.forEach(task => {
        const item = document.createElement('li');
        item.classList.add('task');
        item.classList.toggle('completed', task.completed);
        item.dataset.taskId = task.id;

        const title = document.createElement('span');
        title.textContent = task.title;

        const buttons = document.createElement('div');

        buttons.append(
            createButton(
                task.completed ? 'Вернуть' : 'Выполнить',
                'toggle'
            ),
            createButton('Изменить', 'edit'),
            createButton('Удалить', 'delete')
        );

        item.append(title, buttons);
        taskList.append(item);
    });

    if (visibleTasks.length === 0) {
        const message = document.createElement('li');
        message.textContent = 'Задач в этом списке нет.';
        taskList.append(message);
    }

    taskCount.textContent = 'Всего задач: ' + tasks.length;

    const activeTasks = tasks.filter(task => !task.completed);
    activeCount.textContent = 'Активных задач: ' + activeTasks.length;

    clearCompletedButton.disabled = !tasks.some(task => task.completed);
}

function updateTasks() {
    try {
        localStorage.setItem('js02-tasks', JSON.stringify(tasks));
        storageMessage.textContent = 'Задачи сохраняются в этом браузере.';
    } catch {
        storageMessage.textContent =
            'Не удалось сохранить задачи. После закрытия страницы изменения пропадут.';
    }

    renderTasks();
}

function resetForm() {
    editingId = null;
    taskForm.reset();
    titleLabel.textContent = 'Новая задача';
    submitButton.textContent = 'Добавить';
    cancelEditButton.hidden = true;
    titleError.textContent = '';
}

function handleSubmit(event) {
    event.preventDefault();

    const title = titleInput.value.trim();

    if (!validateTitle(title)) {
        titleInput.focus();
        return;
    }

    if (editingId === null) {
        tasks.push({
            id: nextId,
            title: title,
            completed: false
        });

        nextId++;
    } else {
        const task = tasks.find(task => task.id === editingId);
        task.title = title;
    }

    resetForm();
    updateTasks();
    titleInput.focus();
}

function handleListClick(event) {
    const button = event.target.closest('button[data-action]');

    if (!button || !taskList.contains(button)) {
        return;
    }

    const taskElement = button.closest('li');
    const id = Number(taskElement.dataset.taskId);
    const task = tasks.find(task => task.id === id);

    if (button.dataset.action === 'toggle') {
        task.completed = !task.completed;
    } else if (button.dataset.action === 'delete') {
        tasks = tasks.filter(task => task.id !== id);

        if (editingId === id) {
            resetForm();
        }
    } else if (button.dataset.action === 'edit') {
        editingId = id;
        titleInput.value = task.title;
        titleLabel.textContent = 'Редактирование задачи';
        submitButton.textContent = 'Сохранить';
        cancelEditButton.hidden = false;
        titleError.textContent = '';
        titleInput.focus();
        return;
    }

    updateTasks();
}

taskForm.addEventListener('submit', handleSubmit);
taskList.addEventListener('click', handleListClick);
taskFilter.addEventListener('change', renderTasks);

clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);

    if (
        editingId !== null &&
        !tasks.find(task => task.id === editingId)
    ) {
        resetForm();
    }

    updateTasks();
});

cancelEditButton.addEventListener('click', () => {
    resetForm();
    renderTasks();
});

titleInput.addEventListener('input', () => {
    titleError.textContent = '';
});

renderTasks();