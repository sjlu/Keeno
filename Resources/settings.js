Keeno.Settings = {};

Keeno.Settings.init = function()
{
	this.win = Ti.UI.createWindow({
		title: 'Settings'
	});
	
	this.tableview_data = [];
	
	this.tableview_data.push({header: 'Account', title: 'Logout', hasChild: true});
	
	this.tableview = Ti.UI.createTableView({height: 380, style: Ti.UI.iPhone.TableViewStyle.GROUPED, data: Keeno.Settings.tableview_data});
	this.tableview.addEventListener('click', function(e)
	{
		if (e.rowData.title == 'Logout')
		{
			Ti.Facebook.logout();
		}
	});
	
	this.win.add(this.tableview);
};

Keeno.Settings.execute = function()
{
	
};