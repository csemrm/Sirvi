function InterestsView(parent) {
	var self = Ti.UI.createView({
		backgroundImage:'/images/mainmenu/background.png',
		height : Ti.Platform.displayCaps.platformHeight,
		width : Ti.Platform.displayCaps.platformWidth,
		bottom : '0dp',
	});
	

	var interest = [];

	var apiCall = '/api/interests';
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			interest = JSON.parse(this.responseText);
			//for ( i = 0; i < interest.length; i++) {
			for ( i = 0; i < 33; i++) {
				var tags = new tag(interest[i].name);
				tagsView.add(tags);
			}
		},
		onerror : function(e) {
			Ti.API.info(e.error + ' ' + JSON.stringify(e));
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});

	client.open("GET", url);
	client.send();

	var tag = require('ui/common/TagView');

	var imagepath = '/images/interest/';
	var h1 = {
		fontFamily : 'HelveticaNeue-Thin',
		fontSize : '28dp',
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

	var backButton = Ti.UI.createImageView({
        image:imagepath + 'home.png',
        left:'12.5dp',
        center:{y:'50dp'}
    });
	self.add(backButton);
	
	var welcomeImg = Ti.UI.createImageView({
		image : imagepath + 'welcome.png',
		width : '294dp',
		center : {
			y : '15dp'
		}
	});

	var welcomeLabel = Ti.UI.createLabel({
		text : 'Interests',
		font : h1,
		color : 'black',
		center : {
			y : '50dp'
		}
	});

	var scrollView = Ti.UI.createView({
		height : Titanium.UI.SIZE,
		width : '294dp',
		top:'50dp'
	});

	scrollView.add(welcomeLabel);
	self.add(welcomeLabel);

	var tagsView = Ti.UI.createView({
		layout : 'horizontal',
		width : Ti.UI.FILL,
		top : '90dp',
		height : Ti.UI.FILL,
		bottom : '55dp',
	});

	self.add(tagsView);

	var showmoreLabel = Ti.UI.createImageView({
		image : imagepath + 'showmore.png',
		bottom : '20dp'
	});
	var temp;

	showmoreLabel.addEventListener('click', function(e) {
		clearList();
		self.remove(showmoreLabel);
		self.add(loginBtn);
		addMoreTags();
	});

	function addMoreTags() {
		for ( i = 0; i < interest.length; i++) {
			var tags = new tag(interest[i].name);
			tagsView.add(tags);
		}
	}

	function clearList() {
		for ( j = tagsView.children.length; j > 0; j--) {
			temp = tagsView.children[j - 1].type;
			if (temp === "off") {
				tagsView.remove(tagsView.children[j - 1]);
			}
		}
	}
	
	backButton.addEventListener('click', function(e) {
		parent.remove(self);
	});

	var loginImg = Ti.UI.createImageView({
		image : imagepath + 'nextPink.png',
		height : '47dp',
		width : '170.5dp'
	});

	var loginLabel = Ti.UI.createLabel({
		text : 'NEXT',
		font : h1,
		color : 'white'
	});

	var loginBtn = Ti.UI.createButton({
		height : '47dp',
		width : '170.5dp',
		bottom : '20dp'
	});

	loginBtn.addEventListener('click', function() {
		clearList();
		Ti.fireEvent('premain');
	});

	loginBtn.add(loginImg);
	loginBtn.add(loginLabel);

	self.add(showmoreLabel);
	return self;
}

module.exports = InterestsView;
