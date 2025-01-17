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
             `<li>
                <div class="toDo_left">
                    <div class="toDo_checkBtn"></div>
                     ${task.task}
                </div>
                <div class="toDo_right">
                    <button><img class="img_edit" src="img/edit-svgrepo-com.svg" alt=""></button>
                    <button><img class="img_delete"  src="img/delete-2-svgrepo-com.svg" alt=""></button>
                </div>
             </li>`
  ).join("")

  toDoUl.innerHTML = toDoHtml;
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
