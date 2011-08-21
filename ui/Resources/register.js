Keeno.Register = {};

(function() {	
/*
	Prepping what happens with Facebook events
*/

	Ti.Facebook.addEventListener('login', function(e)
	{
		if (Ti.Network.online)
		{
			Keeno.Register.execute();
		} 
	});

	Ti.Facebook.addEventListener('logout', function(e) {
		clearInterval(Keeno.Messages.interval);
		clearInterval(Keeno.Discover.interval);
		Keeno.Register.open();
	});

	Keeno.Register.init = function()
	{
		this.win = Ti.UI.createWindow({
			backgroundImage: 'images/Default.png',
			backgroundColor: '#fff',
			width: '320',
			height: '460'
		});
	
		this.xhr = Ti.Network.createHTTPClient();
	
		this.fbButton = Ti.Facebook.createLoginButton({
			style: 'wide',
			bottom: 60
		});
	
		this.win.add(this.fbButton);
	
		if (Ti.Facebook.loggedIn && Ti.Network.online)
		{
			this.execute();
		}
	};

	Keeno.Register.open = function()
	{
		this.win.open({transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN});
	};

	Keeno.Register.close = function()
	{
		Keeno.Tabs.open();
		this.win.close({transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP});	
	};

	Keeno.Register.execute = function()
	{
		var query = "SELECT uid, first_name, last_name, pic_square, interests, sex, music, tv, movies, books, activities FROM user ";
	   query += "where uid = " + Ti.Facebook.uid;
	
		Ti.Facebook.request('fql.query', {query: query}, function (r)
	   {
	      if (!r.success) {
				Ti.UI.createAlertDialog({title:'Facebook', message: 'Something went wrong with Facebook, please try again...'}).show();
				return;
	      }

	      result = JSON.parse(r.result);

			Keeno.User.first_name = result[0].first_name + " " + result[0].last_name.charAt(0) + ".";
			Keeno.User.pic_square = result[0].pic_square;
			Keeno.Discover.fetchImage(Keeno.User.pic_square); // do this to preload
			Keeno.User.interests = result[0].interests+","+result[0].music+","+result[0].tv+","+result[0].movies+","+result[0].books+","+result[0].activities;
			Keeno.User.sex = result[0].sex;
			Keeno.User.uid = Ti.Facebook.uid;
				
			Keeno.Register.xhr.open("GET", Keeno.serverURL+"reg.php?fbid="+Keeno.User.uid+"&token="+Ti.Network.remoteDeviceUUID+"&lat="+Keeno.User.latitude+"&long="+Keeno.User.longitude+"&sq_photo="+Keeno.User.pic_square+"&gender="+Keeno.User.sex+"&firstName="+Keeno.User.first_name+"&interests="+Keeno.User.interests);
		   Keeno.Register.xhr.send();
	
			Keeno.Register.close();
	   });
	};
})();