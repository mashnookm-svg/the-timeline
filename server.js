const express = require("express");
const routes = require("./config/routes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

