Keeno.Discover = {};

(function() {
	Keeno.Discover.init = function()
	{
		this.currentSelectedAnnotation = null;
		this.currentAnnotations = [];
	
		this.win = Ti.UI.createWindow({
			title: 'Discover'
		});
	
		this.currLocationButton = Ti.UI.createButton({
			image: 'images/arrow.png',
			backgroundTopCap: 5,
			backgroundLeftCap: 5
		});
	
		this.currLocationButton.addEventListener('click', Keeno.Discover.centerOnLocation);
	
		this.win.rightNavButton = this.currLocationButton;
	
		this.xhr = Ti.Network.createHTTPClient();
		this.xhr.setTimeout(30000);
	
		this.mapView = Titanium.Map.createView({
		   mapType: Titanium.Map.STANDARD_TYPE,
		   animate: true,
		   regionFit: true,
		   userLocation: true,
			visible: true
		});
	
		this.mapView.show();
		this.win.add(this.mapView);
	
		this.mapView.addEventListener('click', Keeno.Discover.onMapViewClick);
	};

	Keeno.Discover.fetchImage = function(URL)
	{	
		var path = Ti.Filesystem.getApplicationDataDirectory()+'/cache/'+Ti.Utils.md5HexDigest(URL)+'.jpg';
		var image = Ti.Filesystem.getFile(path);
	
		if (image.exists())
		{
			return image.read();
		}
	
		this.xhr.open('GET', URL);
		this.xhr.send();
	
		while(this.xhr.readyState != 4) { }
	
		image.write(this.xhr.responseData);
	
		return this.xhr.responseData;
	}

	Keeno.Discover.centerOnLocation = function()
	{
		Keeno.Discover.mapView.setLocation({
			latitude: Keeno.User.latitude,
			longitude: Keeno.User.longitude,
			animate: true,
			latitudeDelta: 0.02,
	      longitudeDelta: 0.02
		});
	}

	Keeno.Discover.execute = function()
	{		
		setTimeout(function() { Keeno.Discover.centerOnLocation(); }, 1000);
	
		this.drawAnnotations();
		Keeno.Discover.interval = setInterval(this.drawAnnotations, 10000);
	};

	Keeno.Discover.onMapViewClick = function(e)
	{
		if (e.clicksource == 'rightButton')
		{
			Keeno.Messages.Chat.win.title = e.annotation.title;
		   Keeno.Messages.currentChat = e.annotation.fbid;
		   Keeno.Messages.Chat.drawInit();
			Keeno.Messages.Chat.win.close();
		   Keeno.Tabs.discoverTab.open(Keeno.Messages.Chat.win, {animated: true});
			Keeno.Messages.Chat.tableview.scrollToIndex(Keeno.Messages.Chat.table_data.length-1, {animated: false});
		}
	
		Keeno.Discover.currentSelectedAnnotation = e.annotation;
	};

	Keeno.Discover.drawAnnotations = function ()
	{
		/*
		We need to take all current annotations displayed on the map, 
		remove the "selected annotation from it and send it to our
		mapView for removal"
		*/
	
		var people = Keeno.Server.nearbyUsers;
	
		if (people == null)
		{
			return;
		}
	
		// First generating our list of new people that aren't on the map.
	   for (var i = 0; i < people.length; i++)
	   {
	      for (var j in people[i])
	      {
	         //alert(people[i][j]);
	         //alert(people[i][j].sq_photo);
			
				var currentEntry = null;
				for (var k = 0; k < Keeno.Discover.currentAnnotations.length; k++)
				{
					if (Keeno.Discover.currentAnnotations[k].fbid == people[i][j].fbid)
					{
						currentEntry = k;
						break;
					}
				}
				
				var isSelected = false;
				if (currentEntry != null)
				{
					if (Math.sqrt(Math.pow(people[i][j].latitude-Keeno.Discover.currentAnnotations[currentEntry].latitude,2) 
						+ Math.pow(people[i][j].longitude-Keeno.Discover.currentAnnotations[currentEntry].longitude, 2)) > 0.01)
					{
						if (Keeno.Discover.currentSelectedAnnotation == Keeno.Discover.currentAnnotations[currentEntry])
						{
							isSelected = true;
						}
						
						Keeno.Discover.mapView.removeAnnotation(Keeno.Discover.currentAnnotations[currentEntry]);
						Keeno.Discover.currentAnnotations.splice(currentEntry,1);
					}
					else
					{
						continue;
					}
				}

	         var image = Ti.UI.createImageView({
	            image: Keeno.Discover.fetchImage(people[i][j].sq_photo),
	            width: 32,
	            height: 32,
	            backgroundColor: '#000',
	//            preventDefaultImage: true
	         });

	         var subtitle = '';
	         for (var k in people[i][j].Interests_In_Common)
	         {
	            if (people[i][j].Interests_In_Common[k] == undefined)
	            {
	               continue;
	            }
	            subtitle += people[i][j].Interests_In_Common[k] + " ";
	         }

	         var anno = Ti.Map.createAnnotation({
	            latitude: people[i][j].latitude,
	            longitude: people[i][j].longitude,
	            title: people[i][j].firstName,
	            subtitle: subtitle,
	            pincolor: Titanium.Map.ANNOTATION_GREEN,
	            animate: true,
	            leftView: image,
	            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
	            fbid: people[i][j].fbid,
	            //interests: people[i].Interests_In_Common
	         });

				Keeno.Discover.currentAnnotations.push(anno);
				Keeno.Discover.mapView.addAnnotation(anno);
				
				if (isSelected)
				{
					Keeno.Discover.mapView.selectAnnotation(anno);
				}
	      } 
	   }
	};
})();