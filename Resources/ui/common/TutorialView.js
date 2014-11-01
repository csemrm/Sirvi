//FirstView Component Constructor
function TutorialView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
        backgroundColor:'#00a2c5',
    });
    
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    //label using localization-ready strings from <app dir>/i18n/en/strings.xml
    
    var imagepath = '/images/tutorial/';
    
    var backButton = Ti.UI.createImageView({
        image:imagepath + 'arrow.png',
        left:'12.5dp',
        center:{y:'40dp'}
    });
    var backButton2 = Ti.UI.createImageView({
        image:imagepath + 'arrow.png',
        left:'12.5dp',
        center:{y:'40dp'}
    });
    
    var tutImage = Ti.UI.createImageView({
        image:imagepath + 'tut1.png',
    });
    
    var loginImg = Ti.UI.createImageView({
        image:imagepath + 'nextBlue.png',
        height:'47dp',
        width:'170.5dp',
    });
    
    var loginLabel = Ti.UI.createLabel({
        text:'More Please',
        font:h1,
        color:'white'
    });
    
    var loginBtn = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        bottom:'30dp'
    });
    
    loginBtn.add(loginImg);
    loginBtn.add(loginLabel);
    
    var view1 = Ti.UI.createView({
        height:Ti.UI.FILL,
        width:'294dp',
        top:'55dp',
        opacity:0
    });
    view1.add(tutImage);
    view1.add(loginBtn);
    
    self.add(view1);
    
    //Add behavior for UI
    
    var welcomeImg2 = Ti.UI.createImageView({
        image:imagepath + '5.png',
    });
       
    var loginImg2 = Ti.UI.createImageView({
        image:imagepath + 'nextRed.png',
        height:'47dp',
        width:'170.5dp',
    });
    
    var loginLabel2 = Ti.UI.createLabel({
        text:'More Please',
        font:h1,
        color:'white'
    });
    
    var loginBtn2 = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        bottom:'30dp'
    });
    
    loginBtn2.add(loginImg2);
    loginBtn2.add(loginLabel2);
    
    var view2 = Ti.UI.createView({
        height:Ti.UI.FILL,
        width:'294dp',
        top:'55dp',
        opacity:0
    });
    view2.add(welcomeImg2);
    view2.add(loginBtn2);

    
    var welcomeImg3 = Ti.UI.createImageView({
        image:imagepath + 'tut3t@2x.png',
        center:{y:'40%'}
    });
    
    var loginImg3 = Ti.UI.createImageView({
        image:imagepath + 'nextYellow.png',
        height:'47dp',
        width:'170.5dp'
    });
    
    var loginLabel3 = Ti.UI.createLabel({
        text:'Let\'s Start',
        font:h1,
        color:'white'
    });
    
    var loginBtn3 = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        bottom:'30dp'
    });
    
    loginBtn3.add(loginImg3);
    loginBtn3.add(loginLabel3);
    
    var view3 = Ti.UI.createView({
        height:Ti.UI.FILL,
        width:'294dp',
        top:'55dp',
        opacity:0
    });
    view3.add(welcomeImg3);
    view3.add(loginBtn3);
    
    var _go = Titanium.UI.createAnimation({opacity:0, duration:500});
    var _come = Titanium.UI.createAnimation({opacity:1, duration:500});
    
    view1.animate(_come);
    
    loginBtn.addEventListener('click', function(e) {
        self.add(view2);
        view1.animate(_go, function(){
            self.remove(view1);
            view2.animate(_come);
            self.add(backButton);
        });
        self.animate({backgroundColor:'#ef3d3b', duration:500});
    });
    
    loginBtn2.addEventListener('click', function(e){
        self.add(view3);
        self.add(backButton2);
        self.remove(backButton);
        view2.animate(_go, function(){
            self.remove(view2);
            view3.animate(_come);
        });
        self.animate({backgroundColor:'#f7b21d', duration:500});
    });
    
    backButton2.addEventListener('click', function(e){
        self.add(view2);
        self.add(backButton);
        self.remove(backButton2);
        view3.animate(_go, function(){
            self.remove(view3);
            view2.animate(_come);
        });
        self.animate({backgroundColor:'#ef3d3b', duration:500});
    });
    
    backButton.addEventListener('click', function(e){
        view1.opacity=0;
        self.add(view1);
        view2.animate(_go, function(){
            self.remove(view2);
            view1.animate(_come);
            self.remove(backButton);
        });
        self.animate({backgroundColor:'#00a2c5', duration:500});
    });
    
    loginBtn3.addEventListener('click', function(e){
        
        self.animate({opacity:0, duration:750}, function(){
            Ti.App.Properties.setBool('questions', false);
            Ti.fireEvent('interestsview');
        });
        
    });

    
    return self;
}

module.exports = TutorialView;
