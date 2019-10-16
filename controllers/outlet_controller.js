/*Module*/
var express = require('express');
var db = require('../db_config');
var app = express();
module.exports = app;


/*route*/

app.get('/create', function (req, res) {

    var data = {
        title: "Create New Outlet",
        base_url: db.base_url,
        errors: '',
    }
    res.render('view_add_outlet', data);

});


app.post('/insert_outlet', function (req, res) {
    var insert_outlet = {
        'outlet_name': req.body.outlet_name,
        'outlet_gstin': req.body.outlet_gstin,
        'outlet_shippingaddress': req.body.outlet_shipping_address,
        'outlet_phone': req.body.outlet_phone,
        'outlet_email': req.body.outlet_email,
        'outlet_billingaddress': req.body.outlet_billing_address,
    }
    // insert outlet
    db.qb.insert('outlet', insert_outlet, function (error, results) {
        console.log(results)

    });

    res.redirect('/');

});

app.get('/view', function (req, res) {
    db.qb.get('outlet', function (err, results) {

        var data = {
            base_url: db.base_url,
            title: "Outlets",
            outlet_info_list: results
        }
        res.render("view_outlets", data);

    })
})

app.get('/delete/:outlet_id', function (req, res) {
    var deleted_id = req.params.outlet_id;
    db.qb.delete('outlet', { outlet_id: deleted_id }, function (error, results) { });
    res.redirect('/');
})