// buildings.js - Buildings route module.

var express = require('express');
var router = express.Router();
const pool = require('../mysql')

router.get('/:buildingId', (req, res) => {
    const query = 
    `SELECT be.idlevels, name, A1A3, A4, B4_m, B4_t, hierarchy, idparent
    FROM buildingelements AS be
    INNER JOIN levels AS l
    ON be.idlevels = l.idlevels
    WHERE idbuildings = ${req.params.buildingId}`;

    console.log("Query: " + query)
    pool.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

module.exports = router;