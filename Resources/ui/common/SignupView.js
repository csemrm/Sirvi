//FirstView Component Constructor
function SignupView() {
	//create object instance, a parasitic subclass of Observable
    var self = Ti.UI.createView({
        backgroundColor:'#23b823',
        height:Ti.Platform.displayCaps.platformHeight,
        width:Ti.Platform.displayCaps.platformWidth,
        bottom:-Ti.Platform.displayCaps.platformHeight
    });
    self.animate({bottom:'0dp',duration:750});
    
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'22dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    //label using localization-ready strings from <app dir>/i18n/en/strings.xml
    var apiCall = '/api/appUsers';
    var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
    var url = apiURL + apiCall;
    
    
    var imagepath = '/images/signup/';
    
    var backButton = Ti.UI.createImageView({
        image:imagepath + 'arrow.png',
        center:{y:'40dp'}
    });
    self.add(backButton);
    
    
    var welcomeImg = Ti.UI.createImageView({
        image:imagepath + 'welcome.png',
        width:'294dp',
        center:{y:'15dp'}
    });
    //self.add(welcomeImg);
    
    
    var welcomeLabel = Ti.UI.createLabel({
        text:'Let\'s Get Started',
        font:h1,
        color:'white',
        center:{y:'15dp'}
    });
    
    var scrollView = Ti.UI.createScrollView({
        height:'450dp',
        width:'294dp'
    });
    if(Ti.Platform.displayCaps.platformHeight>500)
    {
        scrollView.add(welcomeImg);
        scrollView.add(welcomeLabel);
    }
    
    var fnameField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'user.png',
        hintText:'FIRST NAME',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        paddingLeft:'35dp',
        color:'white'
    });
    var lnameField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'user.png',
        hintText:'LAST NAME',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        paddingLeft:'35dp',
        color:'white',
        top:'5%',
    });
    
    var emailField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'email.png',
        hintText:'EMAIL',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        paddingLeft:'35dp',
        color:'white',
        top:'5%',
        keyboardType:Ti.UI.KEYBOARD_EMAIL
    });
    
    var passField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'pass.png',
        hintText:'PASSWORD',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        top:'5%',
        paddingLeft:'35dp',
        color:'white',
        passwordMask:true
    });
    
    var bdayField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'bday.png',
        hintText:'BIRTHDAY',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        paddingLeft:'35dp',
        color:'white',
        top:'5%',
        editable:false
    });
    
    var cityField = Ti.UI.createTextField({
        backgroundImage:imagepath + 'city.png',
        hintText:'CITY',
        font:h2,
        width:'229.5dp',
        height:'28.5dp',
        paddingLeft:'35dp',
        color:'white',
        top:'5%',
    });
    
    var signupImg = Ti.UI.createImageView({
        image:imagepath + 'signupbtn.png',
        height:'47dp',
        width:'170.5dp'
    });
    
    var signupLabel = Ti.UI.createLabel({
        text:'SIGN UP',
        font:h1,
        color:'white'
    });
    
    var signupBtn = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        top:'28.5dp'
    });
    
    signupBtn.add(signupImg);
    signupBtn.add(signupLabel);
    
    
    var formView = Ti.UI.createView({
        width:'235dp',
        layout:'vertical',
        height:'390dp',
        top:'57dp'
    });
    formView.add(fnameField);
    formView.add(lnameField);
    formView.add(emailField);
    formView.add(passField);
    formView.add(bdayField);
    formView.add(cityField);
    formView.add(signupBtn);
    scrollView.add(formView);
    self.add(scrollView);
    
    
    var datePickerView = Titanium.UI.createView({
        height : 248,
        bottom : -248
    });
    
    self.add(datePickerView);

    datePicker = Titanium.UI.createPicker({
        top : 43,
        type : Titanium.UI.PICKER_TYPE_DATE,
        maxDate : new Date(2009, 01, 01),
        selectionIndicator : true
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

    pickerToolbar = Titanium.UI.createToolbar({
        top : 0,
        width : 320,
        items : [pickerSpacer, pickerDone],
        barColor : 'transparent'
    });
    datePickerView.add(datePicker);
    datePickerView.add(pickerToolbar);
    
    bdayField.addEventListener('click', function(e){
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
    });
    
    var noAccountLabel = Ti.UI.createLabel({
        text:'Already have an account?  ',
        font:h3,
        color:'white'
    });
    
    var signUpLabel = Ti.UI.createLabel({
        text:'Login',
        font:h3,
        color:'yellow',
    });
    
    var bottomLabelView = Titanium.UI.createView({
        width:'195dp',
        layout:'horizontal',
        bottom:'20dp',
        height:'20dp',
    });
    bottomLabelView.add(noAccountLabel);
    bottomLabelView.add(signUpLabel);
    
    bottomLabelView.addEventListener('click', function(){
        self.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('login');
    });
    
    self.add(bottomLabelView);
    
    //Add behavior for UI
    signupBtn.addEventListener('click', function(e) {
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
    
    function checkage(bday){
        
    }
    
    function saveInfo(data){
        var userData= data;
        userData['email'] = emailField.value;
        userData['password'] = passField.value;
        userData['fname'] = fnameField.value;
        userData['lname'] = lnameField.value;
        userData['city'] = cityField.value;
        userData['bday'] = bdayField.value;
        userData['password'] = passField.value;
        Ti.App.Properties.setObject('userCred',userData);
        Ti.App.Properties.setBool('loggedIn',true);
        Ti.App.Properties.setObject('userCred',userData);
        Ti.fireEvent('loadBack');
        self.animate({opacity:0, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('TutorialView');
    }
    
    function signupReq(){
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 saveInfo(JSON.parse(this.responseText));
                 //Ti.API.info(this.responseText);
             },
             onerror : function(e) {
                 Ti.API.info(e);
                 if(e.code==422){
                     alert('Email Address already exists');
                 }else{
                 alert('Check your internet connection and try again');
                 }
             },
             timeout : 5000  
         });

        params = {
          details: {
            masked_email: emailField.value,
            first_name: fnameField.value,
            last_name: lnameField.value,
            birthday: bdayField.value,
            city: cityField.value,
          },
          email: emailField.value,
          password:passField.value
        };
        
        client.open("POST", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send(JSON.stringify(params));
    }
    
    backButton.addEventListener('click', function(e){
        
        self.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750},function(){
            self=null;
        });
        Ti.fireEvent('closeSignup');
    });


    return self;
}


module.exports = SignupView;
