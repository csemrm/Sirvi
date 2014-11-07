//FirstView Component Constructor
function SlideOutMenu(userCred) 
{
	var appglobal = require('../AppGlobals');
	var h1 = appglobal.getFont('28dp'); 
	var h2 = appglobal.getFont('22dp');
	var h3 = appglobal.getFont('14dp');
	
    data = [{
        icon : 'profile@2x.png',
        title : 'Profile',
        link : 'openProfile'
    }, {
        icon : 'inbox@2x.png',
        title : 'Inbox',
        link : 'openInbox'
    }, {
        icon : 'interest@2x.png',
        title : 'Interests',
        link : 'openInterests'
    }, /*{
        icon : 'settings@2x.png',
        title : 'Settings',
        link : 'openSettings'
    }, */{
        icon : 'signOut@2x.png',
        title : 'Sign Out',
        link : 'logOut'
    }];
    var imagepath = '/images/profile/';
    var qbutton = require('ui/common/android/buttonCreator_Android');
    var self = Ti.UI.createView({
        backgroundColor : '#fff',
        height : '100%',
        width : '80%' ,//Ti.Platform.displayCaps.platformWidth/2 * 0.77,
        left : -(Ti.Platform.displayCaps.platformWidth/2),
        opacity : 0.9
    });
    self.animate({
        left : '0dp',
        duration : 750
    });

    var backButton = Ti.UI.createButton({
        //top:'20dp',
        backgroundColor : 'transparent',
        height : '40dp',
        width : '40dp',
        right : '10dp',
        image : imagepath + 'arrow@2x.png'
    });
    //self.add(backButton);
    tableData = [];

    var sideMenu = Ti.UI.createTableView({
        height : '275dp',
        scrollable : false,
        top : '0dp',
     });
    
    createSideMenu();
    self.add(sideMenu);

    function createSideMenu() 
    {
        var titleBar = Ti.UI.createTableViewRow({
            height : '75dp',
            backgroundColor : '#23b823'
        });
        var titleLabel = Ti.UI.createLabel({
            text : 'Main Menu',
            font : h1,
            left : '30dp',
            color : 'white'
        });
        titleBar.add(titleLabel);
        titleBar.add(backButton);
        tableData.push(titleBar);
        for (var i = 0; i < data.length; i++) 
        {
            rowData = data[i];
            var menuOption = Ti.UI.createTableViewRow({
                height : '50dp',
                link : rowData.link,
                backgroundColor : '#efefef'
            });

            var rowIcon = Ti.UI.createImageView({
                image : imagepath + rowData.icon,
                center : {
                    x : '35dp'
                },
                link : rowData.link,
            });

            var rowTitle = Ti.UI.createLabel({
                text : rowData.title,
                font : h2,
                left : '70dp',
                link : rowData.link,
            });
            menuOption.add(rowIcon);
            menuOption.add(rowTitle);
            tableData.push(menuOption);
        };
        sideMenu.setData(tableData);
    }

    var overlay = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        backgroundColor : '#333',
        opacity : 0.7
    });

    function logOut() 
    {
        var logoutScreen = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '71%',
            right:'0dp',
            layout : 'vertical'
        });
        var spacer = Ti.UI.createView({
            height : '10dp',
        });

        var logoutButton = qbutton.createButton('Logout', '#b40301');
        var backtoApp = qbutton.createButton('Back To App', '#23b823');
        self.add(overlay);
        logoutScreen.add(logoutButton);
        logoutScreen.add(backtoApp);
        logoutScreen.add(spacer);

        self.add(logoutScreen);

        backtoApp.addEventListener('click', function() {
            self.remove(logoutScreen);
            self.remove(overlay);
        });

        logoutButton.addEventListener('click', function() {
            Ti.App.Properties.setBool('loggedIn', false);
            Ti.App.fireEvent('load');
            self.remove(logoutScreen);
            self.remove(overlay);
        });
    }

    
    sideMenu.addEventListener('click', function(e) {
        if (e.source.link == 'logOut') {
            logOut();
        }else if(e.source.link =='openProfile'||e.source.link =='openInbox'||e.source.link =='openInterests') {
            self.animate({
            left : -(Ti.Platform.displayCaps.platformWidth * .77),
            duration : 750
        }, function() {
            self = null;
            Ti.App.fireEvent(e.source.link);
            Ti.App.fireEvent('closeSlideOut');
        });
        
            
        }
    });

    backButton.addEventListener('click', function(e) {
        self.animate({
            left : -(Ti.Platform.displayCaps.platformWidth * .77),
            duration : 750
        }, function(){
            Ti.App.fireEvent('closeSlideOut');
        });
            
        
    });

    return self;
}

module.exports = SlideOutMenu;
