function lawView(_title) {
    //create object instance, a parasitic subclass of Observable
    var imagepath = '/images/law/';
    var self = Ti.UI.createView({
        backgroundImage:'/images/mainmenu/background.png',
    });
    var menuTitle=[];
    switch (_title) {
    case 'law':
        menuTitle=[
            'PERSONAL INJURY',
            'BANKRUPTCY',
            'DUI',
            'TAX',
            'LEGAL DOCUMENTS',
        ];        
        break;
    case 'date':
        menuTitle=[
            'ENTERTAINMENT',
            'DATING',
            'HOME',
            'AUTO',
            'RESTAURANT',
        ];        
        break;
    case 'health':
         menuTitle=[
            'SUPPLEMENTAL',
            'HEALTH',
            'LIFE',
            'DISABILITY',
            'LONG TERM CARE',
        ];        
        break;
    }
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'21dp',color:'#fff'};
    
    var textBtn = Ti.UI.createImageView({
        image:imagepath + 'home.png',
        left:'12.5dp',
        center:{y:'50dp'}
    });
    
    
    var menuButton = Ti.UI.createImageView({
        image:imagepath + 'menu.png',
        right:'12.5dp',
        center:{y:'50dp'}
    });
    //self.add(menuButton);
    var helpButton = Ti.UI.createImageView({
        image:imagepath + 'help.png',
        left:'12.5dp',
        bottom:'15dp'
    });
    //self.add(helpButton);
    
    var profileButton = Ti.UI.createImageView({
        image:imagepath + 'profile.png',
        right:'12.5dp',
        bottom:'15dp'
    });
    //self.add(profileButton);
    
    var lawIcon = Ti.UI.createImageView({
        image:imagepath + _title +'R.png',
        left:'0dp',
        center:{y:'50%'}
    });
    
    var menu = Ti.UI.createView({
        height:'416dp',
        layout:'vertical',
        center:{y:'50%'},
        right:'-320dp'
    });
    
    var menu1 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'1.png',
        right:'0dp',
        bottom:'36.5',
        width:'222dp',
        height:'54dp',
        text:menuTitle[0],
    });
    var menu2 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'2.png',
        right:'0dp',
        bottom:'36.5',
        width:'156dp',
        height:'54dp',
        text:menuTitle[1],
    });
    var menu3 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'3.png',
        right:'0dp',
        bottom:'36.5',
        width:'119.5',
        height:'54dp',
        text:menuTitle[2],
    });
    var menu4 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'4.png',
        right:'0dp',
        bottom:'36.5',
        width:'156dp',
        height:'54dp',
        text:menuTitle[3],
    });
    var menu5 = Ti.UI.createView({
        backgroundImage:imagepath + _title +'5.png',
        right:'0dp',
        width:'222dp',
        height:'54dp',
        text:menuTitle[4],
    });
    
    
    var menuTitle1=Ti.UI.createLabel({
        text:menuTitle[0],
        font:h3,
        color:'white',
        center:{x:'116dp'}
    });
    var menuTitle2=Ti.UI.createLabel({
        text:menuTitle[1],
        font:h3,
        color:'white',
        center:{x:'83dp'}
    });
    var menuTitle3=Ti.UI.createLabel({
        text:menuTitle[2],
        font:h3,
        color:'white',
        center:{x:'68dp'}
    });
    var menuTitle4=Ti.UI.createLabel({
        text:menuTitle[3],
        font:h3,
        color:'white',
        center:{x:'83dp'}
    });
    var menuTitle5=Ti.UI.createLabel({
        text:menuTitle[4],
        font:h3,
        color:'white',
        center:{x:'116dp'}
    });
    menu1.add(menuTitle1);
    menu2.add(menuTitle2);
    menu3.add(menuTitle3);
    menu4.add(menuTitle4);
    menu5.add(menuTitle5);
    
    
    
    menu.add(menu1);
    menu.add(menu2);
    menu.add(menu3);
    menu.add(menu4);
    menu.add(menu5);
    
    var qbutton = require('ui/common/buttonCreator');
    
    
    function openCallPopUp(popLabel){
        var callPopUp = Ti.UI.createView({
            height:'80%',
            width:'100%',
            layout:'vertical',
            bottom:-Ti.Platform.displayCaps.platformHeight,
            backgroundColor:'#fff'
        });
        
        var callPopArrow = Ti.UI.createImageView({
            image:'/images/popup/arrowDown.png',
            top:'5dp'
        });
        var callPopIcon = Ti.UI.createImageView({
            image:'/images/popup/icon',
            top:'10dp',
        });
        var callPopText = Ti.UI.createLabel({
            text:'Your\n' + popLabel + '\nConcierge Specialist is ready and waiting \nto serve you.',
            font:h1,
            color:'black',
            textAlign:'center',
            top:'10dp'
        });
        
        var callPopButton = qbutton.createButton('Call Now','#15ca1e');
        
        callPopUp.add(callPopArrow);
        callPopUp.add(callPopIcon);
        callPopUp.add(callPopText);
        callPopUp.add(callPopButton);
        
        self.add(callPopUp);
        callPopUp.animate({bottom:'0dp', duration:750, curve:Ti.UI.ANIMATION_CURVE_EASE_OUT});
        
        
        
        var swipeUp = function(start, end) {
            var dif = end - start;
            if(dif > 75) { // adjust this to determine the length of the swipe
                return true;
            } else {
                return false;
            }
        };
 
        var start = null;
        var end = null;
 
        callPopUp.addEventListener('touchstart', function(e1) {
            start = e1.y;
        });
 
        callPopUp.addEventListener('touchend', function(e2) {
            end = e2.y;
            if(start) {
                if(swipeUp(start, end)) {
                    Ti.API.info('true swipedown');
                    callPopUp.animate({bottom:-Ti.Platform.displayCaps.platformHeight, duration:750, curve:Ti.UI.ANIMATION_CURVE_EASE_OUT},
                        function(){
                        self.remove(callPopUp);
                        });
                    
                }
                start = null;
            }
        });
        
    }
    
    menu.animate(
        {right:'0dp',duration:1000}, 
        function(){
            menu.animate(
                {right:'-10dp', duration:250, curve:Ti.UI.ANIMATION_CURVE_EASE_OUT}, 
                function(){
                    menu.animate(
                        {right:'0dp', duration:200, curve:Ti.UI.ANIMATION_CURVE_EASE_IN});
                });
        });
    
    
    
    menu.addEventListener('click', function(e){
        openCallPopUp(e.source.text);
    });

    
    Ti.fireEvent('closemainmenu');
    self.add(menu);
    self.add(lawIcon);
    self.add(textBtn);
    
    
    textBtn.addEventListener('click', function(){
        Ti.fireEvent('mainmenu');
        Ti.fireEvent('closelawview');
    });
    
    
    return self;
}
module.exports = lawView;