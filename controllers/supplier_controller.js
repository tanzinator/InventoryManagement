/*Module*/
var express = require('express');
var db = require('../db_config');
var app = express();
module.exports = app;


/*route*/

app.get('/create', function (req, res) {

	var data = {
		title: "Create New Supplier",
		base_url: db.base_url,
		errors: '',
	}
	res.render('view_add_supplier', data);

});
app.post('/insert_supplier', function (req, res) {
		var insert_supplier = {
            'supplier_businessname': req.body.business_name,
            'supplier_address' : req.body.address,
            'supplier_phone' : req.body.phone,
            'supplier_email' : req.body.email,
            'product_details': req.body.details,
            'supplier_contactname' : req.body.contact_name,
            'supplier_gstin' : req.body.gstin,
		}
		// insert supplier
		db.qb.insert('supplier', insert_supplier, function (error, results) {
            console.log(results)

		});

		res.redirect('/');

});

app.get('/view', function(req,res) {
    db.qb.get('supplier', function(err, results) {

        var data = {
            base_url:db.base_url,
            title:"Suppliers",
            supplier_info_list:results
        }
        res.render("view_suppliers", data);

    })
})