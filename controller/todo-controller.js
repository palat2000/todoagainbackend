const prisma = require("../models/prisma");
exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    const response = await prisma.todo.create({
      data: {
        title,
        completed,
        dueDate,
        user: {
          connect: req.user,
        },
      },
    });
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const data = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
      },
    });
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
