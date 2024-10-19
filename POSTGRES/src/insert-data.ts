import { getClient } from "./utils";


async function insertData(){
    const client= await getClient()
    const insertUsersText = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
    const userValues =["aaqib710@gmail.com","myownpassword"];

    let response = await client.query(insertUsersText,userValues);
    console.log(response);

    const insertTodosText =  "INSERT INTO todos (title,description,user_id) VALUES ($1, $2, $3) RETURNING id";
    const todosValue = ["go to gym","i have to go to the gym to train arms today",response.rows[0].id]
    await client.query(insertTodosText,todosValue);
    console.log("Entries Created");
}

insertData()
  