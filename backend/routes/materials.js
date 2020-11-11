// materials.js - Materials route module.

var express = require('express');
var router = express.Router();
const pool = require('../mysql')

const formatSearchQuery = (searchQuery) => {
    var formattedQuery = ``;
    if (searchQuery != "[]" && searchQuery != '') {
        const params = JSON.parse(searchQuery);
        const searchTerm = params.searchTerm;
        const searchableColumns = params.columns;
        if (searchTerm != '' && searchableColumns != '') {
            formattedQuery = ` WHERE concat(${searchableColumns}) like '%${searchTerm}%'`
        }
    }
    return formattedQuery;
}

const formatSortQuery = (sortQuery) => {
    var formattedQuery = ``;
    if (sortQuery != "[]" && sortQuery != '') {
        const params = JSON.parse(sortQuery)[0];
        const selector = params.selector;
        formattedQuery = ` ORDER BY ${selector}`
        if (params.desc == true) {
            formattedQuery += ` DESC`
        }
    }
    return formattedQuery;
}

router.get('/', (req, res) => {
    const searchQuery = formatSearchQuery(req.query.search);
    const sortQuery = formatSortQuery(req.query.sort);
    const skip = req.query.skip;
    const take = req.query.take;

    const query = `SELECT * FROM materials${searchQuery}${sortQuery} LIMIT ${skip}, ${take}`;
    console.log("Query: " + query)
    pool.execute(query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else if (req.query.requireTotalCount == 'true') {
            // Append total row count to response object
            const countQuery = `select count(*) from materials${searchQuery}`;
            pool.query(countQuery, (err, countObject) => {
                if (err) {
                    res.send(err);
                } else {
                    const count = countObject[0]['count(*)'];
                    const jsonObj = {
                        data: rows,
                        totalCount: count
                    }
                    res.send(jsonObj);
                }
            });
        } else {
            // Only rows without total count
            res.send(rows);
        }
    });
});

/* 
router.get('/count', (req, res) => {
    const query = `SELECT count(*) FROM materials`;
    console.log("Query: " + query)
    pool.query(query, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }); */

module.exports = router;