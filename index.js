require("dotenv").config();
const express = require("express");

const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();
const PORT = parseInt(process.env.PORT);
if (!PORT) {
  throw new Error(
    "PORT is not set in the .env file. Please ensure it is set to a valid value."
  );
}

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/settings", settingsRoutes);

// const authenticate = require("../middlewares/authenticationMiddleware");
// const authorize = require("../middlewares/authorizationMiddleware");
// app.get("/", authenticate, authorize("ADMIN"), (req, res) => {
//   res.status(200).send({ status: 200, message: "Hello World!" });
// });

app.all("*", (req, res) => res.sendStatus(404));
app.use("/uploads", express.static("uploads"));
app.use(errorHandlingMiddleware);
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));
