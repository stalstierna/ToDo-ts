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
  if (event.key === "Enter"){
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
                    <button data-id="${task.id}" class="delete_btn"><img class="img_delete"  src="img/delete-2-svgrepo-com.svg" alt=""></button>
                </div>
             </li>`
  ).join("")

  toDoUl.innerHTML = toDoHtml;

  const taskLi = document.querySelectorAll('.toDo_task');
  
  taskLi.forEach(task => {
    task.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      console.log(target.className)
      if (target.className === "edit_btn"){
        console.log("Edit",)
      } else if (target.className === "delete_btn"){
        console.log("Delete")
      } else if (target.className === "toDo_checkBtn"){
        console.log("check")
      }
    })
  });
  
}

const deleteTodo = () => {
  
}

// function saveToStorage(){
// }

// function todoCompleted(){
// }

// function editTodo(){
// }

// function deleteTodo(){
// }

// function deleteList(){
// }
