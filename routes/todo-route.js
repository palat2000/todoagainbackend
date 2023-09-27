const express = require("express");
const todoController = require("../controller/todo-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const router = express.Router();

router.use(authenticateMiddleware);

router.get("/", todoController.getAllTodo);

router.post("/", todoController.createTodo);

module.exports = router;
