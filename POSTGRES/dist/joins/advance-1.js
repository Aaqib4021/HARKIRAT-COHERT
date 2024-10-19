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
const utils_1 = require("../utils");
function getUserAndTodosWithJoin(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const joinQuery = `
    SELECT users.*,todos.title,todos.description,todos.done
    FROM users
    LEFT JOIN todos ON users.id = todos.user_id
    WHERE users.id = $1
    `;
        const response = yield client.query(joinQuery, [userId]);
        const results = response.rows;
        console.log(results);
    });
}
getUserAndTodosWithJoin(5);
