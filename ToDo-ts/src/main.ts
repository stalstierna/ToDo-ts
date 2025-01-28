import supabase from "./supabaseClient";
import {
  getTodos, insertTodo, editTodo, deleteTodo, getTodo,
  getTodoStatus, deleteTodoList, createUser, logInUser, logoutUser
} from './crud';

console.log(supabase)

const toDoInput = document.getElementById("toDo_input") as HTMLInputElement;
const toDoInputBtn = document.getElementById(
  "toDo_button"
) as HTMLButtonElement;
const toDoUl = document.getElementById("toDo_list") as HTMLUListElement;
const underline = document.querySelector('.underline') as HTMLElement;
const editSection = document.getElementById('edit_section') as HTMLElement;
// const editInput = document.getElementById('edit_input') as HTMLInputElement;
// const editTextBtn = document.getElementById('edit_text_button') as HTMLButtonElement;
const switchToLogin = document.getElementById('login_top_btn') as HTMLElement;
const switchToSignup = document.getElementById('register_top_btn') as HTMLElement;


// let toDoArr: ToDo[] = [];
// let idNum = 0;

export interface ToDo {
  id?: string;
  task: string;
  completed: boolean;
}


switchToLogin.addEventListener('click', () => {
  switchToLogin.style.backgroundColor = "#e5c2e0"
  switchToSignup.style.backgroundColor = "transparent"
  switchToLogin.style.border = "1px solid #000"
  switchToSignup.style.border = "none"

  const signupField = document.getElementById('register_user_fieldset') as HTMLFieldSetElement;
  const loginField = document.getElementById('login_user_fieldset') as HTMLFieldSetElement;

  loginField.style.display = "flex";
  signupField.style.display = "none";

})

switchToSignup.addEventListener('click', () => {
  switchToSignup.style.backgroundColor = "#e5c2e0"
  switchToLogin.style.backgroundColor = "transparent"
  switchToSignup.style.border = "1px solid #000"
  switchToLogin.style.border = "none"

  const signupField = document.getElementById('register_user_fieldset') as HTMLFieldSetElement;
  const loginField = document.getElementById('login_user_fieldset') as HTMLFieldSetElement;

  signupField.style.display = "flex";
  loginField.style.display = "none";


})



toDoInputBtn.addEventListener("click", () => {
  console.log(toDoInput.value);
  addTodo();
});

toDoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
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
  const text: string = toDoInput.value.trim()

  if (toDoInput.value !== "") {
    animationUnderliner()
    //idNum = getTodoIdFromStorage();
    // console.log(idNum)
    // toDoArr.push({
    //   // id: idNum.toString(),
    //   task: task,
    //   completed: false,
    // });

    const todo: ToDo = {
      task: text,
      completed: false,
    }
    insertTodo(todo)
    toDoInput.value = "";
  }
}

export const showTodoList = async () => {
  const todoList: ToDo[] | undefined = await getTodos()

  if (todoList) {
    const toDoHtml = todoList.map((task) =>
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
  }

  const taskLi = document.querySelectorAll('.toDo_task');
  taskLi.forEach(task => {
    task.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const dataId = target.dataset.id;
      console.log(target)

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
  // saveToStorage()

}

const deleteTask = (dataId: string): void => {
  deleteTodo(dataId)
  // const task: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))

  // if (task != undefined)
  //   toDoArr.splice(toDoArr.indexOf(dataId), 1)
}

const taskCompleted = async (dataId: string) => {
  getTodoStatus(dataId);
  // const task: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))
}

const editTask = async (dataId: string) => {
  // const task: ToDo | undefined = toDoArr.find((task) => task.id === Number(dataId))
  const todoText = await getTodo(dataId)
  console.log(todoText)
  // const editSection = document.getElementById('edit_section') as HTMLElement;
  const editInput = document.getElementById('edit_input') as HTMLInputElement;
  const editTextBtn = document.getElementById('edit_text_button') as HTMLButtonElement;
  editSection.style.display = "flex";

  if (todoText != undefined) {
    editInput.value = todoText[0].task

    editTextBtn.replaceWith(editTextBtn.cloneNode(true));
    const newEditTextBtn = document.getElementById('edit_text_button') as HTMLButtonElement;

    newEditTextBtn.addEventListener('click', () => {
      const newTaskText = editInput.value;
      if (newTaskText != "") {
        todoText[0].task = newTaskText;
        editSection.style.display = "none";
      }
      editTodo(dataId, newTaskText)
    }, { once: true })

  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.id === "edit_section") {
      editSection.style.display = "none";
    }
  });
}

function deleteList(): void {
  const clearAllBtn = document.getElementById('clear_all') as HTMLButtonElement;

  clearAllBtn.addEventListener('click', () => {
    // toDoArr.splice(0, toDoArr.length);
    // console.log(toDoArr)
    deleteTodoList()
  })
}

function signUp() {
  const emailInput = document.getElementById('register_email') as HTMLInputElement;
  const passwordInput = document.getElementById('register_password') as HTMLInputElement;
  const signUpBtn = document.getElementById('register_btn') as HTMLButtonElement;

  signUpBtn.addEventListener('click', () => {
    createUser(emailInput.value, passwordInput.value)
  })
}

function logIn() {
  const emailInput = document.getElementById('login_email') as HTMLInputElement;
  const passwordInput = document.getElementById('login_password') as HTMLInputElement;
  const logInBtn = document.getElementById('login_btn') as HTMLButtonElement;

  logInBtn.addEventListener('click', () => {
    logInUser(emailInput.value, passwordInput.value)
    animationUnderliner()
    getTodos()
    document.getElementById('login_user_section')!.style.display = "none";
    document.getElementById('toDo_fieldset')!.style.display = "inline";
    document.getElementById('toDo_section')!.style.display = "inline";
  })
}

function signOut() {
  const signOutBtn = document.getElementById('sign_out_btn') as HTMLButtonElement;

  signOutBtn.addEventListener('click', () => {
    logoutUser()
    document.getElementById('toDo_fieldset')!.style.display = "none";
    document.getElementById('toDo_section')!.style.display = "none";
    document.getElementById('login_user_section')!.style.display = "flex";

  })
}

signUp()
logIn()
signOut()



// function loadStorage():void {
//   const savedList: string | null = localStorage.getItem("todo-list");
//   if (savedList) {
//     toDoArr = JSON.parse(savedList)
//     showTodoList()
//   }
// }

// function saveToStorage():void {
//   localStorage.setItem("todo-list", JSON.stringify(toDoArr));
// }

// function getTodoIdFromStorage():number {
//   const savedList: string | null = localStorage.getItem("todo-list");
//   if (savedList){
//     toDoArr = JSON.parse(savedList)
//     if (toDoArr.length > 0) {
//       const arrOfIds = toDoArr.map((task) => task.id)
//       const nextId = Math.max(...arrOfIds) + 1;
//       return nextId;
//     }
//   }
//   return 1;
// }

deleteList()
showTodoList()
// loadStorage()
