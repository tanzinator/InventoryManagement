/*Module*/
var express = require('express');
var db = require('../db_config');
var app = express();
module.exports = app;


/*route*/

app.get('/create', function (req, res) {
    db.qb.get('outlet', function (err, outlet_res) {
        db.qb.get('supplier', function (err, supplier_res) {

            var data = {
                title: "Create New Raw Material",
                base_url: db.base_url,
                errors: '',
                outlet_info_list: outlet_res,
                supplier_info_list: supplier_res
            }
            res.render('view_add_raw_material', data);
        })
    })

});
app.post('/insert_raw_material', function (req, res) {
    var insert_raw_material = {
        'raw_material_name': req.body.raw_material_name,
        'outlet_name': req.body.outlet_name,
        'supplier_businessname': req.body.supplier_businessname,
        'primary_unit': req.body.primary_unit,
        'secondary_unit': req.body.secondary_unit,
        'raw_material_quantity': req.body.raw_material_quantity,
        'raw_material_price': req.body.raw_material_price

    }
    // insert raw_material
    db.qb.insert('raw_material', insert_raw_material, function (error, results) {
        console.log(results)

    });

    res.redirect('/');

});

app.get('/view', function (req, res) {
    db.qb.get('raw_material', function (err, results) {


        var data = {
            base_url: db.base_url,
            title: "Raw Materials",
            raw_material_info_list: results
        }
        res.render("view_raw_materials", data);

    })
})


app.get('/add', function (req, res) {
    db.qb.get('raw_material', function (err, results) {
        var data = {
            base_url: db.base_url,
            title: "Add Stock",
            raw_material_add_stock_list: results
        }
        res.render("view_add_raw_material_stock", data);

    })
})

app.get('/dispatch', function (req, res) {
    db.qb.get('raw_material', function (err, results) {
        db.qb.get('outlet', function (err, outlet_results) {


            var data = {
                base_url: db.base_url,
                title: "Dispatch Raw Materials",
                raw_material_info_list: results,
                outlet_info_list: outlet_results
            }
            res.render("view_add_dispatch", data);
        })
    })

})

app.post('/insert_dispatch', function (req, res) {
    var insert_dispatch = {
        'raw_material_name': req.body.raw_material_name,
        'raw_material_quantity_dispatched': req.body.raw_material_quantity,
        'outlet_from': req.body.from_outlet,
        'outlet_to': req.body.to_outlet
    }
    // insert raw_material
    db.qb.insert('dispatch_info', insert_dispatch, function (error, results) {
        console.log(results)

    });

    res.redirect('/raw_material/view_dispatch');

});

app.get('/view_dispatch', function (req, res) {
    db.qb.get('dispatch_info', function (err, results) {

        var data = {
            base_url: db.base_url,
            title: "Dispatch Raw Materials",
            dispatch_info_list: results
        }
        res.render("view_dispatch_info", data);
    })
})