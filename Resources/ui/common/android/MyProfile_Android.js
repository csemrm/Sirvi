function MyProfileView(data) {
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
		fontSize : '18dp',
		color : '#fff'
	};

	var userData = {};

	var apiCall = '/api/appUsers';
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var url = apiURL + apiCall;

	var imagepath = '/images/signup/';

	var backButton = Ti.UI.createView({
		height : '17dp',
		width : '9dp',
		top : '20dp',
		backgroundImage : imagepath + 'arrow@2x.png'
	});
	self.add(backButton);

	var welcomeImg = Ti.UI.createImageView({
		image : imagepath + 'welcome@2x.png',
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
		backgroundImage : imagepath + 'user@2x.png',
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
		backgroundImage : imagepath + 'email@2x.png',
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
		backgroundImage : imagepath + 'phone@2x.png',
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
		backgroundImage : imagepath + 'user@2x.png',
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
		backgroundImage : imagepath + 'bday@2x.png',
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
		backgroundImage : imagepath + 'city@2x.png',
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
		backgroundImage : imagepath + 'city@2x.png',
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
		backgroundImage : imagepath + 'city@2x.png',
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
		backgroundImage : imagepath + 'city@2x.png',
		hintText : 'ZIP',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '5%',
		value:data.zip,
	});

	var updateBtn = Ti.UI.createButton({
		backgroundImage : imagepath + 'signupBtn@2x.png',
		height : '47dp',
		width : '170.5dp',
		top : '28.5dp',
		title : 'UPDATE',
		font : h1,
		color : 'white'		
	});

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
		Ti.App.fireEvent('closeupdate');
	});

	return self;
}

module.exports = MyProfileView;
