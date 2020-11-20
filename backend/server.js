const express = require('express');
const app = express();
const port = 8000;
var buildings = require('./routes/buildings.js');
var building_elements = require('./routes/building_elements.js');
var material_inventory = require('./routes/material_inventory.js');


app.listen(port, () => {
  console.log(`⚡ Express server now listening on port ${port}`);
});

app.use('/buildings', buildings);
app.use('/building_elements', building_elements);
app.use('/material_inventory', material_inventory);
