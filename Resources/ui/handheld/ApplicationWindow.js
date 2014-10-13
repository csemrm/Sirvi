//Application Window Component Constructor
function ApplicationWindow() {
	//var apiURL = 'http://104.131.124.227:3000';
	
	var apiURL = 'http://104.131.124.227:3000';
	//var apiURL = 'http://104.131.124.227:3000';
	Ti.App.Properties.setString('apiURL',apiURL);
	var imagepath='/images/load/';
	var self = Ti.UI.createWindow({
        backgroundImage:imagepath + 'startBack.png',
        //statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
    });
    
	var Load = require('ui/common/LoadView');
	var Signup = require('ui/common/SignupView');
	var Login = require('ui/common/LoginView');
	var Tutorial = require('ui/common/TutorialView');
	var Interests = require('ui/common/InterestsView');
	var PreMain = require('ui/common/PreMain');
	var MainMenu = require('ui/common/MainMenu');
	var Tag = require('ui/common/TagView');
	var Law = require('ui/common/lawView');
	var Question = require('ui/common/QuestionView');
	var Profile = require('ui/common/ProfileView');
	var userCred = Ti.App.Properties.getObject('userCred',{});
	
	var apiCall = '/api/appUsers/login';
	//var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;
	
	var loginStatus = Ti.App.Properties.getBool('loggedIn',false);
	
	userEmail = Ti.App.Properties.getString('email', '');
    userPass = Ti.App.Properties.getString('pass','');
	
	if((userEmail)&&(userPass)&&(loginStatus)){
		loginReq();
	}else{
       LoadView = new Load(2000);
       self.add(LoadView);
	}
	
	function loginReq(){
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 //Ti.API.info(e.success);
                 Ti.API.info(this.responseText);
                 saveInfo(JSON.parse(this.responseText));
             },
             onerror : function(e) {
                 Ti.API.info(e.error + ' ' + JSON.stringify(e));
                 alert('Invalid Email Or Password');
             },
             timeout : 5000  
         });

        params = {
            email:userEmail,
            password:userPass
        };
        
        client.open("POST", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send(JSON.stringify(params));
        Ti.API.info(JSON.stringify(params));
    }
    
    function saveInfo(data){
	    var userData= data;
	    Ti.App.Properties.setObject('userCred',userData);
	    //Ti.App.Properties.setBool('loggedIn',true);
	    MainMenuView = new MainMenu();
        self.add(MainMenuView);
	}
	
	Ti.addEventListener('load', function(e){
	   self.remove(MainMenuView);
       LoadView = new Load(2000);
       self.add(LoadView);
    });
	
	Ti.addEventListener('signup', function(e){
	    self.backgroundImage=null;
	    self.backgroundColor='#23b823';
        SignupView = new Signup();
        self.add(SignupView);
	});
	
	Ti.addEventListener('closeSignup', function(e){
	    self.backgroundImage=null;
        self.backgroundColor='#23b823';
	    LoadView = new Load(0);
        self.add(LoadView);
	});
	
	Ti.addEventListener('login', function(e){
	    self.backgroundImage=null;
        self.backgroundColor='#23b823';
        LoginView = new Login();
        self.add(LoginView);
    });
	
	Ti.addEventListener('closeLogin', function(e){
	    self.backgroundImage=null;
        self.backgroundColor='#23b823';
        LoadView = new Load(0);
        self.add(LoadView);
    });
	
	Ti.addEventListener('TutorialView', function(e){
	    
        TutorialView = new Tutorial();
        self.add(TutorialView);
    });
    
    Ti.addEventListener('closeTutorial', function(e){
        self.remove(TutorialView);
    });
    Ti.addEventListener('closemainmenu', function(e){
        self.remove(MainMenuView);
    });
    Ti.addEventListener('closelawview', function(e){
        self.remove(lawView);
    });
    
    Ti.addEventListener('loadBack', function(e){
        self.backgroundColor='transparent';
        self.backgroundImage='/images/mainmenu/background.png';
    });
    
    Ti.addEventListener('interestsview', function(e){
        InterestsView = new Interests();
        self.add(InterestsView);
    });
    Ti.addEventListener('questionview', function(e){
        QuestionView = new Question();
        self.add(QuestionView);
    });
    Ti.addEventListener('premain', function(e){
        PreMainView = new PreMain();
        self.add(PreMainView);
    });
    Ti.addEventListener('tagview', function(e){
        TagView = new Tag();
        self.add(TagView);
    });
    Ti.addEventListener('mainmenu', function(e){
        MainMenuView = new MainMenu();
        self.add(MainMenuView);
    });
    Ti.addEventListener('lawview', function(e){
        lawView = new Law(e.x);
        self.add(lawView);
    });

	return self;
}

module.exports = ApplicationWindow;
