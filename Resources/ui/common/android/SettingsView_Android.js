//FirstView Component Constructor
function SettingsView(parent) {
    var h1 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '28dp',
        color : '#fff'
    };
    var imagepath = '/images/law/';
    var h2 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '22dp',
        color : '#fff'
    };
    var h3 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '14dp',
        color : '#fff'
    };
    var textBtn = Ti.UI.createImageView({
        image:imagepath + 'home@2x.png',
        left:'12.5dp',
        center:{y:'50dp'}
    });
    
    var self = Ti.UI.createView({
       backgroundColor:'#000',
       height:Ti.UI.FILL,
       width:Ti.UI.FILL
    });
    
    self.add(textBtn);
    
    textBtn.addEventListener('click', function(){
       parent.remove(self);
    });
    
    return self;
}

module.exports = SettingsView;
