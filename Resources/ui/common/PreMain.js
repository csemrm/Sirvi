//FirstView Component Constructor
function PreMain() {
	//create object instance, a parasitic subclass of Observable
	var imagepath = '/images/mainmenu/';
	var self = Ti.UI.createView({
        backgroundImage:imagepath + 'background.png',
    });

	
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    
    var logoImg = Ti.UI.createImageView({
        image:imagepath + 'logo.png',
        top:'40dp'
    });
    
   var loginImg = Ti.UI.createImageView({
        image:imagepath + 'loginbtn.png',
        height:'47dp',
        width:'170.5dp'
    });
    
    var loginLabel = Ti.UI.createLabel({
        text:'Let\'s Go!',
        font:h1,
        color:'white'
    });
    
    var centerText = Ti.UI.createImageView({
        image:imagepath+'preMain.png'
    });
    
    var loginBtn = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        bottom:'20dp'
    });
    loginBtn.add(loginImg);
    loginBtn.add(loginLabel);
    
    loginBtn.addEventListener('click', function(e){
        Ti.fireEvent('mainmenu');
    });
    
    self.add(logoImg);
    self.add(centerText);
    self.add(loginBtn);

	return self;
}

module.exports = PreMain;
