/*My Sql Database Connection*/
var mysql = require('mysql');

var db_settings = {
	host: 'us-cdbr-iron-east-02.cleardb.net',
	user: 'b925987b32e5af',
	password: '44f7fa8d',
	database: 'stock_db'
};
var qb = require('node-querybuilder').QueryBuilder(db_settings, 'mysql', 'single');

module.exports.qb = qb;

/*Base Url*/
var base_url = 'mysql://b925987b32e5af:44f7fa8d@us-cdbr-iron-east-02.cleardb.net/heroku_6c45bd4f8ce0063?reconnect=true';
module.exports.base_url = base_url;
