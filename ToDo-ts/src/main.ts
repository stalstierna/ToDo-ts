const toDoInput = document.getElementById("toDo_input") as HTMLInputElement;
const toDoInputBtn = document.getElementById(
  "toDo_button"
) as HTMLButtonElement;
const toDoUl = document.getElementById("toDo_list") as HTMLUListElement;

const underline = document.querySelector('.underline') as HTMLElement;

let toDoArr: ToDo[] = [];
let idNum = 0;

interface ToDo {
  id: number;
  task: string;
  completed: boolean;
}

toDoInputBtn.addEventListener("click", () => {
  console.log(toDoInput.value);
  addTodo();
});

toDoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo()
  }
})

const animationUnderliner = () => {
    underline.style.transition = "0.8s"
    setTimeout(() => {
    underline.style.width = "120px";
    }, 800)
    underline.style.width = "200px";
}

const addTodo = (): void => {
  const task = toDoInput.value.trim()

  if (toDoInput.value !== "") {
    animationUnderliner()
    idNum = getTodoIdFromStorage();
    console.log(idNum)
    toDoArr.push({
      id: idNum,
      task: task,
      completed: false,
    });
    console.log(toDoArr);
  }
  toDoInput.value = "";
  showTodoList()
}

const showTodoList = (): void => {
  const toDoHtml = toDoArr.map((task) =>
    `<li class="toDo_task">
                <div class="toDo_left">
                  <div class="${task.completed ? "toDo_checkBtn_done" : "toDo_checkBtn"
    }" data-id="${task.id}">
                     ${task.completed ? `<img src="img/check-small-svgrepo-com.svg" alt="">` : ""}
                  </div>
                    <p> ${task.task} </p>
                </div>
                <div class="toDo_right">
                    <button class="edit_btn" data-id="${task.id}"><img class="img_edit" src="img/edit-svgrepo-com.svg" alt=""></button>
                    <button class="delete_btn" data-id="${task.id}"><img class="img_delete"  src="img/delete-2-svgrepo-com.svg" alt=""></button>
                </div>
             </li>`
  ).join("")

  toDoUl.innerHTML = toDoHtml;

  const taskLi = document.querySelectorAll('.toDo_task');
  taskLi.forEach(task => {
    task.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const dataId = target.dataset.id;

      if (dataId != undefined) {
        if (target.className === "edit_btn") {
          console.log("Edit")
          editTask(dataId)
        } else if (target.className === "delete_btn") {
          console.log("Delete")
          deleteTask(dataId)
        } else if (target.className === "toDo_checkBtn") {
          console.log("check")
          taskCompleted(dataId)
        } else if (target.className === "toDo_checkBtn_done") {
          console.log("undo")
          taskCompleted(dataId)
        }
      }

    })
  });
  console.log(toDoArr)
  saveToStorage()

}

const deleteTask = (dataId: string): void => {
  const task: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))

  if (task != undefined)
    toDoArr.splice(toDoArr.indexOf(task), 1)

  showTodoList()
}

const taskCompleted = (dataId: string): void => {
  const task: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))

  if (task != undefined) {
    if (task.completed === false) {
      task.completed = true;
    } else if (task.completed === true) {
      task.completed = false;
    }
  }
  showTodoList()
}

const editTask = (dataId: string): void => {
  const task: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))

  const editSection = document.getElementById('edit_section') as HTMLElement;
  const editInput = document.getElementById('edit_input') as HTMLInputElement;
  const editBtn = document.getElementById('edit_button') as HTMLButtonElement;
  editSection.style.display = "flex";

  if (task != undefined) {
    editInput.value = task.task;

    editBtn.addEventListener('click', () => {
      const newTaskText = editInput.value;
      if (newTaskText != ""){
        task.task = newTaskText;
        editSection.style.display = "none";
      }
      showTodoList()
    })

    editInput.addEventListener('keydown', (event) => {
      if (event.key === "Enter"){
        const newTaskText = editInput.value;
        if (newTaskText != ""){
          task.task = newTaskText;
          editSection.style.display = "none";
        }
        showTodoList()
      }
    })
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.id === "edit_section") {
      console.log(target)
      editSection.style.display = "none";
    }
  });

  showTodoList()
}

function loadStorage():void {
  const savedList: string | null = localStorage.getItem("todo-list");
  if (savedList) {
    toDoArr = JSON.parse(savedList)
    showTodoList()
  }
}

function saveToStorage():void {
  localStorage.setItem("todo-list", JSON.stringify(toDoArr));
}

function getTodoIdFromStorage():number {
  const savedList: string | null = localStorage.getItem("todo-list");
  if (savedList){
    toDoArr = JSON.parse(savedList)
    if (toDoArr.length > 0) {
      const arrOfIds = toDoArr.map((task) => task.id)
      const nextId = Math.max(...arrOfIds) + 1;
      return nextId;
    }
  }
  return 1;
}

loadStorage()

// function deleteList(){
// }
