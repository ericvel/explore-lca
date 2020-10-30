const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 8000;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

pool.config.connectionConfig.namedPlaceholders = true;

app.listen(port, () => {
  console.log(`⚡ Express server now listening on port ${port}`);
});

const formatSearchQuery = (searchQuery) => {
  console.log("SearchQuery: ", searchQuery)
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

app.get('/api/:table', (req, res) => {
  const table = req.params.table;
  const searchQuery = formatSearchQuery(req.query.search);
  const sortQuery = formatSortQuery(req.query.sort);
  const skip = req.query.skip;
  const take = req.query.take;

  const query = `SELECT * FROM ${table}${searchQuery}${sortQuery} LIMIT ${skip}, ${take}`;
  console.log("Query: " + query)
  pool.execute(query, (err, rows) => {
    if (err) {
      res.send(err);
    }
    else if (req.query.requireTotalCount == 'true') {
      // Append total row count to response object
      const countQuery = `select count(*) from ${req.params.table}${searchQuery}`;
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