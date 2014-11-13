//FirstView Component Constructor
function TagView(label) {
	//create object instance, a parasitic subclass of Observable
	var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    
    var imagepath = '/images/interest/';
    
    
    
	var self = Ti.UI.createView({
        height:'35dp',
        width:'103dp',
        backgroundColor:'#00b9ff',
        borderRadius:'17.5dp',
        type:'off',
        left:'3dp',
        top:'3dp'
    });
    
    var interestLabel=Ti.UI.createLabel({
        text:label,
        font:h3,
        color:'white',
        textAlign:'center',
        left:'30dp',
        width:'72dp'
    });
    
    var cross = Ti.UI.createImageView({
        image:imagepath + 'redcross.png',
        left:'1dp',
        width:'28dp',
        type:'off'
    });
    
    self.addEventListener('click', function(){
        if(self.type =='off'){
            self.backgroundColor = '#c20261';
            self.type = 'on';
            cross.image = imagepath + 'bluecross.png';
            cross.type='on';
        }else{
            self.backgroundColor = '#00b9ff';
            self.type = 'off';
            cross.image = imagepath + 'redcross.png';
            cross.type='off';
        }
    });
    
    
    //self.width = interestLabel.toImage().width + 32;
    self.add(cross);
    self.add(interestLabel);
    

	return self;
}

module.exports = TagView;
