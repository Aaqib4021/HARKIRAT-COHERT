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
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const insertUsersText = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
        const userValues = ["aaqib710@gmail.com", "myownpassword"];
        let response = yield client.query(insertUsersText, userValues);
        console.log(response);
        const insertTodosText = "INSERT INTO todos (title,description,user_id) VALUES ($1, $2, $3) RETURNING id";
        const todosValue = ["go to gym", "i have to go to the gym to train arms today", response.rows[0].id];
        yield client.query(insertTodosText, todosValue);
        console.log("Entries Created");
    });
}
insertData();
