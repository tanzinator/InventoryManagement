/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validate = require('form-validate');

/*Custom Module*/
var home_controller = require('./controllers/home_controller');
var product_info_controller = require('./controllers/product_info_controller');
var product_sell_controller = require('./controllers/product_sell_controller');
var supplier_controller = require('./controllers/supplier_controller');
var outlet_controller = require('./controllers/outlet_controller');
var raw_material_controller = require('./controllers/raw_material_controller');
var purchaseOrder_controller = require('./controllers/raw_material_controller');



/* Start the server*/
app.listen(process.env.PORT || 5000, function (req, res) {
	console.log("Server Strats In Port 1000");
});

/*config*/
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validate(app));


/*Middleware*/
app.use('/public', express.static('./public'));
app.use('/', home_controller);
app.use('/product_info', product_info_controller);
app.use('/product_sell', product_sell_controller);
app.use('/supplier', supplier_controller);
app.use('/outlet', outlet_controller);
app.use('/raw_material', raw_material_controller);
app.use('/purchaseOrder', purchaseOrder_controller);
