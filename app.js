require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error");
const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/auth", authRoute);

app.use("/todo", todoRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("server running on port " + PORT));
