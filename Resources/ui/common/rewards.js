//FirstView Component Constructor
function rewardsView() {
    //create object instance, a parasitic subclass of Observable
    var imagepath = '/images/mainmenu/';
    var self = Ti.UI.createView({
        backgroundImage : imagepath + 'background.png',
    });

    var userPoints = Ti.App.Properties.getInt('userPoints', 0);

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
    var h4 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '60dp',
        color : '#fff'
    };

    var logoImg = Ti.UI.createImageView({
        image : imagepath + 'logo.png',
        top : '30dp'
    });

    var loginImg = Ti.UI.createImageView({
        image : imagepath + 'loginbtn.png',
        height : '47dp',
        width : '175dp'
    });

    var loginLabel = Ti.UI.createLabel({
        text : 'Redeem Now',
        font : h2,
        color : 'white'
    });

    var centerText = Ti.UI.createLabel({
        text : 'You Have Earned',
        font : h1
    });

    var pointsNumber = Ti.UI.createLabel({
        text : userPoints.toString(),
        font : h4
    });

    var pointsText = Ti.UI.createLabel({
        text : 'Points',
        font : h1
    });

    var pointsView = Ti.UI.createView({
        layout : 'vertical',
        width : Ti.UI.FILL,
        height : '40%',
        top : '225dp'
    });
    pointsView.add(centerText);
    pointsView.add(pointsNumber);
    pointsView.add(pointsText);

    var loginBtn = Ti.UI.createButton({
        height : '47dp',
        width : '180dp',
        bottom : '30dp'
    });
    loginBtn.add(loginImg);
    loginBtn.add(loginLabel);

    loginBtn.addEventListener('click', function(e) {
        Titanium.Platform.openURL('http://www.sirvipays.com');
    });

    self.addEventListener('click', function() {
        self.hide();
    });

    self.add(logoImg);
    self.add(pointsView);
    self.add(loginBtn);

    return self;
}

module.exports = rewardsView;
