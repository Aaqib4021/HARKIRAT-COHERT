 import { getClient } from "../utils";

 async function getUserAndTodosWithJoin(userId: number){
    const client = await getClient();

    const joinQuery =`
    SELECT users.*,todos.title,todos.description,todos.done
    FROM users
    LEFT JOIN todos ON users.id = todos.user_id
    WHERE users.id = $1
    `;
    //!why writing LEFT there
    //ans-->check copy
    const response = await client.query(joinQuery,[userId])
    const results = response.rows
    console.log(results);

 }
 getUserAndTodosWithJoin(5)
