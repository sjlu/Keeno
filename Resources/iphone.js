var Keeno = {};
Keeno.User = {};

/*
Application configuration varibles
*/
Ti.Facebook.appid = '134988366574339';
Ti.Facebook.permissions = ['user_about_me','user_interests','user_activities','user_likes'];

Ti.Geolocation.purpose = "Find nearby similar individuals and chats.";
Ti.Geolocation.preferredProvider = "gps";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.distanceFilter = 6;

var parent = Ti.Filesystem.getApplicationDataDirectory();
var new_folder = Ti.Filesystem.getFile(parent, 'cache');
new_folder.createDirectory();

Keeno.logoutButton = Ti.UI.createButton({
	title: 'Logout',
})

Keeno.logoutButton.addEventListener('click', function(e)
{
	Ti.Facebook.logout();
});

Ti.Gesture.addEventListener('shake', function(e)
{
	if (Keeno.Tabs.tabGroup.activeTab.title != 'Discover' || Keeno.Messages.currentChat != 0)
	{
		return;
	}
	
	if (Keeno.Discover.currentAnnotations.length == 0)
	{
		alert('There does not seem to be anyone around you.');
		return;
	}
	
	var randomUser = Keeno.Discover.currentAnnotations[Math.floor(Math.random()*Keeno.Discover.currentAnnotations.length)];
	Keeno.Messages.Chat.win.title = randomUser.title;
   Keeno.Messages.currentChat = randomUser.fbid;
   Keeno.Messages.Chat.drawInit();
	Keeno.Messages.Chat.tableview.scrollToIndex(Keeno.Messages.Chat.table_data.length-1, {animated: false});
   Keeno.Tabs.discoverTab.open(Keeno.Messages.Chat.win, {animated: true});
});

Keeno.timeToString = function(unix_time)
{
	var current_time = new Date;
	var input_time = new Date(unix_time * 1000);
	
	if (current_time.getDay() > input_time.getDay())
	{
		return input_time.getMonth()+1+'/'+input_time.getDate()+'/'+input_time.getFullYear();
	}
	else
	{
		var hours = 0;
		
		if (input_time.getHours() == 0)
		{
			hours = 12;
		}
		else if (input_time.getHours() > 12)
		{
			hours = input_time.getHours()-12;
		}
		else
		{
			hours = input_time.getHours();
		}
		
		return hours+':'
		+(input_time.getMinutes() < 10 ? "0"+input_time.getMinutes() : input_time.getMinutes())
		+(input_time.getHours() >= 12 ? 'pm' : 'am');
	}
};

Keeno.updateLocation = function(e)
{
	if (!e.success || e.error)
	{
		return;
	}
	
	Keeno.User.latitude = e.coords.latitude;
	Keeno.User.longitude = e.coords.longitude;

};

Ti.Geolocation.addEventListener('location', Keeno.updateLocation);

Keeno.serverURL = "http://toolbox.burst-dev.com/~jarek/keeno/";

/*
Preparing the included objects
*/
Ti.include(
	'database.js',
	'register.js',
	'server.js',
	'messages.js',
	'discover.js',
	'aps.js',
	'settings.js'
);

Keeno.Database.init();
Keeno.Database.createTables();
Keeno.Register.init();
Keeno.Discover.init();
Keeno.Server.init();
Keeno.Messages.init();
Keeno.Settings.init();

// need to remember to do ping.init();

Keeno.dialog = Titanium.UI.createAlertDialog({
   title: 'Welcome to Keeno!',
   message: 'Click a pin to learn what that user likes and start a conversation with them or shake the phone to choose someone randomly!',
   buttonNames: ['Close']
});

Keeno.dialog.addEventListener('click', function(e)
{
	Ti.App.Properties.setInt("new", 0);
});

Keeno.Tabs = {};
Keeno.Tabs.init = function()
{
	this.tabGroup = Ti.UI.createTabGroup();
	
	this.discoverTab = Ti.UI.createTab({
		icon: 'images/tabs/radar.png',
		title: 'Discover',
		window: Keeno.Discover.win
	});
	
	this.messagesTab = Ti.UI.createTab({
		icon: 'images/tabs/chat.png',
		title: 'Messages',
		window: Keeno.Messages.win
	});
	
	this.settingsTab = Ti.UI.createTab({
		icon: 'images/tabs/settings.png',
		title: 'Settings',
		window: Keeno.Settings.win
	})
	
	this.tabGroup.addTab(this.discoverTab);
	this.tabGroup.addTab(this.messagesTab);
	this.tabGroup.addTab(this.settingsTab);
	
	this.tabGroup.addEventListener('blur', function(e)
	{
		if (e.index == e.previousIndex)
		{
			return;
		}
		
		Keeno.Messages.Chat.win.close();
	});
};

Keeno.Tabs.open = function()
{
	Keeno.Server.execute();
	Keeno.Discover.execute();
	Keeno.Messages.execute();
	Keeno.Settings.execute();
	
	this.tabGroup.setActiveTab(0);
	this.tabGroup.open();

	if (Ti.App.Properties.getInt("new") != 0)
	{
		Keeno.dialog.show();
	}
};

Keeno.Tabs.init();

/*
Perform commands here, this is after INIT is completed
*/
Keeno.APS.open();
Keeno.Register.win.open();