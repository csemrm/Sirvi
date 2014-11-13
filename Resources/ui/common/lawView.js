function lawView(_title) {
    //create object instance, a parasitic subclass of Observable
    var imagepath = '/images/law/';
    var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
    var self = Ti.UI.createView({
        backgroundImage:'/images/mainmenu/background.png',
    });
    var longitude;
	var latitude;
    var menuTitle=[];
    
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
    
    var userCred = Ti.App.Properties.getObject('userCred');
    
    function locationCallback(e) {
		if (!e.success || e.error) {
			Ti.API.info('error: location callback: ' + JSON.stringify(e.error));
			return;
		}
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
	};

	Titanium.Geolocation.addEventListener('location', locationCallback);
    switch (_title) {
    case 'law':
        menuTitle=[
            'PERSONAL INJURY',
            'BANKRUPTCY',
            'DUI',
            'TAX',
            'LEGAL DOCUMENTS',
        ];        
        break;
    case 'date':
        menuTitle=[
            'ENTERTAINMENT',
            'DINING',
            'TRAVEL',
            'FAMILY',
            'HOME/AUTO',
        ];        
        break;
    case 'health':
         menuTitle=[
            'SUPPLEMENTAL',
            'HEALTH',
            'LIFE',
            'DISABILITY',
            'LONG TERM CARE',
        ];        
        break;
    }
    var overlay = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        backgroundColor : '#333',
        opacity : 0.7
    });
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'21dp',color:'#fff'};
    var h4 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '16dp',
        color : '#fff'
    };
    
    var textBtn = Ti.UI.createImageView({
        image:imagepath + 'home.png',
        left:'12.5dp',
        center:{y:'50dp'}
    });
    
    var menuButton = Ti.UI.createImageView({
        image:imagepath + 'menu.png',
        right:'12.5dp',
        center:{y:'50dp'}
    });
    //self.add(menuButton);
    var helpButton = Ti.UI.createImageView({
        image:imagepath + 'help.png',
        left:'12.5dp',
        bottom:'15dp'
    });
    //self.add(helpButton);
    
    var profileButton = Ti.UI.createImageView({
        image:imagepath + 'profile.png',
        right:'12.5dp',
        bottom:'15dp'
    });
    //self.add(profileButton);
    
    var lawIcon = Ti.UI.createImageView({
        image:imagepath + _title +'R.png',
        left:'0dp',
        center:{y:'50%'}
    });
    
    var menu = Ti.UI.createView({
        height:'416dp',
        layout:'vertical',
        center:{y:'50%'},
        right:'-320dp'
    });
    
    var menu1 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'1.png',
        right:'0dp',
        bottom:'36.5',
        width:'222dp',
        height:'54dp',
        text:menuTitle[0],
    });
    var menu2 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'2.png',
        right:'0dp',
        bottom:'36.5',
        width:'156dp',
        height:'54dp',
        text:menuTitle[1],
    });
    var menu3 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'3.png',
        right:'0dp',
        bottom:'36.5',
        width:'119.5',
        height:'54dp',
        text:menuTitle[2],
    });
    var menu4 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'4.png',
        right:'0dp',
        bottom:'36.5',
        width:'156dp',
        height:'54dp',
        text:menuTitle[3],
    });
    var menu5 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'5.png',
        right:'0dp',
        width:'222dp',
        height:'54dp',
        text:menuTitle[4],
    });
    
    
    var menuTitle1=Ti.UI.createLabel({
        text:menuTitle[0],
        font:h3,
        color:'white',
        center:{x:'116dp'}
    });
    var menuTitle2=Ti.UI.createLabel({
        text:menuTitle[1],
        font:h3,
        color:'white',
        center:{x:'83dp'}
    });
    var menuTitle3=Ti.UI.createLabel({
        text:menuTitle[2],
        font:h3,
        color:'white',
        center:{x:'68dp'}
    });
    var menuTitle4=Ti.UI.createLabel({
        text:menuTitle[3],
        font:h3,
        color:'white',
        center:{x:'83dp'}
    });
    var menuTitle5=Ti.UI.createLabel({
        text:menuTitle[4],
        font:h3,
        color:'white',
        center:{x:'116dp'}
    });
    menu1.add(menuTitle1);
    menu2.add(menuTitle2);
    menu3.add(menuTitle3);
    menu4.add(menuTitle4);
    menu5.add(menuTitle5);
    
    
    
    menu.add(menu1);
    menu.add(menu2);
    menu.add(menu3);
    menu.add(menu4);
    menu.add(menu5);
    
    var qbutton = require('ui/common/buttonCreator');
    
    function openQuestions(popLabel){
    	var Question = require('ui/common/QuestionView');
    	questions = new Question(popLabel);
    	self.add(questions);
    }
    
    
    function openCallPopUp(popLabel){
           var callDialog = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '90%',
            backgroundColor : '#white',
            borderRadius : 8,
            layout : 'vertical',
            opacity:0.9
        });
        
        var miniSirvi = Titanium.UI.createImageView({
        	height:'50dp',
        	width:'50dp',
        	image:'/images/mainmenu/'+ _title + 'R.png'
        });

        var statuslabel = Ti.UI.createLabel({
            text : 'Your Sirvi ' + popLabel + ' \nConcierge Specialist is waiting.',
            font : h4,
            color : 'black',
            textAlign:'left',
            
        });
        
        var titleView = Titanium.UI.createView({
        	width:'100%',
        	layout:'horizontal',
        	height:Titanium.UI.SIZE,
        	top:'10dp'
        });
        
        titleView.add(miniSirvi);
        titleView.add(statuslabel);
        spacer = Titanium.UI.createView({
        	backgroundColor:'#ddd',
        	width:'100%',
        	height:'1dp',
        	top:'10dp',
        	botttom:'5dp'
        });


        callNow = Titanium.UI.createButton({
        	title:'Call Now',
        	color:'#0ea30e',
        	width:'48%'
        });
        goBack = Titanium.UI.createButton({
        	title:'Go Back',
        	width:'48%'
        });
        verSpacer= Titanium.UI.createView({
        	backgroundColor:'#ddd',
        	width:'1dp',
        	height:'20dp'
        });
        newButton = Titanium.UI.createView({
        	width:'100%',
        	layout:'horizontal',
        	height:Titanium.UI.SIZE
        });
        newButton.add(callNow);
        newButton.add(verSpacer);
        newButton.add(goBack);
        
        callDialog.add(titleView);
        callDialog.add(spacer);
        callDialog.add(newButton);
        callNow.addEventListener('click', function(e){
        	callSirvi(popLabel);
        });
        goBack.addEventListener('click', function() {
            self.remove(callDialog);
            self.remove(overlay);
        });
        
        self.add(overlay);
        self.add(callDialog); 
    }
    
    function callSirvi(intent) {
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
			image : '/images/mainmenu/callBtn.png'
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

		//var url = 'http://healthypeps.com/auth.php';
		//makeCall(this.responseText);
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

				//Ti.API.info(' ' + this.responseText);
				//Twilio.Device.setup(this.responseText);
				//makeCall(this.responseText);
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
			"start_time" : new Date(),//nowTime,
			"intent" : intent,
			"resolution" : "00",
			"recording_url" : "00",
			"end_time" : "00",
			"agentId" : "objectid",
			"appUserId" : userCred['userId'],
			"access_token":userCred['id']
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
			self.add(callDialog); locationCallback;
		}

	}
    
    menu.animate(
        {right:'0dp',duration:1000}, 
        function(){
            menu.animate(
                {right:'-10dp', duration:250, curve:Ti.UI.ANIMATION_CURVE_EASE_OUT}, 
                function(){
                    menu.animate(
                        {right:'0dp', duration:200, curve:Ti.UI.ANIMATION_CURVE_EASE_IN});
                });
        });
    
    
    
    menu.addEventListener('click', function(e){
        openCallPopUp(e.source.text);
        //openQuestions(e.source.text);
    });

    
    Ti.fireEvent('closemainmenu');
    self.add(menu);
    self.add(lawIcon);
    self.add(textBtn);
    
    
    textBtn.addEventListener('click', function(){
        Ti.fireEvent('mainmenu');
        Ti.fireEvent('closelawview');
    });
    
    
    return self;
}
module.exports = lawView;