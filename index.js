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

app.all("*", (req, res) => res.sendStatus(404));
app.use("/uploads", express.static("uploads"));
app.use(errorHandlingMiddleware);
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));
