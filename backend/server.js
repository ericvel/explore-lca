const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 8000;
const table = 'buildings';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

app.listen(port, () => {
  console.log(`⚡ Express server now listening on port ${port}`);
});

const getSearchQuery = (request) => {
  if (request.query.search != '') {
    //where concat(building_name,project) like '%searchterm%'
  }
}

const getSortQuery = (request) => {
  var sortQuery = ``;
  if (request.query.sort != "[]") {
    var sortParams = JSON.parse(request.query.sort)[0];
    const selector = sortParams.selector;
    sortQuery = ` ORDER BY ${selector}`
    if (sortParams.desc == true) {
      sortQuery += ` DESC`
    }
  }
  return sortQuery;
}

app.get('/api/:table', (req, res) => {

  var searchTerm = req.query.search;
  console.log("Search term: ", searchTerm)
  var sortQuery = getSortQuery(req);

  const query = `SELECT * FROM ${req.params.table}${sortQuery} LIMIT ${req.query.skip}, ${req.query.take}`;
  console.log("Query: " + query)
  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    }
    else if (req.query.requireTotalCount == 'true') {   
      // Append total row count to response object
      const countQuery = `select count(*) from ${req.params.table}`;
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

app.get('/api/count/:table', (req, res) => {
  const query = `select count(*) from ${req.params.table}`;
  console.log("Query: " + query)
  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});