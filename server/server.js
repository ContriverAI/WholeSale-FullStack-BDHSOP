// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./routes/index");

// constructors
const app = express();

// declaring use
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// db connection and server ready
mongoose
  .connect("mongodb://localhost:27017/BDshop", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
    app.listen(5000, () => {
      console.log(`Server started at PORT 5000...`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect", err);
    process.exit();
  });

// api use
app.use("/api", api);
