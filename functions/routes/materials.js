// materials.js - Materials route module.

var express = require("express");
var router = express.Router();
const pool = require("../mysql");

router.get("/:buildingId", (req, res) => {
  const query = `SELECT DISTINCT m.idmaterials, name, FU, materialCat, sourceType, dataType, dataYear, density, EEf_A1A3, RSL, country, city, m.comments
	FROM materials as m
    JOIN materialInventory as mi    
    ON m.idmaterials = mi.idmaterials
    JOIN buildingelements as be
    ON mi.idbuilding_elements = be.idbuilding_elements
    JOIN buildings as b
    ON be.idbuildings = b.idbuildings
	  JOIN materialcat AS mc
	  ON m.idmaterialCat = mc.idmaterialCat
	  LEFT JOIN location as l
	  ON m.idlocationproduction = l.idlocation    
    WHERE b.idbuildings = ${req.params.buildingId}`;

  console.log("Get materials");
  pool.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
