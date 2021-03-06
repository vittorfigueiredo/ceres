require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { router } = require("./routes");

const app = express();

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Running in http://localhost:${process.env.PORT}`);
});
