const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const priorityInput = document.getElementById("priority");
const message = document.getElementById("message");
const list = document.getElementById("tasks");
let tasks = [];

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
        if (Array.isArray(saved) && saved.every(task => task && typeof task.title === "string" && task.title.trim().length >= 3 && task.title.length <= 80 && Number.isInteger(task.priority) && task.priority >= 1 && task.priority <= 3)) {
            tasks = saved;
        }
    } catch (error) {
        tasks = [];
        message.textContent = "Не удалось загрузить сохранённые задачи";
    }
}

function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    } catch (error) {
        message.textContent = "Не удалось сохранить задачи";
        return false;
    }
}

function showTasks() {
    list.replaceChildren();
    tasks.forEach((task, index) => {
        const item = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = `${task.title} (приоритет ${task.priority}) `;
        const button = document.createElement("button");
        button.textContent = "Удалить";
        button.addEventListener("click", () => {
            const old = tasks.slice();
            tasks.splice(index, 1);
            if (!saveTasks()) tasks = old;
            else message.textContent = "Задача удалена";
            showTasks();
        });
        item.append(text, button);
        list.append(item);
    });
}

form.addEventListener("submit", event => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const priority = Number(priorityInput.value);
    if (title.length < 3 || title.length > 80) {
        message.textContent = "Название должно содержать от 3 до 80 символов";
        return;
    }
    if (priorityInput.value.trim() === "" || !Number.isInteger(priority) || priority < 1 || priority > 3) {
        message.textContent = "Приоритет должен быть целым числом от 1 до 3";
        return;
    }
    tasks.push({ title, priority });
    if (!saveTasks()) tasks.pop();
    else {
        message.textContent = "Задача добавлена";
        form.reset();
    }
    showTasks();
});

document.getElementById("clear").addEventListener("click", () => {
    const old = tasks.slice();
    tasks = [];
    if (!saveTasks()) tasks = old;
    else message.textContent = "Список очищен";
    showTasks();
});

loadTasks();
showTasks();
