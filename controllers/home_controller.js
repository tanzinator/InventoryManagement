/*Module*/
var express = require('express');
var db = require('../db_config');
var app = express();
module.exports = app;


/*route*/
app.get('/', function (request, response) {

	db.qb.get('raw_material', function (error, results) {

		var data = {
			base_url: db.base_url,
			title: " Inventory",
			raw_material_info_list: results,
		}
		response.render("view_home", data);

	});
});

app.get('/home', function (request, response) {

	response.redirect('/');

});

