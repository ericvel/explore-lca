require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
var buildings = require("./routes/buildings.js");
var building_elements = require("./routes/building_elements.js");
var material_inventory = require("./routes/material_inventory.js");

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log("Path: ", path.join(__dirname, "../build", "index.html"));
  console.log("User env: ", process.env.MYSQL_USER);
  console.log(`⚡ Express server now listening on port ${port}`);
});

app.use("/buildings", buildings);
app.use("/building_elements", building_elements);
app.use("/material_inventory", material_inventory);
