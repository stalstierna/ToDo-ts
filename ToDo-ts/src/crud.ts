
import supabase  from "./supabaseClient";
import { ToDo } from "./main";
import { showTodoList } from "./main";
import { User } from "@supabase/supabase-js";

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('User signed in:', session);
        showTodoList(); // Ladda todos för inloggad användare
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
    }
});


export async function getTodos() {
    const user: User | null = (await supabase.auth.getUser()).data?.user;

    if (!user) {
        console.error('No user logged in');
        return;
    }
    const {error, data} = await supabase
    .from('Todo')
    .select()
    .eq('user_id', user.id)
    .order('id', { ascending: true });
    if (error){
        console.error('Error fetching users:', error);
    }else {
        return data;
    }
}

export async function insertTodo(task:ToDo){
    const user: User | null = (await supabase.auth.getUser()).data?.user;
    console.log(user)

    if (!user) {
        console.error('No user logged in');
        return;
    }

    const {error} = await supabase
    .from('Todo')
    .insert([{...task, user_id: user.id}]);
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

export async function createUser(email: string, password: string) {
    const {error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error){
        console.error('Error registering user:', error.message)
    } else{
        console.log("User registered!")
    }
}

export async function logInUser(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error){
        console.error('Error logging in user:', error.message)
    } else{
        console.log('User logged in!', data)
    }
}

export async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error logging out:', error.message);
    } else {
        console.log('User logged out successfully!');
    }
}


