const express = require('express');
const app = express();
const port = 8000;
var buildings = require('./routes/buildings.js');
var materials = require('./routes/materials.js');


app.listen(port, () => {
  console.log(`⚡ Express server now listening on port ${port}`);
});

app.use('/buildings', buildings);
app.use('/materials', materials);

/* 
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
*/