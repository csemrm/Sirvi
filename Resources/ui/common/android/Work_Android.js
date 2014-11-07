function MyProfileView(parentData) {
	data = parentData.work;
	
	newData = parentData;
	var self = Ti.UI.createView({
		backgroundColor : '#23b823',
		height : '100%',
		width : '100%',
		bottom : -Ti.Platform.displayCaps.platformHeight,
		layout : 'vertical'
	});
	self.animate({
		bottom : '0dp',
		duration : 750
	});

	var userCred = Ti.App.Properties.getObject('userCred');

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
		fontSize : '20dp',
		color : '#fff'
	};

	var userData = {};

	var apiCall = '/api/appUsers';
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;

	var imagepath = '/images/signup/';

	var backButton = Ti.UI.createView({
		height : '40dp',
		width : '60dp',
		top : '20dp'
	});
	self.add(backButton);

	var arrowImg = Ti.UI.createImageView({
		image : imagepath + 'arrow@2x.png'
	});
	backButton.add(arrowImg);

	var welcomeImg = Ti.UI.createImageView({
		image : imagepath + 'welcome@2x.png',
		width : '294dp',
		center : {
			y : '15dp'
		}
	});

	var welcomeLabel = Ti.UI.createLabel({
		text : 'Work',
		font : h1,
		color : 'white',
		center : {
			y : '15dp'
		}
	});

	var scrollView = Ti.UI.createView({
		height : Titanium.UI.SIZE,
		width : '294dp',
	});

	scrollView.add(welcomeImg);
	scrollView.add(welcomeLabel);

	var formView = Ti.UI.createScrollView({
		width : '235dp',
		layout : 'vertical',
		top : '20dp',
	});

	var currentEmploymentLabel = Titanium.UI.createLabel({
		text : 'Current Employment',
		textAlign : 'left',
		font : h4,
		width : '229.5dp',
		color : 'white'
	});

	var currentWorkNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user@2x.png',
		hintText : 'Employer Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '1.5%',
	});

	var currentWorkAddressField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'email@2x.png',
		hintText : 'Employer Address',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '2.5%',
	});

	var previousEmploymentLabel = Titanium.UI.createLabel({
		text : 'Previous Employment',
		textAlign : 'left',
		font : h4,
		top : '5%',
		width : '229.5dp',
		color : 'white'
	});

	var previousWorkNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'phone@2x.png',
		hintText : 'Employer Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '1.5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previousWorkAddressField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user@2x.png',
		hintText : 'Employer Address',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '2.5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previous1EmploymentLabel = Titanium.UI.createLabel({
		text : 'Previous Employment',
		textAlign : 'left',
		font : h4,
		top : '5%',
		width : '229.5dp',
		color : 'white'
	});

	var previous1WorkNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'phone@2x.png',
		hintText : 'Employer Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '1.5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previous1WorkAddressField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user@2x.png',
		hintText : 'Employer Address',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '2.5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var updateImg = Ti.UI.createImageView({
		image : imagepath + 'signupBtn@2x.png',
		height : '47dp',
		width : '170.5dp'
	});

	var updateLabel = Ti.UI.createLabel({
		text : 'UPDATE',
		font : h1,
		color : 'white'
	});

	var updateBtn = Ti.UI.createButton({
		height : '47dp',
		width : '170.5dp',
		top : '28.5dp'
	});

	updateBtn.add(updateImg);
	updateBtn.add(updateLabel);

	var paddingSpace = Ti.UI.createView({
		height : '60dp',
	});

	updateBtn.addEventListener('click', updateProfile);

	function updateProfile() {
		var urlCall = apiURL + '/api/appUsers/' + userCred['userId'] + '?access_token=' + userCred['id'];

		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info(this.responseText);
				successDialog = Titanium.UI.createAlertDialog({
					message : 'Your profile has been updated!'
				}).show();
			},
			onerror : function(e) {
				alert('Error Updating User Data');
			},
			timeout : 5000 // in milliseconds
		});

		data[0] = {
			employer : {
				name : currentWorkNameField.value,
				address : currentWorkAddressField.value
			}
		};
		data[1] = {
			employer : {
				name : previousWorkNameField.value,
				address : previousWorkAddressField.value
			}
		};
		data[2] = {
			employer : {
				name : previous1WorkNameField.value,
				address : previous1WorkAddressField.value
			}
		};
		newData.work = data;
		Ti.API.info(JSON.stringify(data));

		params = {
			details : newData
		};

		client.open("PUT", urlCall);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
	}

	if (data[0]) {
		currentWorkNameField.value = data[0].employer.name;
		currentWorkAddressField.value = data[0].employer.address;
	}
	if (data[1]) {
		previousWorkNameField.value = data[1].employer.name;
		previousWorkAddressField.value = data[1].employer.address;
	}
	if (data[2]) {
		previous1WorkNameField.value = data[2].employer.name;
		previous1WorkAddressField.value = data[2].employer.address;
	}

	formView.add(currentEmploymentLabel);
	formView.add(currentWorkNameField);
	formView.add(currentWorkAddressField);
	formView.add(previousEmploymentLabel);
	formView.add(previousWorkNameField);
	formView.add(previousWorkAddressField);
	formView.add(previous1EmploymentLabel);
	formView.add(previous1WorkNameField);
	formView.add(previous1WorkAddressField);
	formView.add(updateBtn);
	formView.add(paddingSpace);
	self.add(scrollView);
	self.add(formView);

	backButton.addEventListener('click', function(e) {
		self.animate({
			bottom : -Ti.Platform.displayCaps.platformHeight,
			duration : 750
		}, function() {
			self = null;
		});
		Ti.App.fireEvent('closeupdate');
	});

	return self;
}

module.exports = MyProfileView;
