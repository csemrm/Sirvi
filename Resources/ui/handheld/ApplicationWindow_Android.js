//Application Window Component Constructor
function ApplicationWindow_Android() {
	//var apiURL = 'http://104.131.124.227:3000';

	var apiURL = 'http://104.131.124.227:3000';
	//var apiURL = 'http://104.131.124.227:3000';
	Ti.App.Properties.setString('apiURL', apiURL);
	var imagepath = '/images/load/';
	var self = Ti.UI.createWindow({
		backgroundImage : imagepath + 'startBack.png',
		orientationModes: [ Ti.UI.PORTRAIT],
		//statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
	});
  
  var appgloabl = require("../common/AppGlobals");
  
  	var Load = require('ui/common/android/LoadView_Android');
	var Signup = require('ui/common/android/SignupView_Android');
	var Login = require('ui/common/android/LoginView_Android');
	
	// var Tutorial = require('ui/common/android/TutorialView_Android');
	// var Interests = require('ui/common/android/InterestsView_Android');
	// var PreMain = require('ui/common/android/PreMain_Android');
	// var MainMenu = require('ui/common/android/MainMenu_Android');
	// var Tag = require('ui/common/android/TagView_Android');
	// //var Law = require('ui/common/android/lawView_Android');
	// var Question = require('ui/common/android/QuestionView_Android');
	// var Profile = require('ui/common/android/ProfileView_Android');
	
	var userCred = Ti.App.Properties.getObject('userCred', {});

	var apiCall = '/api/appUsers/login';
	//var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;

	var loginStatus = Ti.App.Properties.getBool('loggedIn', false);

	userEmail = Ti.App.Properties.getString('email', '');
	userPass = Ti.App.Properties.getString('pass', '');

	if ((userEmail) && (userPass) && (loginStatus)) 
	{
		loginReq();
	} else {
		LoadView = new Load(2000);
		self.add(LoadView);
	}

	function loginReq() {
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				//Ti.API.info(e.success);
				Ti.API.info(this.responseText);
				saveInfo(JSON.parse(this.responseText));
			},
			onerror : function(e) {
				Ti.API.info(e.error + ' ' + JSON.stringify(e));
				LoadView = new Load(2000);
				self.add(LoadView);
			},
			timeout : 5000
		});

		params = {
			email : userEmail,
			password : userPass
		};

		client.open("POST", url);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
	}

	function saveInfo(data) {
		var userData = data;
		Ti.App.Properties.setObject('userCred', userData);
		//Ti.App.Properties.setBool('loggedIn',true);
		//MainMenuView = new MainMenu();
		//self.add(MainMenuView);
	}

	
	Ti.App.addEventListener('load', function(e) 
	{
		self.remove(MainMenuView);
		LoadView = new Load(2000);
		self.add(LoadView);
	});

	Ti.App.addEventListener('signup', function(e) {
		self.backgroundImage = null;
		self.backgroundColor = '#23b823';
		SignupView = new Signup();
		self.add(SignupView);
	});

	Ti.App.addEventListener('closeSignup', function(e) {
		self.backgroundImage = null;
		self.backgroundColor = '#23b823';
		LoadView = new Load(0);
		self.add(LoadView);
	});

	Ti.App.addEventListener('login', function(e) 
	{
		self.backgroundImage = null;
		self.backgroundColor = '#23b823';
		LoginView = new Login();
		self.add(LoginView);
	});

	Ti.App.addEventListener('closeLogin', function(e) 
	{
		self.backgroundImage = null;
		self.backgroundColor = '#23b823';
		LoadView = new Load(0);	
		self.add(LoadView);
	});
	
	/*
	Ti.App.addEventListener('TutorialView', function(e) {

		TutorialView = new Tutorial();
		self.add(TutorialView);
	});

	Ti.App.addEventListener('closeTutorial', function(e) {
		self.remove(TutorialView);
	});
	Ti.App.addEventListener('closemainmenu', function(e) {
		self.remove(MainMenuView);
	});
	Ti.App.addEventListener('closelawview', function(e) {
		self.remove(lawView);
	});

	Ti.App.addEventListener('loadBack', function(e) {
		self.backgroundColor = 'transparent';
		self.backgroundImage = '/images/mainmenu/background.png';
	});

	Ti.App.addEventListener('interestsview', function(e) {
		InterestsView = new Interests();
		self.add(InterestsView);
	});
	Ti.App.addEventListener('questionview', function(e) {
		QuestionView = new Question();
		self.add(QuestionView);
	});
	Ti.App.addEventListener('premain', function(e) {
		PreMainView = new PreMain();
		self.add(PreMainView);
	});
	Ti.App.addEventListener('tagview', function(e) {
		TagView = new Tag();
		self.add(TagView);
	});
	Ti.App.addEventListener('mainmenu', function(e) {
		MainMenuView = new MainMenu();
		self.add(MainMenuView);
	});
	Ti.App.addEventListener('lawview', function(e) {
		lawView = new Law(e.x);
		self.add(lawView);
	});
	*/
	return self;
}

module.exports = ApplicationWindow_Android;
