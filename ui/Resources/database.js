Keeno.Database = {};

Keeno.Database.init = function ()
{
	this.db = Ti.Database.open("messaging");
};
	
Keeno.Database.close = function ()
{
	this.db.close();
};
	
Keeno.Database.createTables = function ()
{
	this.db.execute('CREATE TABLE IF NOT EXISTS users (ID INT, NAME TEXT, NEW INT, TIME INT)');
	this.db.execute('CREATE TABLE IF NOT EXISTS msgs (ID INT, NAME TEXT, PHOTO TEXT, MESSAGE TEXT, TIME INT, NEW INT)');
};