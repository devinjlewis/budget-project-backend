const { v4: uuidv4 } = require("uuid");

const todoModel = [
    {
        id: uuidv4(),
        todo: "walk the dog",
        done: false,
    },
    {
        id: uuidv4(),
        todo: "walk the cat",
        done: false,
    },
    {
        id: uuidv4(),
        todo: "walk the hamster",
        done: true,
    },
];

module.exports = todoModel;
