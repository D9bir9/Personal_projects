const todoList = [];
renderTodoList();

function renderTodoList(){
  let todoHTML = '';

  todoList.forEach((todoObject, index) => {
    todoHTML += `
        <div class="todo">
          <div id="js-name" class="name">
            ${todoObject.name}
          </div>
          <div id="js-date" class="date">
            ${todoObject.dueDate}
          </div>
          <div class="btn">
            <button onclick="del(${index})">Delete</button>
          </div>
        </div>`;
  });
  document.querySelector('.lists').innerHTML = todoHTML;
  document.getElementById('js-todo-date').valueAsDate = new Date();
}

function del(index){
  todoList.splice(index,1);
  renderTodoList();
}

function addTodo(){
  const inputElement = document.getElementById("js-todo-name");
  const dateElement = document.getElementById('js-todo-date')
  todoList.push({name: inputElement.value, dueDate: dateElement.value});
  renderTodoList(); 
  inputElement.value = '';
}