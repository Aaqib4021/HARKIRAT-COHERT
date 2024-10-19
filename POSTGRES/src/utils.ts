import { Client } from "pg";


export async function getClient(){
    const client = new Client("postgresql://testDB_owner:JZB2pUKOYVQ4@ep-tiny-union-a5s6xbbn.us-east-2.aws.neon.tech/testDB?sslmode=require")
    await client.connect()
    return client;
}
