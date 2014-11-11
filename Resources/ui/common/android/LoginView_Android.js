//FirstView Component Constructor
function LoginView() 
{
	var appgloabl = require("../AppGlobals");
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor : '#23b823',
		height : '100%',//Ti.Platform.displayCaps.platformHeight,
		width : '100%',//Ti.Platform.displayCaps.platformWidth,
		bottom : -(appgloabl.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight))
	});
	self.animate({
		bottom : '0dp',
		duration : 750
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var imagepath = '/images/login/';

	var backButton = Ti.UI.createView({
		height : '30dp',
		width : '40dp',
		center : {
			y : '20dp'
		}
	});
	self.add(backButton);

	var arrowImg = Ti.UI.createImageView({
		image : imagepath + 'arrow@2x.png'
	});
	backButton.add(arrowImg);

	var apiCall = '/api/appUsers/login';
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;

	var welcomeImg = Ti.UI.createImageView({
		image : imagepath + 'welcome@2x.png',
		center : { y : '50dp' }
	});
	self.add(welcomeImg);

	var welcomeLabel = Ti.UI.createLabel({
		text : 'Welcome Back',
		font : appgloabl.getFont('28dp'),
		color : 'white',
		center : { y : '50dp' }
	});
	self.add(welcomeImg);
	self.add(welcomeLabel);

	//Emial Textfield SetUp
	var viewEmail = Ti.UI.createView({ height:'30dp',width : '229.5dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'user@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
	
		var userField = Ti.UI.createTextField({
			hintText : 'EMAIL',
			font : appgloabl.getFont('18dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white'
		});
		viewEmail.add(userFieldImg);
		viewEmail.add(userField);
	}
	//Password Field SetUp
	var viewPassword = Ti.UI.createView({ height:'30dp',top : '28.5dp',width : '229.5dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'pass@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
		var passField = Ti.UI.createTextField({
			hintText : 'PASSWORD',
			font : appgloabl.getFont('18dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			passwordMask : true
		});
		viewPassword.add(userFieldImg);
		viewPassword.add(passField);
	}


	var loginBtn = Ti.UI.createButton({
		height : '47dp',
		width : '170.5dp',
		top : '28.5dp',
		title : 'LOGIN',
		color : 'white',
		font : appgloabl.getFont('28dp'),
		backgroundImage : imagepath + 'loginbtn@2x.png',
	});

	var checkBox = Ti.UI.createImageView({
		image : imagepath + 'checkOn@2x.png',
		height : '9dp'
	});

	var keepLoginLabel = Ti.UI.createLabel({
		text : 'Keep me logged in',
		font : appgloabl.getFont('14dp'),
		color : 'white',
		left : '5dp',
		height : '25dp'
	});

	var forgotPassLabel = Ti.UI.createLabel({
		text : 'Forgot Password',
		font : appgloabl.getFont('14dp'),
		color : 'white',
		left : '10dp',
		height : '25dp'
	});

	var labelView = Ti.UI.createView({
		width : '100%',
		top : '14dp',
		height : '25dp',
		layout : 'horizontal'
	});

	var loggedInView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : '25dp',
		layout : 'horizontal'
	});
	labelView.add(checkBox);
	labelView.add(keepLoginLabel);
	labelView.add(loggedInView);
	labelView.add(forgotPassLabel);

	var formView = Ti.UI.createScrollView({
		width : '240dp',
		layout : 'vertical',
		height : '200dp',
		center : {
			y : '50%'
		}
	});
	formView.add(viewEmail);
	formView.add(viewPassword);
	formView.add(loginBtn);
	formView.add(labelView);
	self.add(formView);

	var noAccountLabel = Ti.UI.createLabel({
		text : 'Don\'t have an account? ',
		font : appgloabl.getFont('18dp'),
		color : 'white'
	});

	var signUpLabel = Ti.UI.createLabel({
		text : 'Sign Up',
		font : appgloabl.getFont('18dp'),
		color : 'yellow',
	});

	var bottomLabelView = Titanium.UI.createView({
		width : Ti.UI.SIZE,
		layout : 'horizontal',
		bottom : '25dp',
		height : '20dp',
	});
	bottomLabelView.add(noAccountLabel);
	bottomLabelView.add(signUpLabel);

	self.add(bottomLabelView);

	keepLoginLabel.addEventListener('click', toggleLogin);
	checkBox.addEventListener('click', toggleLogin);

	bottomLabelView.addEventListener('click', function() {
		self.animate({
			bottom : - appgloabl.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight),
			duration : 750
		}, function() {
			self = null;
		});
		Ti.App.fireEvent('signup');
	});

	self.add(bottomLabelView);

	function loginReq() {
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				//Ti.API.info(e.success);
				Ti.API.info(this.responseText);
				if (checkBox.image == imagepath + 'checkOn@2x.png') {
					saveInfo(JSON.parse(this.responseText));
				} else if (checkBox.image == imagepath + 'checkOff@2x.png') {
					dontSaveInfo(JSON.parse(this.responseText));
				}
			},
			onerror : function(e) {
				Ti.API.info(e.error + ' ' + JSON.stringify(e));
				alert('Invalid Email Or Password');
			},
			timeout : 5000 // in milliseconds
		});

		params = {
			email : userField.value.toLowerCase(),
			password : passField.value
		};

		client.open("POST", url);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
	}

	function saveInfo(data) {
		var userData = data;
		userData['email'] = userField.value.toLowerCase();
		userData['password'] = passField.value;
		Ti.App.Properties.setString('email', userField.value.toLowerCase());
		Ti.App.Properties.setString('pass', passField.value);
		Ti.App.Properties.setObject('userCred', userData);
		Ti.App.Properties.setBool('loggedIn', true);
		Ti.fireEvent('loadBack');
		self.animate({
			opacity : 0,
			duration : 750
		}, function() {
			self = null;
		});
		Ti.App.fireEvent('mainmenu');
	}

	function dontSaveInfo(data) {
		var userData = data;
		userData['email'] = userField.value.toLowerCase();
		userData['password'] = passField.value;
		Ti.App.Properties.setObject('userCred', userData);
		Ti.App.Properties.setBool('loggedIn', false);
		Ti.fireEvent('loadBack');
		self.animate({
			opacity : 0,
			duration : 750
		}, function() {
			self = null;
		});
		Ti.App.fireEvent('mainmenu');
	}

	function toggleLogin() {
		if (checkBox.image == imagepath + 'checkOn@2x.png') {
			checkBox.image = imagepath + 'checkOff@2x.png';
		} else if (checkBox.image == imagepath + 'checkOff@2x.png') {
			checkBox.image = imagepath + 'checkOn@2x.png';
		}
	}


	loginBtn.addEventListener('click', function(e) {
		userField.blur();
		passField.blur();
		loginReq();
	});
	backButton.addEventListener('click', function(e) 
	{
		self.animate({
			bottom : -(appgloabl.PixelsToDPUnites(Ti.Platform.displayCaps.platformHeight)),
			duration : 750
		}, function() {
				
		});
		Ti.App.fireEvent('closeLogin');
	});

	forgotPassLabel.addEventListener('click', function(e) 
	{
		/*
		passDialog = Titanium.UI.createAlertDialog({
			title : 'Please Enter your email address',
			style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames : ['OK']
		});
		passDialog.show();
		*/
		var vwAlert = Ti.UI.createView({
    		width       : '90%',
    		height      : '30%',
    		borderRadius: 5
		}); 
		var vwBgAlert = Ti.UI.createView({
    		width       : '100%',
    		height      : '100%',
    		layout      : 'vertical',
    		backgroundColor : 'white',
    		opacity		: 0.98,
    		borderRadius: 5
		});
		var vwForm = Ti.UI.createView({
    		width       : '100%',
    		height      : '100%',
    		layout      : 'vertical',
    		borderRadius: 5
		});
		var lblMessage = Ti.UI.createLabel({
    		text        : 'Please Enter your email address',
    		top         : 10,
    		color       : 'black',
    		font        : {fontWeight : 'bold', fontSize : '18'}
		});

		var txtPassword = Ti.UI.createTextField({
    		width       :  '90%',
    		top         :  '15',
    		color		: 'black',
    		font:appgloabl.getFont('18dp'),
    		//hintText    : 'Please Enter your email address',
    		//borderStyle     : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    		keyboardType	: Ti.UI.KEYBOARD_EMAIL,
    		returnKeyType   : Ti.UI.RETURNKEY_RETURN,
    		maxLength       : 70
		});

		var btnOK = Ti.UI.createButton({
    		title   : 'OK',
    		width   : '43%',
    		top     : '15',
    		color 	: '#007AFF',
    		font    : {fontWeight : 'bold', fontSize : '16'}
		});
		btnOK.addEventListener('click',function(e){
			self.remove(vwAlert);
		});
		vwAlert.add(vwBgAlert);
		vwAlert.add(vwForm);
		vwForm.add(lblMessage);
		vwForm.add(txtPassword);
		vwForm.add(btnOK);
		self.add(vwAlert);
		txtPassword.focus();
	});

	return self;
}

module.exports = LoginView;
