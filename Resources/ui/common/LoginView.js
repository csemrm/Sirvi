//FirstView Component Constructor
function LoginView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
        backgroundColor:'#23b823',
        height:Ti.Platform.displayCaps.platformHeight,
        width:Ti.Platform.displayCaps.platformWidth,
        bottom:-Ti.Platform.displayCaps.platformHeight
    });
    self.animate({bottom:'0dp',duration:750});
    
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    
    var h4 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	
	var imagepath = '/images/login/';
	
	var backButton = Ti.UI.createView({
	    height:'30dp',
	    width:'40dp',
	    center:{y:'40dp'}
	});
	self.add(backButton);
	
	var arrowImg = Ti.UI.createImageView({
        image:imagepath + 'arrow.png'
    });
    backButton.add(arrowImg);
	
	var apiCall = '/api/appUsers/login';
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;
	
    
    var welcomeImg = Ti.UI.createImageView({
        image:imagepath + 'welcome.png',
        center:{y:'100dp'}
    });
    self.add(welcomeImg);
    
    var welcomeLabel = Ti.UI.createLabel({
        text:'Welcome Back',
        font:h1,
        color:'white',
        center:{y:'100dp'}
    });
    
    
    self.add(welcomeImg);
	self.add(welcomeLabel);
	
	var userField = Ti.UI.createTextField({
	    backgroundImage:imagepath + 'user.png',
	    hintText:'EMAIL',
	    font:h2,
	    width:'229.5dp',
	    height:'28.5dp',
	    paddingLeft:'35dp',
	    color:'white'
	});
	
	var passField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'pass.png',
        hintText:'PASSWORD',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        top:'28.5dp',
        paddingLeft:'35dp',
        color:'white',
        passwordMask:true
    });
	
	var loginImg = Ti.UI.createImageView({
	    image:imagepath + 'loginbtn.png',
	    height:'47dp',
	    width:'170.5dp'
	});
	
	var loginLabel = Ti.UI.createLabel({
	    text:'LOGIN',
	    font:h1,
	    color:'white'
	});
	
	var loginBtn = Ti.UI.createButton({
	    height:'47dp',
        width:'170.5dp',
        top:'28.5dp'
	});
	
	loginBtn.add(loginImg);
	loginBtn.add(loginLabel);
	
	var checkBox = Ti.UI.createImageView({
	    image:imagepath + 'checkOn.png',
	    height:'9dp'
	});
	
	var keepLoginLabel = Ti.UI.createLabel({
	    text:'Keep me logged in',
	    font:h3,
	    color:'white',
	    left:'5dp',
	    height:'20dp'
	});
	
	var forgotPassLabel = Ti.UI.createLabel({
        text:'Forgot Password',
        font:h3,
        color:'white',
        left:'10dp',
        height:'20dp'
    });
    
    var labelView = Ti.UI.createView({
        width:'234dp',
        top:'14dp',
        height:'20dp',
        layout:'horizontal'
    });
    
    var loggedInView = Ti.UI.createView({
        width:Ti.UI.SIZE,
        height:'20dp',
        layout:'horizontal'
    });
    loggedInView.add(checkBox);
    loggedInView.add(keepLoginLabel);
    labelView.add(loggedInView);
    labelView.add(forgotPassLabel);

	var formView = Ti.UI.createScrollView({
	    width:'235dp',
	    layout:'vertical',
	    height:'195dp',
	    center:{y:'50%'}
	});
	formView.add(userField);
    formView.add(passField);
    formView.add(loginBtn);
    formView.add(labelView);
    self.add(formView);
    
    var noAccountLabel = Ti.UI.createLabel({
        text:'Don\'t have an account? ',
        font:h4,
        color:'white'
    });
    
    var signUpLabel = Ti.UI.createLabel({
        text:'Sign Up',
        font:h4,
        color:'yellow',
    });
    
    var bottomLabelView = Titanium.UI.createView({
        width:Ti.UI.SIZE,
        layout:'horizontal',
        bottom:'25dp',
        height:'20dp',
    });
    bottomLabelView.add(noAccountLabel);
    bottomLabelView.add(signUpLabel);
    
    self.add(bottomLabelView);
    
    keepLoginLabel.addEventListener('click', toggleLogin);
    checkBox.addEventListener('click', toggleLogin);
    
    bottomLabelView.addEventListener('click', function(){
        self.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('signup');
    });
    
    self.add(bottomLabelView);
    
    function loginReq(){
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 //Ti.API.info(e.success);
                 Ti.API.info(this.responseText);
                 if(checkBox.image==imagepath + 'checkOn.png'){
                    saveInfo(JSON.parse(this.responseText));
                 }else if(checkBox.image==imagepath + 'checkOff.png'){
                     dontSaveInfo(JSON.parse(this.responseText));
                 }
             },
             onerror : function(e) {
                 Ti.API.info(e.error + ' ' + JSON.stringify(e));
                 alert('Invalid Email Or Password');
             },
             timeout : 5000  // in milliseconds
         });

        params = {
            email:userField.value.toLowerCase(),
            password:passField.value
        };
        
        client.open("POST", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send(JSON.stringify(params));
        Ti.API.info(JSON.stringify(params));
    }
    
	function saveInfo(data){
	    var userData= data;
	    userData['email'] = userField.value.toLowerCase();
	    userData['password'] = passField.value;
	    Ti.App.Properties.setString('email',userField.value.toLowerCase());
        Ti.App.Properties.setString('pass',passField.value);
	    Ti.App.Properties.setObject('userCred',userData);
	    Ti.App.Properties.setBool('loggedIn',true);
	     Ti.fireEvent('loadBack');
	     self.animate({opacity:0, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('mainmenu');
	}
	
	function dontSaveInfo(data){
        var userData= data;
        userData['email'] = userField.value.toLowerCase();
        userData['password'] = passField.value;
        Ti.App.Properties.setObject('userCred',userData);
        Ti.App.Properties.setBool('loggedIn',false);
         Ti.fireEvent('loadBack');
         self.animate({opacity:0, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('mainmenu');
    }

	function toggleLogin (){
        if (checkBox.image==imagepath + 'checkOn.png'){
            checkBox.image=imagepath + 'checkOff.png';
        }else if(checkBox.image==imagepath + 'checkOff.png'){
            checkBox.image=imagepath + 'checkOn.png';
        }
    }
	
	loginBtn.addEventListener('click', function(e) {
		userField.blur();
		passField.blur();
	    loginReq();
    });
    backButton.addEventListener('click', function(e){
        self.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('closeLogin');
    });


	return self;
}

module.exports = LoginView;
