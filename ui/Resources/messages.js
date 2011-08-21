Keeno.Messages = {};
Ti.include('messages.chat.js');

(function() {
	Keeno.Messages.init = function()
	{
		this.win = Ti.UI.createWindow({
			title: 'Messages'
		});
	
		this.tableview = Ti.UI.createTableView({height: '370', editable: true});
		this.tableview.addEventListener('delete', Keeno.Messages.onDelete);
		this.tableview.addEventListener('click', Keeno.Messages.Chat.open);
	
		this.win.add(this.tableview);
	
		this.prev_badge = 0;
	
		this.table_data = [];
	
		Keeno.Messages.Chat.init(); 
	
		this.currentChat = 0;
	};

	Keeno.Messages.refresh = function()
	{
		Keeno.Messages.updateBadge();
	
		var rows = Keeno.Database.db.execute('SELECT * FROM users ORDER BY time DESC');
	
		var top_table_row = Keeno.Messages.table_data[0];
		while(rows.isValidRow())
		{		
			if (top_table_row != null || top_table_row != undefined)
			{
				if (top_table_row.lastupdate >= rows.field(3))
				{
					break;
				}
			}
		
			for (var i = 0; i < Keeno.Messages.table_data.length; i++)
			{
			
				if (Keeno.Messages.table_data[i].fbid == rows.field(0))
				{
					Keeno.Messages.table_data.splice(i, 1);
					Keeno.Messages.tableview.deleteRow(i);
					break;
				}
			}
		
			var new_row = Keeno.Messages.drawRow(rows);
			Keeno.Messages.table_data.unshift(new_row);
			if (Keeno.Messages.table_data.length == 1)
			{
				Keeno.Messages.tableview.appendRow(new_row, {animated: false});
			}
			else
			{
				Keeno.Messages.tableview.insertRowBefore(0, new_row, {animated: false});
			}
		
			rows.next();
		}
	
		Keeno.Messages.Chat.refresh();
	};

	Keeno.Messages.updateBadge = function()
	{
		var count = Keeno.Database.db.execute('SELECT COUNT(*) FROM msgs WHERE new = 1 AND id != ?', Keeno.Messages.currentChat);
		count = count.field(0);
	
		if (count == 0)
		{
			Keeno.Tabs.messagesTab.badge = null;
		}
		else
		{
			if (count > Keeno.Messages.prev_badge)
			{
				Ti.Media.vibrate;
			}
		
			Keeno.Tabs.messagesTab.badge = count;
			Keeno.Messages.prev_badge = Keeno.Tabs.messagesTab.badge;
		}
	};

	Keeno.Messages.drawRow = function(rows)
	{
		var row = Ti.UI.createTableViewRow({
			className: 'user', 
			height: 'auto', 
			hasChild: true, 
			fbid: rows.field(0), 
			name: rows.field(1), 
			lastupdate: rows.field(3)
		});
	
		row.dot = Ti.UI.createImageView({
			image: 'images/dot.png',
			height: 12, width: 12,
			left: 10, top: 22
		});
	
		row.add(row.dot);
	
		if (rows.field(2) == 0 || Keeno.Messages.currentChat == rows.field(0))
		{
			row.dot.hide();
		}
	
		row.add(Titanium.UI.createLabel({
			text: rows.field(1),
			height: 16,
			width: 'auto',
			top: 10, left: 30,
			font: { fontFamily: 'Helvetica Neue', fontWeight: 'bold', fontSize: 18 }
		}));
	
		var last_msg = Keeno.Database.db.execute('SELECT message, time FROM msgs WHERE id = ? ORDER BY time DESC', rows.field(0));
	
		row.add(Ti.UI.createLabel({
			text: Keeno.timeToString(last_msg.field(1)),
			height: 13,
			width: 'auto',
			top: 12, right: 10,
			color: '#3078da',
			font: { fontFamily: 'Helvetica Neue', fontSize: 14 }
		}));
	
		row.add(Ti.UI.createLabel({
			text: last_msg.field(0),
			height: 18,
			width: 'auto',
			top: 32, left: 30, bottom: 10,
			color: '#666',
			font: { fontFamily: 'Helvetica Neue', fontSize: 15 }
		}));
	
		return row;
	}

	Keeno.Messages.drawInit = function(e)
	{
		var rows = Keeno.Database.db.execute('SELECT * FROM users ORDER BY time DESC');
	
		this.table_data = [];
		while (rows.isValidRow())
		{
			this.table_data.push(Keeno.Messages.drawRow(rows));
			rows.next();
		}
	
		Keeno.Messages.tableview.setData(this.table_data);
	}

	Keeno.Messages.onDelete = function(e)
	{
		Keeno.Database.db.execute('DELETE FROM users WHERE id = ?', e.rowData.fbid);
		Keeno.Database.db.execute('DELETE FROM msgs WHERE id = ?', e.rowData.fbid);
	
		for (var i = 0; i < Keeno.Messages.table_data.length; i++)
		{	
			if (Keeno.Messages.table_data[i].fbid == e.rowData.fbid)
			{
				Keeno.Messages.table_data.splice(i, 1);
				break;
			}
		}
	};

	Keeno.Messages.execute = function()
	{
		Keeno.Messages.drawInit();
		Keeno.Messages.updateBadge();
	
		Keeno.Messages.Chat.execute();
		Keeno.Messages.interval = setInterval(Keeno.Messages.refresh, 1500);
	};
})();