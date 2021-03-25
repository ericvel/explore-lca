require("dotenv").config();
const functions = require('firebase-functions')
const express = require("express");
const app = express();
const cors = require("cors");
var buildings = require("./routes/buildings.js");
var building_elements = require("./routes/building_elements.js");
var material_inventory = require("./routes/material_inventory.js");

var corsOptions = {
  origin: "https://blcad-gui.web.app",
};

app.use(cors(corsOptions));
// console.log(process.env.NODE_ENV);
app.use("/buildings", buildings);
app.use("/building_elements", building_elements);
app.use("/material_inventory", material_inventory);

exports.api = functions.https.onRequest(app)