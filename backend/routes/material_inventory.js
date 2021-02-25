// materials.js - Materials route module.

var express = require("express");
var router = express.Router();
const pool = require("../mysql");

router.get("/:buildingId", (req, res) => {
  /* const query = `SELECT idmaterialInventory, mi.idmaterials, m.name, source, dataType, sourceType, dataYear, FU, density, EEf_A1A3, RSL, m.comments, materialCat, quantity, RSL_mi, mi.A1A3, mi.A4, mi.B4_m, mi.B4_t, mi.idbuilding_elements, l.name AS buildingElementName 
    FROM materialinventory AS mi
    JOIN materials AS m
    ON mi.idmaterials = m.idmaterials
    JOIN materialcat AS mc
    ON m.idmaterialCat = mc.idmaterialCat
    JOIN buildingelements as be
    ON mi.idbuilding_elements = be.idbuilding_elements
    JOIN levels as l
    ON be.idlevels = l.idlevels
    JOIN buildings as b
    ON be.idbuildings = b.idbuildings
    WHERE b.idbuildings = ${req.params.buildingId}`; */

  const query = `SELECT idmaterialInventory, mi.idmaterials as parentId, m.name, quantity, FU, mi.A1A3, mi.A4, mi.B4_m, mi.B4_t, RSL_mi, mi.idbuilding_elements, le.name AS buildingElementName, materialCat, sourceType, source, dataType, dataYear, density, EEf_A1A3, RSL, country, city, m.comments
    FROM materialinventory AS mi
    JOIN materials AS m
    ON mi.idmaterials = m.idmaterials
    JOIN buildingelements as be
    ON mi.idbuilding_elements = be.idbuilding_elements
    JOIN levels as le
    ON be.idlevels = le.idlevels
    JOIN buildings as b
    ON be.idbuildings = b.idbuildings
    JOIN materialcat AS mc
    ON m.idmaterialCat = mc.idmaterialCat
    LEFT JOIN location as lo
    ON m.idlocationproduction = lo.idlocation    
    WHERE b.idbuildings = ${req.params.buildingId}`;

  console.log("Get material inventory");
  pool.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
