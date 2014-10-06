//FirstView Component Constructor
function QuestionView() {
    //create object instance, a parasitic subclass of Observable
    //purple
    var userCredentials = Ti.App.Properties.getObject('userCred');

    _color = '#292f6c';
    _color2 = '#132243';

    //teal
    _color = '#00b0d6';
    _color2 = '#00728b';

    //red
    _color = '#ef3d3b';
    _color2 = '#b40301';

    //yellow
    _color = '#fcd700';
    _color2 = '#f7941d';

    //pink
    _color = '#fe10a7';
    _color2 = '#c20261';

    var self = Ti.UI.createView({
        backgroundImage : '/images/mainmenu/background.png'
    });

    var imagepath = '/images/interest/';
    var h1 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '24dp',
        color : '#fff'
    };
    var h2 = {
        fontFamily : 'HelveticaNeue-Thin',
        fontSize : '18dp',
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

    var centerText = Ti.UI.createLabel({
        text : 'You Have Earned',
        font : h1
    });

    var pointsNumber = Ti.UI.createLabel({
        text : Ti.App.Properties.getInt('userPoints', 50),
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
    self.add(pointsView);
    pointsView.hide();

    var qbutton = require('ui/common/buttonCreator');

    var questions = [];

    var backButton = Ti.UI.createImageView({
        image : imagepath + 'arrow.png',
        left : '12.5dp',
        center : {
            y : '40dp'
        }
    });

    var apiCall = '/api/questions';
    var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
    var url = 'http://104.131.124.227:3000/api/questions';
    //apiURL + apiCall;

    function questionReq() {

        var client = Ti.Network.createHTTPClient({
            onload : function(e) {
                questions = JSON.parse(this.responseText);
                createQuestions(questions);
            },
            onerror : function(e) {
                Ti.API.info(e.error + ' ' + JSON.stringify(e));
                alert('error');
            },
            timeout : 5000 // in milliseconds
        });

        client.open("GET", url);
        //client.setRequestHeader("Content-Type", "application/json");
        //client.setRequestHeader('charset','utf-8');
        client.send();
        //Ti.API.info(JSON.stringify(params));
    }

    function createQuestions(questions) {
        var qViews = [];
        var newView;
        var count = 0;
        for ( i = 0; i < questions.length; i++) {
            if (questions[i].type == 'select') {
                newView = Ti.UI.createView({
                    height : Ti.UI.SIZE,
                    width : Ti.UI.FILL,
                    layout : 'vertical',
                    id : questions[i].id
                });

                questionLabel = Ti.UI.createLabel({
                    text : questions[i].text,
                    font : h2,
                    color : 'black',
                    width : '75%',
                    top : '40dp',
                    textAlign : 'center',
                    id : questions[i].id
                });
                newView.add(questionLabel);
                //buttons=[];
                for ( j = 0; j < questions[i].options.length; j++) {
                    optionTitle = questions[i].options[j];
                    newButton = qbutton.createButton(optionTitle, '#0b1fb9');
                    newView.add(newButton);
                }
                qViews.push(newView);
                count++;
            }
        }
        var scrollableView = Ti.UI.createScrollableView({
            views : qViews,
            zIndex : -1,
            backgroundImage : '/images/mainmenu/background.png'
            //showPagingControl:true
        });
        self.add(scrollableView);

        scrollableView.addEventListener('click', function(e) {
            if (e.source.option) {
                Ti.API.info(scrollableView.views[this.currentPage].id);
                e.source.option.backgroundColor = '#000';
                scrollableView.removeView(scrollableView.views[this.currentPage]);
                if (!scrollableView.views[0]) {
                    Ti.App.Properties.setInt('userPoints', 50);
                    pointsView.show();
                    Ti.App.Properties.setBool('questions', true);

                }
            }
        });
    }

    questionReq();

    homeButton = Ti.UI.createImageView({
        image : imagepath + 'home.png',
        left : '10dp',
        top : '25dp',
        zIndex : 0
    });
    self.add(homeButton);
    homeButton.addEventListener('click', function() {
        self.hide();
    });

    return self;
}

module.exports = QuestionView;
