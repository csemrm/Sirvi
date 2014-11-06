//FirstView Component Constructor
function PreMain() {
	//create object instance, a parasitic subclass of Observable
	var imagepath = '/images/mainmenu/';
	var self = Ti.UI.createView({
        backgroundImage:imagepath + 'background@2x.png',
    });

	
    var appglobal = require('../AppGlobals');
	var h1 = appglobal.getFont('28dp'); // {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = appglobal.getFont('18dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = appglobal.getFont('14dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    
    var centerview = Ti.UI.createView({
        layout : 'vertical'
    });
    
    var logoImg = Ti.UI.createImageView({
        image:imagepath + 'logo@2x.png',
        top:'30dp'
    });
    
    var centerText = Ti.UI.createImageView({
    	top:'20dp',
    	width : '85%',
        image:imagepath+'preMain@2x.png'
    });
    
    var loginBtn = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        bottom:'20dp',
        title:'Let\'s Go!',
        font:h1,
        color:'white',
		backgroundImage : imagepath + 'loginbtn@2x.png',
    });
    
    loginBtn.addEventListener('click', function(e){
        Ti.App.fireEvent('mainmenu');
    });
    
    centerview.add(logoImg);
    centerview.add(centerText);
    self.add(centerview);
    self.add(loginBtn);

	return self;
}

module.exports = PreMain;
