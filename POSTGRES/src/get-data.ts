import { getClient } from "./utils";

async function getUsers(){
    const client = await getClient()

    const selectUsersText = "SELECT * FROM users";
    const usersInDb = await client.query(selectUsersText);
    console.log("Users:");
    for(let user of usersInDb.rows){
        console.log(`ID: ${user.id} ,Email: ${user.email}`);
    }
}

async function getUserFromEmail(email:string){
    const client = await getClient()
    const selectUsersText ="SELECT * FROM users WHERE email= $1"
    const usersInDb = await client.query(selectUsersText,[email]);
    console.log("Single user details:");
    for(let user of usersInDb.rows){
        console.log(`ID: ${user.id} ,Email: ${user.email}`);
    }
}
async function getTodosForUser(userId:number){
    const client = await getClient();

    const selectTodoText = "SELECT * FROM todos WHERE user_id = $1";
    const todosForUser = await client.query(selectTodoText,[userId]);

    console.log("Todos of userId "+userId);
    for(let todo of todosForUser.rows ){
        console.log(`Id: ${todo.id},Title ${todo.title} , Description: ${todo.description}, Done: ${todo.done}`);

    }


}
// getUsers();
// getUserFromEmail("aaqib710@gmail.com")
getTodosForUser(5)
