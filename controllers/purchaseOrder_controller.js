/*Module*/
var express = require('express');
var db = require('../db_config');
var app = express();
module.exports = app;


app.get('/view', function (req, res) {
    db.qb.get('raw_material', function (err, results) {


        var data = {
            base_url: db.base_url,
            title: "PurchaseOrder",
            raw_material_info_list: results
        }
        res.render("view_purchase_order", data);

    })
})
