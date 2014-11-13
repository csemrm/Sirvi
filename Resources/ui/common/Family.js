function MyProfileView(data) {
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
		fontSize : '18dp',
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
		text : 'My Profile',
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
		top:'20dp',
	});

	var nameField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user.png',
		hintText : 'NAME',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		value:data.first_name + ' ' + data.last_name,
		editable:false
	});
	
	var emailField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'email.png',
		hintText : 'EMAIL',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		editable:false,
		value:data.masked_email,
	});
	
	var phoneField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'phone.png',
		hintText : 'PHONE',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '5%',
		paddingLeft : '35dp',
		color : 'white',
		value:data.phone
	});

	var genderField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'user.png',
		hintText : 'GENDER',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		top : '5%',
		paddingLeft : '35dp',
		color : 'white',
		value:data.gender
	});

	var bdayField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'bday.png',
		hintText : 'BIRTHDAY',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		editable : false,
		value:data.birthday,
	});

	var streetField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'city.png',
		hintText : 'STREET',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		value:data.street
	});

	var cityField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'city.png',
		hintText : 'CITY',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		value:data.city,
	});

	var stateField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'city.png',
		hintText : 'STATE',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		value:data.state,
	});

	var zipField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'city.png',
		hintText : 'ZIP',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		value:data.zip,
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
		height:'60dp',
	});
	
	updateBtn.addEventListener('click', updateProfile);
	
	function updateProfile (){
		var urlCall = apiURL + '/api/appUsers/' + userCred['userId'] + '?access_token=' + userCred['id'];

		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info(this.responseText);
				successDialog = Titanium.UI.createAlertDialog({
					message:'Your profile has been updated!'
				}).show();
			},
			onerror : function(e) {
				alert('Error Updating User Data');
			},
			timeout : 5000 // in milliseconds
		});

		params = {
			details : {
				"first_name" : data.first_name,
				"last_name" : data.last_name,
				"masked_email" : data.masked_email,
				"gender" : genderField.value,
				"birthday" : bdayField.value,
				"phone" : phoneField.value,
				"street" : streetField.value,
				"city" : cityField.value,
				"state" : stateField.value,
				"zip" : zipField.value,
			}
		};

		client.open("PUT", urlCall);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
	}

	formView.add(nameField);
	formView.add(emailField);
	formView.add(genderField);
	formView.add(phoneField);
	formView.add(bdayField);
	formView.add(streetField);
	formView.add(cityField);
	formView.add(stateField);
	formView.add(zipField);
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
