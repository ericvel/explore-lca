// buildings.js - Buildings route module.

var express = require('express');
var router = express.Router();
const pool = require('../mysql')

const formatSearchQuery = (searchQuery) => {
    var formattedQuery = ``;
    if (searchQuery !== "[]" && searchQuery !== '' && searchQuery !== undefined) {
        const params = JSON.parse(searchQuery);
        const searchTerm = params.searchTerm;
        const searchableColumns = params.columns;
        if (searchTerm !== '' && searchableColumns !== '') {
            formattedQuery = ` AND concat(${searchableColumns}) like '%${searchTerm}%'`
        }
    }
    return formattedQuery;
}

const formatSortQuery = (sortQuery) => {
    var formattedQuery = ` ORDER BY building_name`;
    if (sortQuery !== "[]" && sortQuery !== '' && sortQuery !== undefined) {
        const params = JSON.parse(sortQuery)[0];
        const selector = params.selector;
        formattedQuery = ` ORDER BY ${selector}`
        if (params.desc == true) {
            formattedQuery += ` DESC`
        }
    }
    return formattedQuery;
}

router.get('/lazyloading', (req, res) => {
    const searchQuery = formatSearchQuery(req.query.search);
    const sortQuery = formatSortQuery(req.query.sort);
    const skip = req.query.skip;
    const take = req.query.take;

    const query =
        `SELECT b.idbuildings, building_identifier, building_name, country, city, typology, construction_type, built_status, energy_ambition_level, A1A3, A4, B4_m, B4_t, project, calculation_method, main_data_source, study_type, study_year, lifetime, floor_area, heated_volume, area_footprint, area_roof, area_wall, area_windowAndDoor, heatloss_number, uval_walls, uval_windows, uval_doors, uval_ground, uval_roof, thermal_bridges, GWP_B6, GWP_B7, storiesAB, storiesBG, occupants, comments
        FROM buildings AS b
        INNER JOIN location AS l
        ON b.idlocation = l.idlocation
        INNER JOIN typology AS t
        ON b.idtypology = t.idtypology
        INNER JOIN constructiontype AS c
        ON b.idconstruction_type = c.idconstruction_type
        INNER JOIN builtstatus AS bs
        ON b.idbuilt_status = bs.idbuilt_status
        INNER JOIN energyambitionlevel AS eal
        ON b.idenergy_ambition_level = eal.idenergy_ambition_level
        INNER JOIN buildingelements as be
        ON b.idbuildings = be.idbuildings
        WHERE be.idlevels = 0
        ${searchQuery}${sortQuery}         
        LIMIT ${skip}, ${take}`;

    console.log("Query: " + query)
    pool.execute(query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else if (req.query.requireTotalCount == 'true') {
            // Append total row count to response object
            const countQuery = `select count(*) from buildings${searchQuery}`;
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

router.get('/', (req, res) => {
    const query =
        `SELECT b.idbuildings, building_identifier, building_name, country, city, typology, construction_type, built_status, energy_ambition_level, A1A3, A4, B4_m, B4_t, project, calculation_method, main_data_source, study_type, study_year, lifetime, floor_area, heated_volume, area_footprint, area_roof, area_wall, area_windowAndDoor, heatloss_number, uval_walls, uval_windows, uval_doors, uval_ground, uval_roof, thermal_bridges, GWP_B6, GWP_B7, storiesAB, storiesBG, occupants, comments
        FROM buildings AS b
        INNER JOIN location AS l
        ON b.idlocation = l.idlocation
        INNER JOIN typology AS t
        ON b.idtypology = t.idtypology
        INNER JOIN constructiontype AS c
        ON b.idconstruction_type = c.idconstruction_type
        INNER JOIN builtstatus AS bs
        ON b.idbuilt_status = bs.idbuilt_status
        INNER JOIN energyambitionlevel AS eal
        ON b.idenergy_ambition_level = eal.idenergy_ambition_level
        INNER JOIN buildingelements as be
        ON b.idbuildings = be.idbuildings
        WHERE be.idlevels = 0`;

    console.log("Query: " + query)
    pool.query(query, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/select/:buildingId', (req, res) => {
    const query =
        `SELECT b.idbuildings, building_identifier, building_name, country, city, typology, construction_type, A1A3, A4, B4_m, B4_t
    FROM buildings AS b
    INNER JOIN location AS l
    ON b.idlocation = l.idlocation
    INNER JOIN typology AS t
    ON b.idtypology = t.idtypology
    INNER JOIN constructiontype AS c
    ON b.idconstruction_type = c.idconstruction_type
    INNER JOIN buildingelements as be
    ON b.idbuildings = be.idbuildings
    WHERE b.idbuildings IN (${req.params.buildingId}) AND be.idlevels = 0`;

    console.log("Get building(s)")
    pool.query(query, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;