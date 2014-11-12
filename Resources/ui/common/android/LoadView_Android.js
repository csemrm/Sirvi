//FirstView Component Constructor
function LoadView(_dur) {
    //create object instance, a parasitic subclass of Observable
    
    var appglobal = require('../AppGlobals');
    
   // alert('px '+appglobal.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight)+' dp '+Ti.Platform.displayCaps.platformHeight);
    
    if(Ti.Platform.osname!= 'mobileweb'){
    var fb = require('facebook');
    fb.appid = 214878188648827;
    fb.permissions = ['email'];
    }
	
    var imagepath = '/images/load/';
    var self = Ti.UI.createView({
        width : '100%',
        height : '100%',
        zIndex : -2
    });

    var images = [];
    for (var i = 1; i < 130; i++) {
        images.push('/images/loopImages/' + i + '.jpeg');
    }

    var videoFile = Titanium.UI.createImageView({
        images : images,
        duration : 100, // in milliseconds, the time before next frame is shown
        repeatCount : 0, // 0 means animation repeats indefinitely, use > 1 to control repeat count
        top : 0,
        zIndex : -1,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });

    var h1 = {fontFamily : 'HelveticaNeue-Thin',fontSize : '32dp',color : '#fff'};
    var h2 = {fontFamily : 'HelveticaNeue-Thin',fontSize : '22dp',color : '#fff'};
    //label using localization-ready strings from <app dir>/i18n/en/strings.xml

    var logoImg = Ti.UI.createImageView({
        image : imagepath + 'logo.png',
        top : '-320dp'
    });

 
var horz_buttons = Ti.UI.createView({
    layout: 'horizontal',
    height: '200dp',
    top:'0dp',
    width: '250dp'
});
 
 
    var mailIcon = Titanium.UI.createImageView({
        image : imagepath + 'mail.png',
        width : '71.5dp',
        height : '72dp',
        left:'10dp',
        top :'16dp'
    });

    var fbIcon = Titanium.UI.createImageView({
        image : imagepath + 'fb.png',
        width : '71.5dp',
        left:'10dp',
        height : '72dp',
        top :'0dp'
    });

    var twIcon = Titanium.UI.createImageView({
        image : imagepath + 'tw.png',
        width : '71.5dp',
        height : '72dp',
        left:'10dp',
        top :'16dp'
    });

	var menuWidth = appglobal.PixelsToDPUnites(Ti.Platform.displayCaps.platformWidth) + 140;
    var loginMenu = Titanium.UI.createView({
        height : menuWidth,
        width : menuWidth,
        layout : 'vertical',
        bottom : -(appglobal.PixelsToDPUnites(Ti.Platform.displayCaps.platformWidth)/2)-100,
        anchorPoint : {
            x : 0.0,
            y : 0.0
        },
        transform : Ti.UI.create2DMatrix().rotate(180),
    });

    horz_buttons.add(mailIcon);
    horz_buttons.add(fbIcon);
    horz_buttons.add(twIcon);
	loginMenu.add(horz_buttons);

    var a = Titanium.UI.createAnimation({
        opacity : 1,
        transform : Ti.UI.create2DMatrix().rotate(0),
        duration : 1000,
        curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
        autoreverse:false
    });

    var b = Titanium.UI.createAnimation({
        opacity : 0,
        duration : 500
    });
    var c = Titanium.UI.createAnimation({
        opacity : 1,
        duration : 1000
    });

    var arrow = Titanium.UI.createImageView({
        image : imagepath + 'arrow.png',
        top : '0dp'
    });
    var eclipse = Titanium.UI.createImageView({
        image : imagepath + 'eclipse.png',
        bottom : '0dp',
    });

    var bottomView = Ti.UI.createView({
        height : '175.5dp',
        width : '319.5dp',
        bottom : '-320dp'
    });
    bottomView.add(arrow);
    bottomView.add(eclipse);

    var loginLabel = Ti.UI.createImageView({
        image : imagepath + 'loginLabel.png',
        bottom : '10dp',
        opacity : 0
    });

    self.add(loginMenu);
    loginMenu.animate(a);

    //Add behavior for UI
    function loginRegister() 
    {
        loginMenu.animate(a);
        arrow.animate(b);
        
        self.add(loginLabel);
        loginLabel.animate(c);
    };

    mailIcon.addEventListener('click', pageMoveUp);
    fbIcon.addEventListener('click', fblogin);
    twIcon.addEventListener('click', pageMoveUp);
    loginLabel.addEventListener('click', pageMoveUpL);

    function fblogout() {
        fb.logout();
    }

    function fblogin() {
    	fblogout();
        fb.addEventListener('login', function(e) {
            if (e.success) {
                var data = e.data;
                Ti.API.info(data);
                var locationData = data.location.name.split(',');
                Ti.App.Properties.setString('socialType', 'fb');
                Ti.App.Properties.setString("socialUserId", data.id);
                Ti.App.Properties.setString('socialfirstname', data.first_name);
                Ti.App.Properties.setString('sociallastname', data.last_name);
                Ti.App.Properties.setString('socialUserEmail', data.email);
                Ti.App.Properties.setString('birthday', data.birthday);
                Ti.App.Properties.setString('city', locationData[0]);
                Ti.App.Properties.setString('state', locationData[1]);
                fbsignup(data);
            } else if (e.error) {
                alert(e.error);
            } else if (e.cancelled) {
                alert("Canceled");
            }
        });
        fb.authorize();
    }

    function fbsignup(data) {
        var apiCall = '/api/appUsers';
        var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
        var url = apiURL + apiCall;
        
        var locationData = data.location.name.split(',');

        var client = Ti.Network.createHTTPClient({
            onload : function(e) {
                Ti.API.info(this.responseText);
                saveInfo(JSON.parse(this.responseText));
            },
            onerror : function(e) {
                Ti.API.info(e);
                if (e.code == 422) {
                	saveInfoFB(JSON.parse(this.responseText));
                	Ti.App.fireEvent('mainmenu');
                } else {
                    alert('Check your internet connection and try again');
                }
            },
            timeout : 5000
        });

        params = {
            details : {
                masked_email : data.email,
                first_name : data.first_name,
                last_name : data.last_name,
                profile_image:'http://graph.facebook.com/'+ data.id + '/picture?height=220&width=220',
                birthday : data.birthday,
                city : locationData[0],
                state:locationData[1],
                education:data.education,
                work:data.work,
                gender:data.gender
            },
            email : data.email,
            password : data.id,
            faceboook: data
        };

        client.open("POST", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset', 'utf-8');
        client.send(JSON.stringify(params));
    }

    function saveInfo(data) {
        userData = data;
        userData['email'] = Ti.App.Properties.getString('socialUserEmail');
        userData['password'] = Ti.App.Properties.getString("socialUserId");
        userData['fname'] = Ti.App.Properties.getString('socialfirstname');
        userData['lname'] = Ti.App.Properties.getString('sociallastname');
        userData['city'] = Ti.App.Properties.getString('city');
        userData['bday'] = Ti.App.Properties.getString('birthday');
        userData['password'] = Ti.App.Properties.getString("socialUserId");
        loginReq();
        Ti.App.Properties.setBool('loggedIn', true);

        Ti.App.fireEvent('loadBack');
        self.animate({
            opacity : 0,
            duration : 750
        }, function() {
            self = null;
        });
        Ti.App.fireEvent('TutorialView');

    }
    function saveInfoFB(data) 
    {
        userData = data;
        userData['email'] = Ti.App.Properties.getString('socialUserEmail');
        userData['password'] = Ti.App.Properties.getString("socialUserId");
        userData['fname'] = Ti.App.Properties.getString('socialfirstname');
        userData['lname'] = Ti.App.Properties.getString('sociallastname');
        userData['city'] = Ti.App.Properties.getString('city');
        userData['bday'] = Ti.App.Properties.getString('birthday');
        userData['password'] = Ti.App.Properties.getString("socialUserId");
        loginReq();
        Ti.App.Properties.setBool('loggedIn', true);
    }

    function loginReq(){
        var loginapiCall = '/api/appUsers/login';
        var loginapiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
        var loginurl = loginapiURL + loginapiCall;
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 //Ti.API.info(e.success);
                 Ti.API.info(this.responseText);
                 saveLoginInfo(JSON.parse(this.responseText));
                 
             },
             onerror : function(e) {
                 Ti.API.info(e.error + ' ' + JSON.stringify(e));
             },
             timeout : 5000 
         });

        params = {
            email:Ti.App.Properties.getString('socialUserEmail'),
            password:Ti.App.Properties.getString("socialUserId")
        };
        
        client.open("POST", loginurl);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send(JSON.stringify(params));
        Ti.API.info(JSON.stringify(params));
    }
    
    function saveLoginInfo(data){
        userData['userId']=data.userId;
        userData['id']=data.id;
        Ti.API.info(userData);
        Ti.App.Properties.setObject('userCred',userData);
        
    }
    
    var openingAnimation = function() 
    {
        self.add(bottomView);
        self.add(logoImg);
        bottomView.animate({
            bottom : '0dp',
            duration : _dur,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        logoImg.animate({
            top : '25dp',
            duration : _dur,
            curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        }, function() {
            self.addEventListener('click', loginRegister);
            bottomView.addEventListener('click', loginRegister);
        });
    };
    if (!_dur) 
    {
        bottomView.bottom = appglobal.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight);
        self.add(bottomView);
        bottomView.animate({
            bottom : '0dp',
            duration : 750
        });
        self.animate({
            bottom : '0dp',
            duration : 750
        });
        loginRegister();
        logoImg.top = '25dp';
        self.add(logoImg);
    }
	if (_dur) {
            setTimeout(openingAnimation, 3000);
        }
    
    videoFile.addEventListener('load', function(e) {
        videoFile.start();
        if (_dur) {
            setTimeout(openingAnimation, 3000);
        }
    });
    
    self.add(videoFile);
	
	
    function pageMoveUp() 
    {
        bottomView.animate({
            bottom :  appglobal.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight),
            duration : 750,
            autoreverse : false
        }, function() {
            self = null;
        });
        Ti.App.fireEvent('signup');
    }
	
	
    function pageMoveUpL() 
    {
    	videoFile.stop();
    	//Ti.App.fireEvent('login');
    	GoToMainWindow();
        self.animate({
            bottom : appglobal.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight),
            duration : 750,
            autoreverse : false
        }, function(){});
        
    }

//this function leads to main home window after user login or signup
function GoToMainWindow()
{
		var MainMenu = require('ui/common/android/MainMenu_Android');
		var homeWindow = new MainMenu();

	    //open the main page as heavy android window 
        var winMain = Ti.UI.createWindow({ fullscreen : false, exitOnClose:true,orientationModes: [ Ti.UI.PORTRAIT] });
    	winMain.add(homeWindow);
    	winMain.open({animated:false});
}

    return self;
}

module.exports = LoadView;
