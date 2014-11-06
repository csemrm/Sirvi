//FirstView Component Constructor
function TagView(label) 
{
	
	//create object instance, a parasitic subclass of Observable
	var appglobal = require('../AppGlobals');
	
	var h1 = appglobal.getFont('28dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = appglobal.getFont('18dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = appglobal.getFont('15dp'); //{fontFamily: 'HelveticaNeue-Thin',fontSize:'15dp',color:'#fff'};
    
    var imagepath = '/images/interest/';
    
	var self = Ti.UI.createView({
        height:'30dp',
        backgroundColor:'#00b9ff',
        borderRadius:'12.5dp',
        layout:'horizontal',
        type:'off',
        left:'3dp',
        top:'3dp'
    });
    
    var interestLabel=Ti.UI.createLabel({
        text:label,
        font:h3,
        color:'white',
        textAlign:'center',
        left:'1dp'
    });
    
    var cross = Ti.UI.createImageView({
        image:imagepath + 'redcross@2x.png',
        left:'1dp',
        top:'1dp',
        width:'28dp',
        type:'off'
    });
    
    self.addEventListener('click', function(){
        if(self.type =='off'){
            self.backgroundColor = '#c20261';
            self.type = 'on';
            cross.image = imagepath + 'bluecross@2x.png';
            cross.type='on';
        }else{
            self.backgroundColor = '#00b9ff';
            self.type = 'off';
            cross.image = imagepath + 'redcross@2x.png';
            cross.type='off';
        }
    });
    
    
    self.width = interestLabel.toImage().width + 32;
    self.add(cross);
    self.add(interestLabel);
    

	return self;
}

module.exports = TagView;
