//FirstView Component Constructor
function SlideOutMenu(userCred) {
    var h1 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '28dp',
        color : '#fff'
    };
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
    data = [{
        icon : 'profile.png',
        title : 'Profile',
        link : 'openProfile'
    }, {
        icon : 'inbox.png',
        title : 'Inbox',
        link : 'openInbox'
    }, {
        icon : 'interest.png',
        title : 'Interests',
        link : 'openInterests'
    }, /*{
        icon : 'settings.png',
        title : 'Settings',
        link : 'openSettings'
    }, */{
        icon : 'signOut.png',
        title : 'Sign Out',
        link : 'logOut'
    }];
    var imagepath = '/images/profile/';
    var qbutton = require('ui/common/buttonCreator');
    var self = Ti.UI.createView({
        backgroundColor : '#fff',
        height : Ti.Platform.displayCaps.platformHeight,
        width : Ti.Platform.displayCaps.platformWidth * 0.77,
        left : -(Ti.Platform.displayCaps.platformWidth * 0.77),
        opacity : 0.9

    });
    self.animate({
        left : '0dp',
        duration : 750
    });

    var backButton = Ti.UI.createView({
        //top:'20dp',
        height : '30dp',
        width : '40dp',
        right : '0dp'
    });
    //self.add(backButton);
    tableData = [];

    var statusView = Ti.UI.createView({
        height : '20dp',
        top : '0dp',
        backgroundColor : '#1c971c',
        right:'0.5dp'
    });

    var sideMenu = Ti.UI.createTableView({
        height : '275dp',
        scrollable : false,
        top : '20dp'
    });
    self.add(statusView);
    createSideMenu();
    self.add(sideMenu);
    var arrowImg = Ti.UI.createImageView({
        image : imagepath + 'arrow.png'
    });
    backButton.add(arrowImg);

    function createSideMenu() {
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
        for (var i = 0; i < data.length; i++) {
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

    function logOut() {
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
            Ti.fireEvent('load');
            self.remove(logoutScreen);
            self.remove(overlay);
        });
    }

    
    sideMenu.addEventListener('click', function(e) {
        if (e.source.link == 'logOut') {
            logOut();
        }else if(e.source.link !='logOut') {
            
            self.animate({
            left : -(Ti.Platform.displayCaps.platformWidth * .77),
            duration : 750
        }, function() {
            self = null;
            Ti.fireEvent(e.source.link);
        });
        Ti.fireEvent('closeSlideOut');
            
        }
    });

    backButton.addEventListener('click', function(e) {
        self.animate({
            left : -(Ti.Platform.displayCaps.platformWidth * .77),
            duration : 750
        });
            
        setTimeout(function(){
            self = null;
            Ti.fireEvent('closeSlideOut');
        }, 750);
    });

    return self;
}

module.exports = SlideOutMenu;
