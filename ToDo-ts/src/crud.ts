
import supabase  from "./supabaseClient";
import { ToDo } from "./main";
import { showTodoList } from "./main";

export async function getTodos() {
    const {error, data} = await supabase
    .from('Todo')
    .select()
    .order('id', { ascending: true });
    if (error){
        console.error('Error fetching users:', error);
    }else {
        return data;
    }
}

export async function insertTodo(task:ToDo){
    const {error} = await supabase
    .from('Todo')
    .insert([task])
    await showTodoList()
    if(error){
        console.log('Error adding todo:', error)
    }
}

export async function editTodo(id: string, newText: string) {
    const {error} = await supabase
    .from('Todo')
    .update({task: `${newText}`})
    .eq('id', id)
    await showTodoList()
    if (error){
        console.error('Error editing todo:', error)
    }
}

export async function completeTodo(task: ToDo[]) {
    const status = task[0].completed ? false : true;
    const {error} = await supabase
    .from('Todo')
    .update({completed: status})
    .eq('id', task[0].id);
     await showTodoList();
    if (error){
     console.error('Error updating todo:', error);
    }
}

export async function deleteTodo(id: string) {
    const {error} = await supabase
    .from('Todo')
    .delete()
    .eq('id', id)
    await showTodoList()

    if (error){
        console.error('Error deleting todo:', error);
       }
}

export async function getTodo(id: string) {
    const {data, error} = await supabase
    .from('Todo')
    .select()
    .eq('id', id)
    if (error){
        console.error('Error fetching todo:', error);
    } else {
        return data;
    }
}
export async function getTodoStatus(id: string) {
    const {data, error} = await supabase
    .from('Todo')
    .select()
    .eq('id', id)
    if (error){
        console.error('Error fetching todo:', error);
    } else {
        completeTodo(data);
    }
}

export async function deleteTodoList() {
    const {error} = await supabase
    .from('Todo')
    .delete()
    .gte('id', 0)
    await showTodoList()

    if (error){
        console.error('Error deleting todolist:', error);
    }
}



