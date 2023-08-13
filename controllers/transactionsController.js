const express = require("express");
const router = express.Router();
let transactionsArray = require("../models/transactionsModel");

router.get("/", (req, res) => {
    res.json(transactionsArray);
});
router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (!transactionsArray[id]) {
        res.status(404).redirect("/not-found");
    } else {
        res.json(transactionsArray[id]);
    }
});
router.post("/", (req, res) => {
    const newTrans = req.body;
    if (!newTrans) {
        res.status(400).json({
            status: false,
            message: "You cannot create an empty transaction",
        });
    } else {
        transactionsArray.push(newTrans);

        res.status(201).json(transactionsArray);
    }
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    let foundIndex = transactionsArray[id];
    if (!foundIndex) {
        res.status(404).json({
            status: false,
            message: "sorry, no transaction with this ID found",
        });
    } else {
        transactionsArray.splice(id, 1);
        res.json(transactionsArray);
    }
});
router.put("/:id", (req, res) => {
    const newLog = req.body;
    const { id } = req.params;
    let foundIndex = transactionsArray[id];
    if (!foundIndex) {
        res.status(404).json({
            status: false,
            message: "sorry, no transaction with this ID found",
        });
    } else {
        transactionsArray[id] = newLog;
        res.json(transactionsArray[id]);
    }
});
router.get("/not-found", (req, res) => {
    res.send("Page not found.");
});
module.exports = router;
