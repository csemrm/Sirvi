//FirstView Component Constructor
function SignupView() {
	//create object instance, a parasitic subclass of Observable
	
	
    var self = Ti.UI.createView({
        backgroundColor:'#23b823',
        height:'100%',
        width:'100%',
        bottom:-(Ti.Platform.displayCaps.platformHeight/2)+'dp'
    });
    self.animate({bottom:'0dp',duration:750});
    
    var userData = {};
    
    var apiCall = '/api/appUsers';
    var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
    var url = apiURL + apiCall;
    
    
    var imagepath = '/images/signup/';
    
    //back button 
    var backButton = Ti.UI.createView({
        height:'30dp',
        width:'40dp',
        center:{y:'20dp'}
    });
    self.add(backButton);
    var arrowImg = Ti.UI.createImageView({
        image:imagepath + 'arrow@2x.png'
    });
    backButton.add(arrowImg);
    
    
    var welcomeImg = Ti.UI.createImageView({
        image:imagepath + 'welcome@2x.png',
        width : '100%',
        center:{y:'25dp'}
    });
    //self.add(welcomeImg);
    
    var appglobal = require('../AppGlobals');
    
    var welcomeLabel = Ti.UI.createLabel({
        text:'Let\'s Get Started',
        font:appglobal.getFont('28dp'),
        color:'white',
        center:{y:'25dp'}
    });
    
    var scrollView = Ti.UI.createScrollView({
        height:'450dp',
        width:'100%'
    });
    if(Ti.Platform.displayCaps.platformHeight>500)
    {
        scrollView.add(welcomeImg);
        scrollView.add(welcomeLabel);
    }
    
    //Name Textfield SetUp
	var viewName = Ti.UI.createView({ height:'30dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'user@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
	
		var fnameField = Ti.UI.createTextField({
			hintText : 'FIRST NAME',
			font :appglobal.getFont('22dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			top : '1dp'
		});
		viewName.add(userFieldImg);
		viewName.add(fnameField);
	}
    
    //Name Textfield SetUp
	var viewLName = Ti.UI.createView({ height:'30dp', top : '15dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'user@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
	
		var lnameField = Ti.UI.createTextField({
			hintText : 'LAST NAME',
			font : appglobal.getFont('22dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			top : '1dp'
		});
		viewLName.add(userFieldImg);
		viewLName.add(lnameField);
	}
	
    //Emial Textfield SetUp
	var viewEmail = Ti.UI.createView({ height:'30dp', top : '15dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'email@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
	
		var emailField = Ti.UI.createTextField({
			hintText : 'EMAIL',
			font:appglobal.getFont('22dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			keyboardType:Ti.UI.KEYBOARD_EMAIL,
			top : '1dp'
		});
		viewEmail.add(userFieldImg);
		viewEmail.add(emailField);
	}
	
    //Password Field SetUp
	var viewPassword = Ti.UI.createView({ height:'30dp',top : '15dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'pass@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
		var passField = Ti.UI.createTextField({
			hintText : 'PASSWORD',
			font : appglobal.getFont('22dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			top : '1dp'
			//passwordMask : true
		});
		viewPassword.add(userFieldImg);
		viewPassword.add(passField);
	}
	
    //Name Textfield SetUp
	var viewBday = Ti.UI.createView({ height:'30dp', top : '15dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'bday@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
	
		var bdayField = Ti.UI.createTextField({
			hintText : 'BIRTHDAY',
			font : appglobal.getFont('22dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			top : '1dp'
		});
		viewBday.add(userFieldImg);
		viewBday.add(bdayField);
	}
	
    //Name Textfield SetUp
	var viewZip = Ti.UI.createView({ height:'30dp', top : '15dp'});
	{
		var userFieldImg = Ti.UI.createImageView({
			backgroundImage : imagepath + 'city@2x.png',
			width : '229.5dp',
			height : '30dp',
		});
	
		var cityField = Ti.UI.createTextField({
			hintText : 'ZIP',
			font : appglobal.getFont('22dp'),
			width : '229.5dp',
			height : '35dp',
			left : '25dp',
			color : 'white',
			top : '1dp'
		});
		viewZip.add(userFieldImg);
		viewZip.add(cityField);
	}
	
    var signupBtn = Ti.UI.createButton({
		height : '47dp',
		width : '170.5dp',
		top : '28.5dp',
		title : 'SIGN UP',
		color : 'white',
		font : appglobal.getFont('28dp'),
		backgroundImage : imagepath + 'signupbtn@2x.png',
	});

    
    var formView = Ti.UI.createView({
        width:'235dp',
        layout:'vertical',
        height:'400dp',
        top:'57dp'
    });
    formView.add(viewName);
    formView.add(viewLName);
    formView.add(viewEmail);
    formView.add(viewPassword);
    formView.add(viewBday);
    formView.add(viewZip);
    formView.add(signupBtn);
    scrollView.add(formView);
    self.add(scrollView);
    
    var noAccountLabel = Ti.UI.createLabel({
        text:'Already have an account?  ',
        font:appglobal.getFont('18dp'),
        color:'white',
        height:'20dp'
    });
    
    var signUpLabel = Ti.UI.createLabel({
        text:'Login',
        font:appglobal.getFont('18dp'),
        color:'yellow',
        height:'20dp'
    });
    
    var bottomLabelView = Titanium.UI.createView({
        width:Ti.UI.SIZE,
        layout:'horizontal',
        bottom:'20dp',
        height:'20dp',
        
    });
    bottomLabelView.add(noAccountLabel);
    bottomLabelView.add(signUpLabel);
    self.add(bottomLabelView);
    
    var cheatView = Ti.UI.createView({
        backgroundColor:'#000',
        height:Ti.UI.FILL,
        width:Ti.UI.FILL,
        opacity:0.5,
        visible:false
    });
    self.add(cheatView);
    var datePickerView = Titanium.UI.createView({
        height : 248,
        bottom : -248
    });
    
    self.add(datePickerView);

    datePicker = Titanium.UI.createPicker({
        top : 43,
        type : Titanium.UI.PICKER_TYPE_DATE,
        selectionIndicator : true,
        backgroundColor:'white',
        width : '100%'
    });
    
    slideOut = Titanium.UI.createAnimation({
        bottom : -251
    });
    
    slideIn = Titanium.UI.createAnimation({
        bottom : 0
    });

    pickerCancel = Titanium.UI.createButton({
        title : 'Cancel',
    });

    pickerDone = Titanium.UI.createButton({
        title : 'Done',
    });

    pickerSpacer = Titanium.UI.createButton({
        systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });

	pickerToolbar = Titanium.UI.createView({ height : 44,top : 0,layout:'horizontal' });
	pickerToolbar.add(pickerCancel);
	pickerToolbar.add(pickerSpacer);
	pickerToolbar.add(pickerDone);
	datePickerView.add(pickerToolbar);
/*
    pickerToolbar = Titanium.UI.createToolbar({
        top : 0,
        width : 320,
        items : [pickerSpacer, pickerDone],
        barColor : 'transparent'
    });
 	datePickerView.add(pickerToolbar);   
 */  
 
datePickerView.add(datePicker);
 
    bdayField.addEventListener('click', function(e){
    	fnameField.blur();
    	lnameField.blur();
    	emailField.blur();
    	passField.blur();
    	cityField.blur();
    	cheatView.show();
        datePickerView.animate(slideIn);
    });
    
    datePicker.addEventListener('change', changeDate);
    
    function changeDate(e){
            var pickerdate = e.value;
            var day = pickerdate.getDate();
            var month = pickerdate.getMonth() + 1;
            var year = pickerdate.getFullYear();
            bdayField.value = month + "-" + day + "-" + year;
    }
    
    pickerDone.addEventListener('click', function(e){
        datePickerView.animate(slideOut);
        cheatView.hide();
    });
    
    
    
    bottomLabelView.addEventListener('click', function(){
        self.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750},function(){
            self=null;
        });
        Ti.App.fireEvent('login');
    });
    
    
    
    backButton.addEventListener('click', function(e){
        self.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750},function(){
            self=null;
        });
        Ti.App.fireEvent('closeSignup');
    });
    
    //Add behavior for UI
    signupBtn.addEventListener('click', function(e) {
        fnameField.blur();
        lnameField.blur();
        emailField.blur();
        passField.blur();
        cityField.blur();
        if(!emailField.value||!passField.value||!lnameField.value||!cityField.value||!bdayField.value||!fnameField.value)
        {
            alert('All fields are required.');
        }else if(checkemail(emailField.value)){
            signupReq();
        }else{
            alert('Please Enter Valid Email Address');
        }
    });
    
    function checkemail(emailAddress) {
        var str = emailAddress;
        var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (filter.test(str)) {
            testresults = true;
        } else {
            testresults = false;
        }
        return (testresults);
    };
    
    function signupReq(){
        
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 Ti.API.info(this.responseText);
                 saveInfo(JSON.parse(this.responseText));
             },
             onerror : function(e) {
                 Ti.API.info(e);
                 if(e.code==422){
                     alert('Email Address already exists');
                 } else{
                     alert('Check your internet connection and try again');
                 }
             },
             timeout : 5000  
         });
         
        params = {
          details: {
              masked_email: emailField.value.toLowerCase(),
              first_name: fnameField.value,
              last_name: lnameField.value,
              birthday: bdayField.value,
              zip: cityField.value,
          },
          email: emailField.value.toLowerCase(),
          password:passField.value
        };
        
        Ti.API.info(params);
        client.open("POST", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send(JSON.stringify(params));
    }
    
    function saveInfo(data){
        userData= data;
        userData['email'] = emailField.value.toLowerCase();
        userData['password'] = passField.value;
        userData['fname'] = fnameField.value;
        userData['lname'] = lnameField.value;
        userData['zip'] = cityField.value;
        userData['bday'] = bdayField.value;
        userData['password'] = passField.value;
        Ti.App.Properties.setString('email',emailField.value.toLowerCase());
        Ti.App.Properties.setString('password',passField.value);
        loginReq();
        Ti.App.Properties.setBool('loggedIn',true);
        
        Ti.App.fireEvent('loadBack');
        self.animate({opacity:0, duration:750},function(){
            self=null;
        });
        Ti.App.fireEvent('TutorialView');
        
    }
    
    function checkage(bday){
        
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
            email:emailField.value.toLowerCase(),
            password:passField.value
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

    return self;
}


module.exports = SignupView;
