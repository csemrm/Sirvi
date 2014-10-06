//FirstView Component Constructor
function MainMenu() {
    //create object instance, a parasitic subclass of Observable
    var imagepath = '/images/mainmenu/';
    var self = Ti.UI.createView({
        backgroundImage : imagepath + 'background.png',
    });
    loaded = false;
    textloaded = false;
    var qbutton = require('ui/common/buttonCreator');

    var userCred = Ti.App.Properties.getObject('userCred');
    var longitude;
    var latitude;

    var apiCall = '/api/appUsers/' + userCred['userId'];
    var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
    var url = apiURL + apiCall;

    var h1 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '28dp',
        color : '#fff'
    };
    var h2 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '18dp',
        color : '#fff'
    };
    var h3 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '14dp',
        color : '#fff'
    };

    var textBtn = Ti.UI.createImageView({
        image : imagepath + 'text.png',
        left : '12.5dp',
        center : {
            y : '50dp'
        }
    });
    var textChat = require('ui/common/FirstView');
    /*textBtn.addEventListener('click', function() {
        if (!textloaded) {
            chatView = new textChat();
            self.add(chatView);
            textloaded = true;
        } else {
            chatView.show();
        }
    });*/

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
    function locationCallback(e) {
        if (!e.success || e.error) {
            Ti.API.info('error: location callback: ' + JSON.stringify(e.error));
            return;
        }

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
                alert('Error');
            },
            timeout : 5000 // in milliseconds
        });

        params = {
            access_token : userCred['id'],
            //id:userCred['userId'],
            last_location : latitude + ',' + longitude
        };

        /*client.open("PUT", url);
         client.setRequestHeader("Content-Type", "application/json");
         client.setRequestHeader('charset','utf-8');
         client.send(JSON.stringify(params));*/
        Ti.API.info(JSON.stringify(params));
    };

    Titanium.Geolocation.addEventListener('location', locationCallback);

    var spacer = Ti.UI.createView({
        height : '10dp',
    });

    var menuButton = Ti.UI.createImageView({
        image : imagepath + 'menu.png',
        right : '12.5dp',
        center : {
            y : '50dp'
        }
    });

    var helpButton = Ti.UI.createImageView({
        image : imagepath + 'help.png',
        left : '12.5dp',
        bottom : '15dp'
    });

    var helpScreen = Ti.UI.createImageView({
        image : imagepath + 'helpScreen.png',
        bottom : '0dp'
    });

    var profileButton = Ti.UI.createImageView({
        image : imagepath + 'profile.png',
        right : '12.5dp',
        bottom : '15dp'
    });

    var callBtn = Ti.UI.createImageView({
        image : imagepath + 'sirviR.png',
        left : '-320dp'
    });
    callBtn.addEventListener('click', function() {
        callSirvi();
    });

    var overlay = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        backgroundColor : '#333',
        opacity : 0.7
    });

    function callSirvi() {
        var Twilio = require('com.twilio.client');

        var callDialog = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '90%',
            backgroundColor : '#white',
            borderColor : '#ccc',
            borderRadius : 8,
            borderWidth : 2,
            layout : 'vertical'
        });

        var statuslabel = Ti.UI.createLabel({
            text : 'Connecting...',
            font : h1,
            color : 'black'
        });

        var spacer = Ti.UI.createView({
            height : '10dp',
        });

        newButton = qbutton.createButton('Disconnect', '#b40301');
        callDialog.add(statuslabel);
        callDialog.add(newButton);
        callDialog.add(spacer);
        newButton.addEventListener('click', function() {
            Twilio.Device.disconnectAll();
            self.remove(callDialog);
            self.remove(overlay);
        });

        var url = 'http://healthypeps.com/auth.php';
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
        image : imagepath + 'healthR.png',
        width : '72.5dp',
        height : '73dp'
    });
    var lawBig = Ti.UI.createImageView({
        image : imagepath + 'lawR.png',
        width : '73.5dp',
        height : '74dp'
    });
    var datingBig = Ti.UI.createImageView({
        image : imagepath + 'dateR.png',
        width : '72.5dp',
        height : '73dp'
    });
    var lawBtn = Ti.UI.createImageView({
        image : imagepath + 'law.png',
        top : '0dp',
        left : '20dp'
    });
    var healthBtn = Ti.UI.createImageView({
        image : imagepath + 'health.png',
        right : '0dp',
    });
    var datingBtn = Ti.UI.createImageView({
        image : imagepath + 'dating.png',
        right : '45.5dp',
        bottom : '0dp'
    });
    var financeBtn = Ti.UI.createImageView({
        image : imagepath + 'finance.png',
        right : '65dp',
        bottom : '-40dp',

    });
    var raffleBtn = Ti.UI.createImageView({
        image : imagepath + 'raffle.png',
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
            y : Ti.Platform.displayCaps.platformHeight / 2
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
    });

    lawBtn.addEventListener('click', function(e) {
        if (!Ti.App.Properties.getBool('questions', false)) {
            loadQuestions();
        } else {
            var dTop = ((Ti.Platform.displayCaps.platformHeight - 386.5) / 2) + 36.75;
            var dLeft = (Ti.Platform.displayCaps.platformWidth - 163.25);
            lawBig.center = {
                x : dLeft,
                y : dTop
            };
            self.add(lawBig);
            lawBtn.hide();
            lawBig.animate(planetZoom);
            childView.animate(planetRotateOut, function(e) {
                Ti.fireEvent('lawview', {
                    x : 'law'
                });
            });
            callBtn.animate(shrinkBtn);
        }
    });

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
            self.add(healthBig);
            healthBtn.hide();
            healthBig.animate(planetZoom);
            childView.animate(planetRotateOut, function() {
                Ti.fireEvent('lawview', {
                    x : 'health'
                });
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
            self.add(datingBig);
            datingBtn.hide();
            datingBig.animate(planetZoom);
            childView.animate(planetRotateOut, function() {
                Ti.fireEvent('lawview', {
                    x : 'date'
                });
            });
            callBtn.animate(shrinkBtn);
        }
    });

    var Question = require('ui/common/QuestionView');
    raffleBtn.addEventListener('click', function(e) {
        loadQuestions();
    });

    function loadQuestions() {
        if (!loaded) {
            QuestionView = new Question();
            self.add(QuestionView);
            loaded = true;
        } else {
            QuestionView.show();
        }
    }


    financeBtn.addEventListener('click', function(e) {
        var offersView = require('ui/common/Offers');
        self.add(new offersView);
    });
    var rewardsView = require('ui/common/rewards');

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
        self.add(overlay);
        var logoutScreen = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '90%',
            layout : 'vertical'
        });

        var logoutButton = qbutton.createButton('Logout', '#b40301');
        var backtoApp = qbutton.createButton('Back To App', '#23b823');

        logoutScreen.add(logoutButton);
        logoutScreen.add(backtoApp);
        logoutScreen.add(spacer);

        self.add(logoutScreen);

        backtoApp.addEventListener('click', function() {
            self.remove(logoutScreen);
            self.remove(overlay);
        });

        logoutButton.addEventListener('click', function() {
            Ti.App.Properties.setBool('loggedIn', false);
            Ti.fireEvent('load');
            self.remove(logoutScreen);
            self.remove(overlay);
        });

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
    self.add(helpScreen);
    helpScreen.hide();

    return self;
}

module.exports = MainMenu;
