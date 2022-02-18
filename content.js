const todoHTML = document.querySelector('.todo_list');
const todoInput = document.querySelector('.todo_input');
const clearAllBtn = document.querySelector('.clear_btn');

const todoList = {
  todoTasks: [],
};

const setLocalStore = (todoTasks) => {
  localStorage.setItem('tasks', JSON.stringify(todoTasks));
};

const addTask = (desctiption, completed = false, index, todoList) => {
  const task = {
    desctiption,
    completed,
    index,
  };
  todoList.todoTasks.push(task);
  setLocalStore(todoList.todoTasks);
};

const removeTask = (i, todoList) => {
  todoList.todoTasks.splice(i, 1);
  todoList.todoTasks.forEach((task) => {
    task.index = i + 1;
  });
  setLocalStore(todoList.todoTasks);
};

const editTask = (input, listItem, i, todoList) => {
  if (input.readOnly) {
    input.readOnly = false;
    listItem.style.backgroundColor = 'rgb(182, 166, 166)';
  } else {
    input.readOnly = true;
    todoList.todoTasks[i].desctiption = input.value;
    setLocalStore(todoList.todoTasks);
  }
};

const isCompleted = (complete, input, i, todoList) => {
  if (complete) {
    todoList.todoTasks[i].completed = false;
    input.style.textDecoration = 'none';
    setLocalStore(todoList.todoTasks);
  } else {
    todoList.todoTasks[i].completed = true;
    input.style.textDecoration = 'line-through';
    setLocalStore(todoList.todoTasks);
  }
};

function displayTasks() {
  todoHTML.innerHTML = '';
  todoList.todoTasks.innerHTML = '';
  todoList.todoTasks.forEach((task, i) => {
    task.index = i + 1;

    const listItem = document.createElement('article');
    listItem.classList.add('list_item');
    const listContent = document.createElement('div');
    listContent.classList.add('list_content');
    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', task.index);
    checkbox.setAttribute('name', task.index);
    const input = document.createElement('input');
    input.classList.add('todo_task');
    input.setAttribute('type', 'text');
    input.setAttribute('id', task.index);
    input.setAttribute('name', task.index);
    input.setAttribute('value', task.desctiption);
    input.readOnly = true;
    const breakLine = document.createElement('br');
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    const editBtn = document.createElement('i');
    editBtn.classList.add('fas', 'fa-pen');
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    const removeBtn = document.createElement('i');
    removeBtn.classList.add('fas', 'fa-trash');
    const hr = document.createElement('hr');
    if (task.completed) {
      input.style.textDecoration = 'line-through';
      checkbox.setAttribute('checked', '');
    }

    editButton.append(editBtn);
    removeButton.append(removeBtn);
    listContent.append(checkbox, input, breakLine);
    listItem.append(listContent, removeButton, editButton);
    todoHTML.append(listItem, hr);

    editButton.addEventListener('click', () => {
      editTask(input, listItem, i, todoList);
      if (input.readOnly) {
        displayTasks();
      }
    });

    removeButton.addEventListener('click', () => {
      removeTask(i, todoList);
      displayTasks();
    });

    checkbox.addEventListener('click', () => {
      isCompleted(task.completed, input, i, todoList);
      if (!task.completed) {
        displayTasks();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('tasks')) {
    todoList.todoTasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
  } else if (todoList.todoTasks) {
    displayTasks();
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (todoInput.value) {
      addTask(todoInput.value, false, todoList.todoTasks[todoList.todoTasks.length - 1], todoList);
      displayTasks();

      todoInput.value = '';
    }
  }
});

clearAllBtn.addEventListener('click', () => {
  const filteredTasks = todoList.todoTasks.filter((item) => {
    const state = item.completed === false;
    return state;
  });
  todoList.todoTasks = filteredTasks;
  setLocalStore(todoList.todoTasks);
  displayTasks();
});
