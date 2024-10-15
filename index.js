require("dotenv").config();
const express = require("express");

const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);

// const authenticate = require("../middlewares/authenticationMiddleware");
// const authorize = require("../middlewares/authorizationMiddleware");
// app.get("/", authenticate, authorize("ADMIN"), (req, res) => {
//   res.status(200).send({ status: 200, message: "Hello World!" });
// });

app.all("*", (req, res) => res.sendStatus(404));
app.use(errorHandlingMiddleware);

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));
