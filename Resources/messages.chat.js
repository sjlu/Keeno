Keeno.Messages.Chat = {};

(function() {
	Keeno.Messages.Chat.init = function()
	{
		this.win = Ti.UI.createWindow({ backgroundColor: '#fff' });
	
		this.win.addEventListener('blur', Keeno.Messages.Chat.restoreView);
	
		this.textBarView = Ti.UI.createView({
		   height: 40,
		   bottom: 0,
			width: 320,
			backgroundImage: 'images/textbar/bg.png'
		});

		this.textBarField = Ti.UI.createTextField({
		   height: 40,
		   width: 251,
			left: 5,
	//	   returnKeyType: Ti.UI.RETURNKEY_SEND,
			backgroundImage: 'images/textbar/field.png',
			paddingLeft: 15,
			clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
		   borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
			suppressReturn: false,
			font: {fontSize: 15 }
		});

		this.textBarField.addEventListener('focus', function(e)
		{
			setTimeout(function () 
			{ 
				Keeno.Messages.Chat.textBarView.animate({bottom: '167'}); 
				Keeno.Messages.Chat.tableview.animate({bottom: '205', height: '163'}) ;
				Keeno.Messages.Chat.tableview.scrollToIndex(Keeno.Messages.Chat.table_data.length-1);
			}, 110);
		});
	
		this.textBarField.addEventListener('change', function(e)
		{
			if (e.value.trim() == "")
			{
				Keeno.Messages.Chat.textBarSendButton.enabled = false;
			}
			else
			{
				Keeno.Messages.Chat.textBarSendButton.enabled = true;
			}
		})

	//	this.textBarField.addEventListener('return', Keeno.Messages.Chat.send);
	
		this.textBarSendButton = Ti.UI.createButton({
			backgroundImage: 'images/textbar/sendbutton.png',
			top: 8, right: 5,
			height: 27,
			width: 60,
			title: 'Send',
			enabled: false,
			font: {fontSize: 14, fontWeight: 'bold'},
		});
	
		this.textBarSendButton.addEventListener('click', Keeno.Messages.Chat.send);
	
		this.tableview = Titanium.UI.createTableView({bottom: '40', height: '328'});
		this.tableview.addEventListener('click', Keeno.Messages.Chat.restoreView);
	
		this.table_data = [];
	
		this.textBarView.add(this.textBarField);
		this.textBarView.add(this.textBarSendButton);
		this.win.add(this.textBarView);
		this.win.add(this.tableview);
	
		this.xhr = Titanium.Network.createHTTPClient();
	
		this.xhr.onload = function ()
	   {
			var response = JSON.parse(this.responseText);
	      Keeno.Database.db.execute('INSERT INTO msgs (ID, NAME, PHOTO, MESSAGE, TIME, NEW) VALUES (?,?,?,?,?,1)', Keeno.Messages.currentChat, Keeno.User.first_name, Keeno.User.pic_square, response.msg, response.time);
		
			Keeno.Database.db.execute('DELETE FROM users WHERE id = ?', Keeno.Messages.currentChat);
			Keeno.Database.db.execute('INSERT INTO users (ID, NAME, NEW, TIME) VALUES (?, ?, ?, ?)', Keeno.Messages.currentChat, Keeno.Messages.Chat.win.title, 0, response.time);
		};
	
		// black view
		this.activity_view = Ti.UI.createView({
			height:75,
			width:180,
			bottom:240,
			backgroundColor:'#000',
			borderRadius:10,
			opacity:0.8
		});

		// loading indicator
		this.activity_indicator = Ti.UI.createActivityIndicator({
			style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
			message: '\nSending...',
			color: '#ffffff',
			height:30,
			width:30
		});
	
		this.activity_indicator.show();
		this.activity_view.add(this.activity_indicator);
		this.activity_view.hide();
		this.win.add(this.activity_view);
	};

	Keeno.Messages.Chat.restoreView = function(e)
	{
		Keeno.Messages.Chat.textBarView.bottom = 0;
		Keeno.Messages.Chat.tableview.animate({bottom: '40', height: '328'});
		Keeno.Messages.Chat.textBarField.blur();
		Keeno.Messages.currentChat = 0;
	};

	Keeno.Messages.Chat.execute = function()
	{
		this.my_photo = Keeno.Discover.fetchImage(Keeno.User.pic_square);
		//setInterval(Keeno.Messages.Chat.refresh, 1500);
	};

	Keeno.Messages.Chat.open = function(e)
	{
		e.row.dot.hide();
		Keeno.Messages.Chat.win.close();
		Keeno.Messages.Chat.win.title = e.row.name;
	   Keeno.Messages.currentChat = e.row.fbid;
	   Keeno.Messages.Chat.drawInit();
		Keeno.Messages.Chat.tableview.scrollToIndex(Keeno.Messages.Chat.table_data.length-1, {animated: false});
	   Keeno.Tabs.messagesTab.open(Keeno.Messages.Chat.win, {animated: true});
	};

	Keeno.Messages.Chat.drawInit = function()
	{
		var rows = Keeno.Database.db.execute('SELECT * FROM msgs WHERE id = ? ORDER BY time DESC LIMIT 10', Keeno.Messages.currentChat);
		Keeno.Database.db.execute('UPDATE msgs SET new = 0 WHERE id = ?', Keeno.Messages.currentChat);
	
		this.table_data = [];

		var photo_url = Keeno.Database.db.execute('SELECT photo FROM msgs WHERE id = ? AND name = ? LIMIT 1', Keeno.Messages.currentChat, Keeno.Messages.Chat.win.title);
	
		this.their_photo = null;
		if (photo_url.isValidRow())
		{
			this.their_photo = Keeno.Discover.fetchImage(photo_url.field(0));
		}
	
	   while (rows.isValidRow())
	   {
	      this.table_data.unshift(Keeno.Messages.Chat.drawRow(rows));
	      rows.next();
	   }

	   this.tableview.setData(this.table_data);
	};

	Keeno.Messages.Chat.drawRow = function(rows)
	{
		var row = Titanium.UI.createTableViewRow({height: 'auto', selectionStyle: 0, hasChild: false, timestamp: rows.field(4)});
	
		var photo = '';

		if (Keeno.Messages.Chat.win.title == rows.field(1))
		{
			photo = Keeno.Messages.Chat.their_photo;
		}
		else
		{
			photo = Keeno.Messages.Chat.my_photo;
		}

		row.add(Ti.UI.createImageView({
			image: photo,
			width: 30,
			height: 30,
			borderRadius: 2,
			top: 10, left: 5
		}));

		row.add(Ti.UI.createLabel({
			text: rows.field(1),
			height: 15,
			top: 10, left: 45,
			font: { fontFamily: 'Helvetica Neue', fontWeight: 'bold', fontSize: 16 }
		}));

		row.add(Ti.UI.createLabel({
			text: Keeno.timeToString(rows.field(4)),
			height: 12,
			width: 'auto',
			top: 13, right: 10,
	 		color: '#3078da',
			font: { fontFamily: 'Helvetica Neue', fontSize: 13 }
		}))

	   row.add(Ti.UI.createLabel({
	      text: rows.field(3),
	      height: 'auto',
			width: 265,
			top: 26, left: 45, bottom: 5,
			font: { fontFamily: 'Helvetica Neue', fontSize: 14 }
	   }));

		row.className = 'msg';

		return row;
	};

	Keeno.Messages.Chat.refresh = function(e)
	{
		if (Keeno.Messages.currentChat == 0)
		{
			return;
		}
	
		var rows = Keeno.Database.db.execute('SELECT * FROM msgs WHERE id = ? AND new = 1 ORDER BY time ASC', Keeno.Messages.currentChat);
		Keeno.Database.db.execute('UPDATE msgs SET new = 0 WHERE id = ?', Keeno.Messages.currentChat);

		while(rows.isValidRow())
		{
			if (Keeno.Messages.Chat.their_photo == null && Keeno.Messages.Chat.win.title == rows.field(1))
			{
				Keeno.Messages.Chat.their_photo = Keeno.Discover.fetchImage(rows.field(2));
			}
		
			var new_row = Keeno.Messages.Chat.drawRow(rows);
			Keeno.Messages.Chat.table_data.push(new_row);
		
			if (Keeno.Messages.Chat.table_data.length == 1)
			{
				Keeno.Messages.Chat.tableview.appendRow(new_row);
			}
			else
			{
				Keeno.Messages.Chat.tableview.insertRowAfter(Keeno.Messages.Chat.table_data.length-2, new_row);
			}
		
			Keeno.Messages.Chat.tableview.scrollToIndex(Keeno.Messages.Chat.table_data.length-1, {animated: true});
			rows.next();
		}
	
		Keeno.Messages.Chat.activity_view.hide();
	};

	Keeno.Messages.Chat.send = function(e)
	{
		Keeno.Messages.Chat.activity_view.show();
	
		Keeno.Messages.Chat.textBarSendButton.enabled = false;

	   Keeno.Messages.Chat.xhr.open("GET", Keeno.serverURL+"msg.php?fbid_from="+Keeno.User.uid+"&fbid_to="+Keeno.Messages.currentChat+"&message="+
			Ti.Network.encodeURIComponent(Keeno.Messages.Chat.textBarField.value.trim()));
		Keeno.Messages.Chat.xhr.send();

		Keeno.Messages.Chat.textBarField.value = "";
	};
})();