"use strict";
function getAge(user1, user2) {
    return user1.age + user2.age;
}
const result = getAge({
    name: "aaiab",
    age: 21
}, {
    name: "sahil",
    age: 10
});
console.log(result);
