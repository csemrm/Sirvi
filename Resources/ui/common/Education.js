function MyProfileView(parentData) {
	data = parentData.education;
	
	newData = parentData;
	var self = Ti.UI.createView({
		backgroundColor : '#23b823',
		height : Ti.Platform.displayCaps.platformHeight,
		width : Ti.Platform.displayCaps.platformWidth,
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
		image : imagepath + 'arrow.png'
	});
	backButton.add(arrowImg);

	var welcomeImg = Ti.UI.createImageView({
		image : imagepath + 'welcome.png',
		width : '294dp',
		center : {
			y : '15dp'
		}
	});

	var welcomeLabel = Ti.UI.createLabel({
		text : 'Education',
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

	
	var currentEducationTypeField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user.png',
		hintText : 'School Type',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
	});

	var currentEducationNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'email.png',
		hintText : 'School Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '2.5%',
	});

	var previousEducationTypeField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'phone.png',
		hintText : 'School Type',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previousEducationNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user.png',
		hintText : 'School Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '2.5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previous1EducationTypeField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'phone.png',
		hintText : 'School Type',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previous1EducationNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user.png',
		hintText : 'School Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '2.5%',
		paddingLeft : '35dp',
		color : 'white',
	});
	
	var previous2EducationTypeField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'phone.png',
		hintText : 'School Type',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var previous2EducationNameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user.png',
		hintText : 'School Name',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '2.5%',
		paddingLeft : '35dp',
		color : 'white',
	});

	var updateImg = Ti.UI.createImageView({
		image : imagepath + 'signupBtn.png',
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
			type : currentEducationTypeField.value,
			school:{
				name : currentEducationNameField.value,
			}
		};
		data[1] = {
			type : previousEducationTypeField.value,
			school:{
				name : previousEducationNameField.value,
			}
		};
		data[2] = {
			type : previous1EducationTypeField.value,
			school:{
				name : previous1EducationNameField.value,
			}
		};
		data[3] = {
			type : previous2EducationTypeField.value,
			school:{
				name : previous2EducationNameField.value,
			}
		};
		newData.education = data;
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
		currentEducationTypeField.value = data[0].type;
		currentEducationNameField.value = data[0].school.name;
	}
	if (data[1]) {
		previousEducationTypeField.value = data[1].type;
		previousEducationNameField.value = data[1].school.name;
	}
	if (data[2]) {
		previous1EducationTypeField.value = data[2].type;
		previous1EducationNameField.value = data[2].school.name;
	}
	if (data[3]) {
		previous2EducationTypeField.value = data[3].type;
		previous2EducationNameField.value = data[3].school.name;
	}

	formView.add(currentEducationTypeField);
	formView.add(currentEducationNameField);
	formView.add(previousEducationTypeField);
	formView.add(previousEducationNameField);
	formView.add(previous1EducationTypeField);
	formView.add(previous1EducationNameField);
	formView.add(previous2EducationTypeField);
	formView.add(previous2EducationNameField);
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
		Ti.fireEvent('closeupdate');
	});

	return self;
}

module.exports = MyProfileView;
