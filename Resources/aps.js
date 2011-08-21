Keeno.APS = {};

Keeno.APS.KEY = 'oq-On1TITpacbrrF6duHIg';
Keeno.APS.SECRET = 'lQxYOfsiQse5naxt7H7d4Q';

Keeno.APS.open = function()
{
	Titanium.Network.registerForPushNotifications({
		types: [
			Titanium.Network.NOTIFICATION_TYPE_BADGE,
			Titanium.Network.NOTIFICATION_TYPE_ALERT,
			Titanium.Network.NOTIFICATION_TYPE_SOUND
		],
		
		success: Keeno.APS.success,
		error: Keeno.APS.error,
		callback: Keeno.APS.receive
	});
};

Keeno.APS.success = function(e)
{
	var request = Titanium.Network.createHTTPClient({
		onload:function(e) 
		{
			if (request.status != 200 && request.status != 201) 
			{
				request.onerror(e);
				return;
			}
		},
		
		onerror:function(e) {
			Ti.API.info("Register with Urban Airship Push Service failed. Error: " + e.error);
		}
   });

	// Register device token with UA
	request.open('PUT', 'https://go.urbanairship.com/api/device_tokens/' + e.deviceToken, true);
	request.setRequestHeader('Authorization','Basic ' + Titanium.Utils.base64encode(Keeno.APS.KEY + ':' + Keeno.APS.SECRET));
	request.send();
};

Keeno.APS.error = function(e)
{
	Ti.API.info("Error during registration: " + e.error);
};

Keeno.APS.receive = function(e)
{
	if (e['data'] == undefined || e['data']['aps'] == undefined)
	{
		return;
	}
	
	Ti.UI.iPhone.appBadge = 0;
	
	// For now, Titanium has no way of differentiating between outside-aps event handlers
	// and inside-aps event handlers. So at this current moment, nothing can be done.
	// please watch CB ticket #55 for more information
	
	//alert(e);
	
	/*
	Keeno.Messages.Chat.win.title = e['data']['aps']['name'];
   Keeno.Messages.currentChat = e['data']['aps']['fbid'];
	Keeno.Messages.Chat.win.close();
   Keeno.Messages.Chat.drawInit();
	Keeno.Tabs.tabGroup.setActiveTab(1);
   Keeno.Tabs.messagesTab.open(Keeno.Messages.Chat.win, {animated: true});
	Keeno.Messages.Chat.tableview.scrollToIndex(Keeno.Messages.Chat.table_data.length-1, {animated: false});
	*/
};