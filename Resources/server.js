Keeno.Server = {};
Keeno.Server.init = function()
{
	this.xhr = Ti.Network.createHTTPClient();
	this.xhr.onload = this.response;
};

Keeno.Server.response = function()
{
	var jso = JSON.parse(this.responseText);
	
	Keeno.Server.nearbyUsers = [jso.nearby_users]; // eventually it'd be nice to grab this from DB
	
	for (var i in jso.messages)
	{
		var new_msg = 1;
		if (jso.messages[i].fbid_from == Keeno.Messages.currentChat)
		{
			new_msg = 0;
		}	
		
      Keeno.Database.db.execute('DELETE FROM users WHERE id=?',jso.messages[i].fbid_from);
      Keeno.Database.db.execute('INSERT INTO users (ID, NAME, NEW, TIME) VALUES (?, ?, ?, ?)',jso.messages[i].fbid_from, jso.messages[i].first_name, new_msg, jso.messages[i].msg_time);
      
      Ti.App.Properties.setInt("num_of_msg", Ti.App.Properties.getInt("num_of_msg")+1); // this needs to looked at

      Keeno.Database.db.execute('INSERT INTO msgs (ID, NAME, PHOTO, MESSAGE, TIME, NEW) VALUES (?, ?, ?, ?, ?, ?)', 
			jso.messages[i].fbid_from, jso.messages[i].first_name, jso.messages[i].sq_photo, jso.messages[i].message, jso.messages[i].msg_time, 1); // this also needs to be looked at
	}
}

Keeno.Server.ping = function()
{
	if (!Ti.Facebook.loggedIn || !Ti.Network.online)
	{
		return;
	}
	
	Keeno.Server.xhr.open("GET", Keeno.serverURL+"ping.php?fbid="+Keeno.User.uid+"&lat="+Keeno.User.latitude+"&long="+Keeno.User.longitude);
	Keeno.Server.xhr.send();
};

Keeno.Server.execute = function()
{
	Keeno.Server.ping();
	setInterval(Keeno.Server.ping, 5000);
};