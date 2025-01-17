const toDoInput = document.getElementById("toDo_input") as HTMLInputElement;
const toDoInputBtn = document.getElementById(
  "toDo_button"
) as HTMLButtonElement;
const toDoUl = document.getElementById("toDo_list") as HTMLUListElement;

const toDoArr: ToDo[] = [];
let idNum = 0;

interface ToDo {
  id: number;
  task: string;
  completed: boolean;
}

toDoInputBtn?.addEventListener("click", () => {
  console.log(toDoInput.value);
  addTodo();
});

toDoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo()
  }
})

const addTodo = (): void => {
  const task = toDoInput.value.trim()

  if (toDoInput.value !== "") {
    idNum += 1;
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
                    <div class="toDo_checkBtn"></div>
                     ${task.task}
                </div>
                <div class="toDo_right">
                    <button class="edit_btn"><img class="img_edit" src="img/edit-svgrepo-com.svg" alt=""></button>
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
          console.log("Edit",)
        } else if (target.className === "delete_btn") {
          console.log("Delete")
          deleteTodo(dataId)
        } else if (target.className === "toDo_checkBtn") {
          console.log("check")
        }
      }

    })
  });

}

const deleteTodo = (dataId: string): void => {
  const findIndexOfTask: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))

  if (findIndexOfTask != undefined)
  toDoArr.splice(toDoArr.indexOf(findIndexOfTask), 1)

  showTodoList()
}

// function saveToStorage(){
// }

// function todoCompleted(){
// }

// function editTodo(){
// }

// function deleteList(){
// }
