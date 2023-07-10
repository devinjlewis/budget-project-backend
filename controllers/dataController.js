const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let dataModel = require("../models/dataModel");

router.get("/", (req, res) => {
    res.json(dataModel);
});

router.get("/get-item-by-id/:id", (req, res) => {
    const { id } = req.params;

    const match = dataModel.find((item) => item.id === id);

    if (!match) {
        res.status(404).json({
            status: false,
            message: "Id not found",
        });
    } else {
        res.json({ status: true, data: match });
    }
});

router.post("/create-todo", (reßq, res) => {
    const { todo } = req.body;

    if (!todo) {
        res.status(400).json({
            status: false,
            message: "You cannot create an empty todo",
        });
    } else {
        const newTodo = {
            id: uuidv4(),
            todo,
            done: false,
        };

        dataModel.push(newTodo);

        res.status(201).json({ status: true, data: newTodo });
    }
});

router.delete("/delete-todo-by-id/:id", (req, res) => {
    const { id } = req.params;

    let foundIndex = dataModel.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
        res.status(404).json({
            status: false,
            message: "sorry, no todo with this id is found",
        });
    } else {
        let foundTodo = dataModel[foundIndex];

        let newTodo = dataModel.filter((item) => item.id !== id);

        dataModel = newTodo;

        res.json({
            status: true,
            message: "success",
            data: foundTodo,
        });
    }
});

router.put("/update-todo-by-id/:id", (req, res) => {
    const id = req.params.id;

    const foundIndex = dataModel.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
        res.status(404).json({ status: false, message: "Id not found!" });
    } else {
        let foundTodo = dataModel[foundIndex];

        let newObj = {
            ...foundTodo,
            ...req.body,
        };

        dataModel.splice(foundIndex, 1, newObj);

        res.json({ message: "success", status: true, data: newObj });
    }
});

module.exports = router;
