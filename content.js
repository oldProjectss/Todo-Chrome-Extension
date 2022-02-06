const inputValue = document.getElementsByClassName('add')[0];
const addTaskBtn = document.getElementsByClassName('add_btn')[0];

addTaskBtn.addEventListener('click', function () {
  if (inputValue.value.trim() != 0) {
    let localItems = JSON.parse(localStorage.getItem('localItem'));
    if (localItems === null) {
      taskList = [];
    } else {
      taskList = localItems;
    }
    taskList.push(inputValue.value);
    localStorage.setItem('localItem', JSON.stringify(taskList));
  }

  showItem();
});

function showItem() {
  let localItems = JSON.parse(localStorage.getItem('localItem'));
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  let html = '';
  let itemShow = document.querySelector('.todos');
  taskList.forEach((data, index) => {
    html += `
      <div class="todo">
          <input class="todo_item" type="text" value="${data}" readonly/>
          <button class="todo_btn close_btn" type="button"><i class="fa fa-times"></i></button>
      </div>
    `;
  });
  itemShow.innerHTML = html;
}
showItem();

function deleteItem(index) {
  let localItems = JSON.parse(localStorage.getItem('localItem'));
  taskList.splice(index, 1);
  localStorage.setItem('localItem', JSON.stringify(taskList));
  showItem();
}

function clearTask() {
  localStorage.clear();
  showItem();
}

document.querySelectorAll('.close_btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    deleteItem(index);
  });
});

// edite functionality need a bit of configurations to change the local storage
// document.querySelectorAll('.edit_btn').forEach((btn, index) => {
//   btn.addEventListener('click', (e) => {
//     let input = btn.previousElementSibling;
//     if (input.hasAttribute('readonly')) {
//       input.removeAttribute('readonly');
//       btn.innerHTML = '<i class="fa fa-save"></i>';
//     } else {
//       input.setAttribute('readonly', '');
//       btn.innerHTML = '<i class="fa fa-pen"></i>';
//     }
//   });
// });

// <button class="todo_btn edit_btn" type="button">
//  <i class="fa fa-pen"></i>
// </button>;
