//FirstView Component Constructor
function MainMenu() {
	//create object instance, a parasitic subclass of Observable
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var imagepath = '/images/mainmenu/';
	var self = Ti.UI.createView({
		backgroundImage : imagepath + 'background@2x.png',
	});
	Ti.API.info(' Launched MainMenu_Android js ');
	//var Notifications = require('/libs/notifications').Notifications;
	//new Notifications();

	loaded = false;
	textloaded = false;
	var qbutton = require('ui/common/android/buttonCreator_Android');

	var userCred = Ti.App.Properties.getObject('userCred');
	var longitude;
	var latitude;

	Ti.App.Properties.setBool('questions', true);

	// loginReq();

	var appglobal = require('../AppGlobals');
	var h1 = appglobal.getFont('28dp'); // {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = appglobal.getFont('18dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = appglobal.getFont('14dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
	var h4 = appglobal.getFont('16dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};

	var textBtn = Ti.UI.createImageView({
		image : imagepath + 'text@2x.png',
		height : '52dp',
		width : '52dp',
		right : '12.5dp',
		bottom : '15dp'

	});
	var textChat = require('ui/common/android/FirstView_Android');
	
	textBtn.addEventListener('click', function() {
		if (!textloaded) {
			chatView = new textChat();
			self.add(chatView);
			textloaded = true;
		} else {
			chatView.show();
		}
	});

	Ti.Geolocation.preferredProvider = "gps";
	Ti.Geolocation.purpose = "Find local deals";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			Ti.API.info('error: get current position: ' + JSON.stringify(e.error));
			return;
		}

		longitude = e.coords.longitude;
		latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		Ti.API.info('speed ' + speed);
		locationCallback(e);
	});

	function loginReq() 
	{
		Ti.API.info('called from some where ');
		var apiCall = '/api/appUsers/login';
		var url = apiURL + apiCall;
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info(this.responseText);
				saveInfo(JSON.parse(this.responseText));
			},
			onerror : function(e) {
				Ti.API.info(e.error + ' ' + JSON.stringify(e));
				alert('Unable to establish connection');
			},
			timeout : 5000 // in milliseconds
		});

		params = {
			email : Titanium.App.Properties.getString('email', userCred['email']),
			password : Titanium.App.Properties.getString('pass', userCred['pass'])
		};

		client.open("POST", url);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
	}

	function saveInfo(data) {
		userData = data;
		Ti.App.Properties.setObject('userCred', userData);
	}

	function openProfile(userData) 
	{
		var Profile = require('ui/common/android/SlideOutMenu_Android');
		profileView = new Profile(userData);
		self.add(overlay1);
		overlay1.animate({
			opacity : 0.7,
			duration : 750
		});
		self.add(profileView);

		Ti.App.addEventListener('closeSlideOut', function(e) {
			overlay1.animate({
				opacity : 0,
				duration : 750
			}, function() {
				self.remove(overlay1);
				self.remove(profileView);
			});
		});
	}


	Ti.App.addEventListener('openProfile', function(e) {
		var ProfileView = require('ui/common/android/ProfileView_Android');
		profile = new ProfileView(self);
		self.add(profile);
	});
	Ti.App.addEventListener('openInbox', function(e) {
		var ProfileView = require('ui/common/android/InboxView_Android');
		profile = new ProfileView(self);
		self.add(profile);
	});
	Ti.App.addEventListener('openInterests', function(e) {
		var ProfileView = require('ui/common/android/InterestsView_Android');
		profile = new ProfileView(self);
		self.add(profile);
	});
	Ti.App.addEventListener('openSettings', function(e) {
		var ProfileView = require('ui/common/android/SettingsView_Android');
		profile = new ProfileView(self);
		self.add(profile);
	});

	function locationCallback(e) 
	{
		if (!e.success || e.error) {
			Ti.API.info('error: location callback: ' + JSON.stringify(e.error));
			return;
		}
		if (userCred != null) 
		{
			var urlCall = apiURL + '/api/appUsers/' + userCred['userId'] + '?access_token=' + userCred['id'];

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				//Ti.API.info(e.success);
				Ti.API.info(this.responseText);
				//saveInfo(JSON.parse(this.responseText));
			},
			onerror : function(e) {
				Ti.API.info(e.error + ' Location Callback Function ' + JSON.stringify(e));
			},
			timeout : 5000 // in milliseconds
		});

		params = {
			last_location : {
				"lat" : latitude,
				"lng" : longitude
			}
		};

		client.open("PUT", urlCall);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
		}
		
	};

	Titanium.Geolocation.addEventListener('location', locationCallback);

	var spacer = Ti.UI.createView({
		height : '10dp',
	});

	var menuButton = Ti.UI.createImageView({
		image : imagepath + 'menu@2x.png',
		height : '52dp',
		width : '52dp',
		right : '12.5dp',
		center : {
			y : '40dp'
		}
	});

	var helpButton = Ti.UI.createImageView({
		image : imagepath + 'help@2x.png',
		height : '52dp',
		width : '52dp',
		left : '12.5dp',
		bottom : '15dp'
	});

	var helpScreen = Ti.UI.createImageView({
		image : imagepath + 'helpScreen@2x.png',
		bottom : '0dp'
	});

	var profileButton = Ti.UI.createImageView({
		image : imagepath + 'profile@2x.png',
		height : '52dp',
		width : '52dp',
		left : '12.5dp',
		center : {
			y : '40dp'
		}
	});

	var callBtn = Ti.UI.createImageView({
		image : imagepath + 'sirviR@2x.png',
		width : '215dp',
		height : '215dp',
		left : '-320dp',
	});
	callBtn.addEventListener('click', function() {
		//callSirvi();
		var anim1 = Ti.UI.createAnimation({
            top: "0dp",
            duration: 1000
        });
		 //Window open and close on android without animation 
    		var win2 = Ti.UI.createWindow({
        	title:'Example',
        	backgroundColor:'blue',
        	fullscreen : false,
        	//windowSoftInputMode:Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED  //** important to make a heavyweight window
    		});
    		win2.addEventListener('androidback', function(){
              win2.close({activityExitAnimation : Titanium.App.Android.R.slide_top});
        	});
    		//win2.open({animated:false});
    		//win2.open(anim1);
    		win2.open({
    			activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
    			//activityExitAnimation: Ti.Android.R.anim.slide_out_right
			});
    		//win2.animate(anim1);
    		//win2.open();
    		
    		
	});

	var overlay = Ti.UI.createView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : '#333',
		opacity : 0.7
	});

	var overlay1 = Ti.UI.createView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : '#333',
		opacity : 0
	});

	function callSirvi() {
		var Twilio = require('com.twilio.client');

		var callDialog = Ti.UI.createView({
			height : Ti.UI.SIZE,
			width : '90%',
			backgroundColor : '#white',
			borderRadius : 8,
			layout : 'vertical',
			opacity : 0.8
		});

		var miniSirvi = Titanium.UI.createImageView({
			height : '50dp',
			width : '50dp',
			image : '/images/mainmenu/callBtn@2x.png'
		});

		var statuslabel = Ti.UI.createLabel({
			text : 'Connecting to Sirvi... \nPlease wait while we connect your concierge specialist',
			font : h4,
			color : 'black',
			textAlign : 'left'
		});

		var titleView = Titanium.UI.createView({
			width : '100%',
			layout : 'horizontal',
			height : Titanium.UI.SIZE
		});

		titleView.add(miniSirvi);
		titleView.add(statuslabel);

		newButton = Titanium.UI.createButton({
			title : 'End Call',
			color : 'red'
		});
		callDialog.add(titleView);
		callDialog.add(newButton);
		newButton.addEventListener('click', function() {
			Twilio.Device.disconnectAll();
			self.remove(callDialog);
			self.remove(overlay);
		});

		var url = 'http://healthypeps.com/auth.php';
		makeCall(this.responseText);
		var url = 'http://104.131.188.13/auth.php';
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {

				Ti.API.info('Received capability token: ' + this.responseText);
				Twilio.Device.setup(this.responseText);
				makeCall(this.responseText);
			},
			onerror : function(e) {
				Ti.Platform.openURL('tel:18666971684');
			},
			timeout : 5000
		});
		client.open('POST', url);

		authParams = {
			caller : userCred['userId'],
			access_token : userCred['id'],
			lat : latitude,
			lng : longitude
		};

		client.send(authParams);

		function getDate() {
			var currentTime = new Date();
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();

			return month + "/" + day + "/" + year + " - " + hours + ":" + minutes;
		};
		var nowTime = getDate();
		var _url = apiURL + '/api/calls/';
		var _client = Ti.Network.createHTTPClient({
			onload : function(e) {

				Ti.API.info(' ' + this.responseText);
				Twilio.Device.setup(this.responseText);
				makeCall(this.responseText);
			},
			onerror : function(e) {
				Ti.Platform.openURL('tel:18666971684');
			},
			timeout : 5000
		});
		_client.open('POST', _url);

		authParams1 = {
			"phone_number" : 0,
			"wait_time" : "00",
			"start_time" : nowTime,
			"intent" : "00",
			"resolution" : "00",
			"recording_url" : "00",
			"end_time" : "00",
			"id" : userCred['userId'],
			"agentId" : "objectid",
			"appUserId" : userCred['id']
		};

		_client.send(authParams1);

		// Make an outbound call
		function makeCall(token) {
			Ti.API.info(Twilio.Device.status(token) + 'making call...');
			Twilio.Device.connect({
				PhoneNumber : '+18666971684',
				CallerId : '+15612038918',
			});
			Ti.API.info(Twilio.Device.status(token) + 'call enroute...');
			self.add(overlay);
			self.add(callDialog);
			locationCallback;
		}

	}

	var childView = Ti.UI.createView({
		height : '386.5dp',
		width : '200dp',
		right : '50dp',
		transform : Ti.UI.create2DMatrix().rotate(179),
		anchorPoint : {
			x : 0,
			y : 0.5
		},
		opacity : 0
	});
	var healthBig = Ti.UI.createImageView({
		image : imagepath + 'healthR@2x.png',
		width : '72.5dp',
		height : '73dp'
	});
	var lawBig = Ti.UI.createImageView({
		image : imagepath + 'lawR@2x.png',
		width : '73.5dp',
		height : '74dp'
	});
	var datingBig = Ti.UI.createImageView({
		image : imagepath + 'dateR@2x.png',
		width : '72.5dp',
		height : '73dp'
	});
	var lawBtn = Ti.UI.createImageView({
		image : imagepath + 'law@2x.png',
		height : '73dp',
		width : '73.5dp',
		top : '0dp',
		left : '20dp'
	});
	var healthBtn = Ti.UI.createImageView({
		image : imagepath + 'health@2x.png',
		height : '72.5dp',
		width : '72dp',
		right : '0dp',
	});
	var datingBtn = Ti.UI.createImageView({
		image : imagepath + 'dating@2x.png',
		height : '72.5dp',
		width : '72dp',
		right : '45.5dp',
		bottom : '0dp'
	});
	var financeBtn = Ti.UI.createImageView({
		image : imagepath + 'finance@2x.png',
		height : '72.5dp',
		width : '73.5dp',
		right : '65dp',
		bottom : '-40dp',

	});
	var raffleBtn = Ti.UI.createImageView({
		image : imagepath + 'raffle@2x.png',
		height : '73.5dp',
		width : '73.5dp',
		bottom : '-70dp',
		left : '-90dp',
		opacity : 0
	});

	sunAnimation = Ti.UI.createAnimation({
		left : '5dp',
		duration : 650,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT
	});
	planetAnimation = Ti.UI.createAnimation({
		right : '20dp',
		transform : Ti.UI.create2DMatrix().rotate(0),
		opacity : 1,
		duration : 1000,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT
	});

	planetZoom = Ti.UI.createAnimation({
		width : '200dp',
		height : '200dp',
		left : '0dp',
		center : {
			y : (Ti.Platform.displayCaps.platformHeight/2) / 2
		},
		duration : 500,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT
	});

	planetRotateOut = Ti.UI.createAnimation({
		transform : Ti.UI.create2DMatrix().rotate(-179),
		opacity : 0,
		duration : 1000,
		curve : Ti.UI.ANIMATION_CURVE_LINEAR,
		right : '50dp'
	});
	shrinkBtn = Ti.UI.createAnimation({
		transform : Ti.UI.create2DMatrix().scale(0.9, 0.9),
		opacity : 1,
		duration : 500,
		center : {
			x : '93dp',
			y : Ti.Platform.displayCaps.platformHeight / 2
		},
	});

	callBtn.animate(sunAnimation, function(e) {
		childView.animate(planetAnimation);
		healthBtn.animate({
			right : '26.5dp',
			top : '59dp',
			duration : 1000,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		datingBtn.animate({
			right : '0dp',
			bottom : '158dp',
			duration : 1000,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});

		financeBtn.animate({
			right : '26.5dp',
			bottom : '59dp',
			duration : 1100,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		raffleBtn.animate({
			bottom : '0dp',
			left : '20dp',
			opacity : 1,
			duration : 1100,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		if (Titanium.App.Properties.getBool('firsttime', true)) {
			setTimeout(function() {
				//helpScreen.show();
				Titanium.App.Properties.setBool('firsttime', false);
			}, 1500);
		}
	});

	lawBtn.addEventListener('click', function(e) {
		if (!Ti.App.Properties.getBool('questions', false)) {
			//loadQuestions();
		} else 
		{
			loadExtraWindows('law');
			
			/*
			var dTop = ((Ti.Platform.displayCaps.platformHeight - 386.5) / 2) + 36.75;
			var dLeft = (Ti.Platform.displayCaps.platformWidth - 163.25);
			lawBig.center = {
				x : dLeft,
				y : dTop
			};
			//self.add(lawBig);
			lawBtn.hide();
			lawBig.animate(planetZoom);
			childView.animate(planetRotateOut, function(e) 
			{
				/*
				Ti.App.fireEvent('lawview', {
					x : 'law'
				});
				self.add(lawView);
				
				
			});
			callBtn.animate(shrinkBtn);
			*/
		}
	});

function loadExtraWindows(title)
{
		var winLaw = Ti.UI.createWindow({ fullscreen : false });
        winLaw.addEventListener("open", function() 
    	{
    		var actionBar = winLaw.activity.actionBar;
    		if (actionBar) { actionBar.hide(); }
		});
    	winLaw.addEventListener('androidback', function(){
             winLaw.close({animated:false});
        });
    	winLaw.open({animated:false});
    	var Law = require('ui/common/android/lawView_Android');
    	winLaw.add(new Law(title,winLaw));
}

	healthBtn.addEventListener('click', function(e) {
		if (!Ti.App.Properties.getBool('questions', false)) {
			loadQuestions();
		} else {
			var dTop = ((Ti.Platform.displayCaps.platformHeight - 386.5) / 2) + 36.75 + 59;
			var dLeft = (Ti.Platform.displayCaps.platformWidth - 46.5) - 36.25;
			healthBig.center = {
				x : dLeft,
				y : dTop
			};
			//self.add(healthBig);
			healthBtn.hide();
			healthBig.animate(planetZoom);
			childView.animate(planetRotateOut, function() 
			{
				/*
				Ti.App.fireEvent('lawview', {
					x : 'health'
				});*/
				loadExtraWindows('health');
			});
			callBtn.animate(shrinkBtn);
		}
	});

	datingBtn.addEventListener('click', function(e) {
		if (!Ti.App.Properties.getBool('questions', false)) {
			loadQuestions();
		} else {
			var dLeft = (Ti.Platform.displayCaps.platformWidth - 20) - 36.25;
			datingBig.center = {
				x : dLeft,
				y : '50%'
			};
			//self.add(datingBig);
			datingBtn.hide();
			datingBig.animate(planetZoom);
			childView.animate(planetRotateOut, function() 
			{
				loadExtraWindows('date');
				/*
				Ti.App.fireEvent('lawview', {
					x : 'date'
				});*/
			});
			callBtn.animate(shrinkBtn);
		}
	});

	var Question = require('ui/common/android/QuestionView_Android');
	raffleBtn.addEventListener('click', function(e) {
		if (!loaded) 
		{
			loadReffelWindow();
		} else
			loadQuestions();
	});

	function loadQuestions() 
	{
		var quesToLoad = 'sirvipays';
		var winQuestion = Ti.UI.createWindow({ fullscreen : false });
        	winQuestion.add(new Question(quesToLoad,winQuestion));
        	winQuestion.addEventListener("open", function() 
    		{
    			var actionBar = winQuestion.activity.actionBar;
    			if (actionBar) { actionBar.hide(); }
			});
    		winQuestion.addEventListener('androidback', function(){
              winQuestion.close({animated:false});
        	});
    		winQuestion.open({animated:false});
    		
		/*
		if (!loaded) {
			QuestionView = new Question(quesToLoad);
			self.add(QuestionView);
			loaded = true;
		} else {
			QuestionView.show();
		}*/
	}


	financeBtn.addEventListener('click', function(e) 
	{
		var offersView = require('ui/common/android/Offers_Android');
		//self.add(new offersView);
			var winOffer = Ti.UI.createWindow({
        		fullscreen : false,
        	});
        	winOffer.add(new offersView(winOffer));
        	winOffer.addEventListener("open", function() 
    		{
    			var actionBar = winOffer.activity.actionBar;
    			if (actionBar) { actionBar.hide(); }
			});
    		winOffer.addEventListener('androidback', function(){
              winOffer.close({animated:false});
        	});
    		winOffer.open({animated:false});
	});
	var rewardsView = require('ui/common/android/rewards_Android');

	menuButton.addEventListener('click', function(e) {
		_rewards = new rewardsView();
		self.add(_rewards);
	});

	helpButton.addEventListener('click', function() {
		helpScreen.show();
	});

	helpScreen.addEventListener('click', function(e) {
		helpScreen.hide();
	});

	profileButton.addEventListener('click', function() {
		openProfile(userCred);
	});

	childView.add(lawBtn);
	childView.add(healthBtn);
	childView.add(datingBtn);
	childView.add(financeBtn);
	childView.add(raffleBtn);
	
	self.add(childView);
	self.add(callBtn);
	self.add(textBtn);
	self.add(menuButton);
	self.add(helpButton);
	self.add(profileButton);
	//self.add(helpScreen);
	helpScreen.hide();

	function loadReffelWindow()
	{
		var raffleTermsView = Titanium.UI.createView({
			height : Titanium.UI.FILL,
			width : Titanium.UI.FILL,
			backgroundImage : '/images/mainmenu/background@2x.png'
		});

		var raffleBackBtn = Titanium.UI.createImageView({
			image : '/images/law/home@2x.png',
			left : '12.5dp',
			height : '52dp',
			width : '52dp',
			center : {
				y : '40dp'
			}
		});

		var raffleBckgrnd = Titanium.UI.createImageView({
			height : Titanium.UI.FILL,
			width : Titanium.UI.FILL,
			backgroundImage : '/images/mainmenu/spstart@2x.png'
		});

		var lowerButtonView = Titanium.UI.createView({
			height : '70dp',
			bottom : '20dp'
		});

		var raffleRegister = qbutton.createButton('Register', '#0d004c');

		raffleRegister.addEventListener('click', function() {
			loadQuestions();
		});

		lowerButtonView.add(raffleRegister);

		raffleTermsView.add(raffleBckgrnd);
		raffleTermsView.add(raffleBackBtn);
		raffleTermsView.add(lowerButtonView);

		//open a new window
		var winRaffle = Ti.UI.createWindow({
        	fullscreen : false,
        });
        winRaffle.add(raffleTermsView);
    	winRaffle.addEventListener('androidback', function(){
            winRaffle.close({animated:false});
        });
    	winRaffle.open({animated:false});
    		
    	raffleBackBtn.addEventListener('click', function() {
			winRaffle.close({animated:false});
		});
	}

	return self;
}



module.exports = MainMenu;
