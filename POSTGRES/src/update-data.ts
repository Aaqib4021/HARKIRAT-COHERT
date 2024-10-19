import { getClient } from "./utils";


async function updateTodo(todoId: number,){
    const client =  await getClient();

    const selectTodoText ="UPDATE todos SET done = $1 WHERE id = $2";
    await client.query(selectTodoText,[true ,todoId]);

    console.log(`todo updated of id${todoId}`);
}
updateTodo(1);
 