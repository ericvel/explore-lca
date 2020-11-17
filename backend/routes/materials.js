// materials.js - Materials route module.

var express = require('express');
var router = express.Router();
const pool = require('../mysql')

router.get('/:buildingId', (req, res) => {
    const query = 
    `SELECT m.idmaterials, source, name, sourceType, dataYear, FU, density, EEf_A1A3, m.comments, materialCat, mi.idbuilding_elements, idlevels, quantity, RSL_mi, RSL, mi.A1A3, mi.A4, mi.B4_m, mi.B4_t
    FROM materials AS m
    JOIN materialcat AS mc
    ON m.idmaterialCat = mc.idmaterialCat
    JOIN materialinventory AS mi
    ON m.idmaterials = mi.idmaterials
    JOIN buildingelements as be
    ON mi.idbuilding_elements = be.idbuilding_elements
    JOIN buildings as b
    ON be.idbuildings = b.idbuildings
    WHERE b.idbuildings = ${req.params.buildingId}`;

    console.log("Get materials")
    pool.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

module.exports = router;