require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8000;
var buildings = require("./routes/buildings.js");
var building_elements = require("./routes/building_elements.js");
var material_inventory = require("./routes/material_inventory.js");

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));
console.log(process.env.NODE_ENV);
app.use("/api/buildings", buildings);
app.use("/api/building_elements", building_elements);
app.use("/api/material_inventory", material_inventory);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));
  // Handle React routing, return all requests to React app
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`⚡ Express server now listening on port ${port}`)
);
