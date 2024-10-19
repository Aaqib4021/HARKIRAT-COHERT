"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const selectUsersText = "SELECT * FROM users";
        const usersInDb = yield client.query(selectUsersText);
        console.log("Users:");
        for (let user of usersInDb.rows) {
            console.log(`ID: ${user.id} ,Email: ${user.email}`);
        }
    });
}
function getUserFromEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const selectUsersText = "SELECT * FROM users WHERE email= $1";
        const usersInDb = yield client.query(selectUsersText, [email]);
        console.log("Single user details:");
        for (let user of usersInDb.rows) {
            console.log(`ID: ${user.id} ,Email: ${user.email}`);
        }
    });
}
function getTodosForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const selectTodoText = "SELECT * FROM todos WHERE user_id = $1";
        const todosForUser = yield client.query(selectTodoText, [userId]);
        console.log("Todos of userId " + userId);
        for (let todo of todosForUser.rows) {
            console.log(`Id: ${todo.id},Title ${todo.title} , Description: ${todo.description}, Done: ${todo.done}`);
        }
    });
}
// getUsers();
// getUserFromEmail("aaqib710@gmail.com")
getTodosForUser(5);
