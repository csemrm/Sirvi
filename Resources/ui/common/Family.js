function MyProfileView(parentData) {
	data = parentData.family;
	var spouse = false;
	var children = false;
	var childData = [];
	tableData = [];

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
		text : 'Family',
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

	self.add(scrollView);

	var formView = Ti.UI.createScrollView({
		width : Titanium.Platform.displayCaps.platformWidth,
		layout : 'vertical',
		top : '20dp',
	});

	var maritalStatusField = Ti.UI.createTextField({
		backgroundImage : imagepath + 'marital.png',
		hintText : 'Marital Status',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		editable : false
	});

	formView.add(maritalStatusField);

	var spouseView = Titanium.UI.createView({
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});

	formView.add(spouseView);

	var NumberOfChildren = Ti.UI.createTextField({
		backgroundImage : imagepath + 'children.png',
		hintText : 'Number of Children',
		font : h2,
		width : '229.5dp',
		height : '28.5dp',
		paddingLeft : '35dp',
		color : 'white',
		top : '2.5%',
		editable : false
	});

	formView.add(NumberOfChildren);

	var childrenView = Titanium.UI.createView({
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent'
	});

	formView.add(childrenView);

	var childrenTable = Titanium.UI.createTableView({
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		separatorColor : 'transparent',
		top : '1.5%'
	});

	function createSpouse() {
		spouseView.spouseNameField = Ti.UI.createTextField({
			backgroundImage : imagepath + 'user.png',
			hintText : 'Spouse Name',
			font : h2,
			width : '229.5dp',
			height : '28.5dp',
			paddingLeft : '35dp',
			color : 'white',
			top : '1.5%',
		});
		spouseView.spouseGenderField = Ti.UI.createTextField({
			backgroundImage : imagepath + 'gender.png',
			hintText : 'Spouse Gender',
			font : h2,
			width : '229.5dp',
			height : '28.5dp',
			paddingLeft : '35dp',
			color : 'white',
			top : '2.5%',
		});
		spouseView.spouseDOBField = Ti.UI.createTextField({
			backgroundImage : imagepath + 'bday.png',
			hintText : 'Spouse Birthday',
			font : h2,
			width : '229.5dp',
			height : '28.5dp',
			paddingLeft : '35dp',
			color : 'white',
			top : '2.5%',
		});

		spouse = true;

		spouseView.add(spouseView.spouseNameField);
		spouseView.add(spouseView.spouseGenderField);
		spouseView.add(spouseView.spouseDOBField);
	}

	function createChildren(num, childrenData) {
		tableData = [];
		if (num == 'None') {
			if (children) {
				childrenView.remove(childrenTable);
				children = false;
			}
		} else {
			for (var i = 0; i < num; i++) {
				childRow = Ti.UI.createTableViewRow({
					layout : 'vertical',
					height : Ti.UI.SIZE,
					backgroundColor : 'transparent'
				});

				childNameField = Ti.UI.createTextField({
					backgroundImage : imagepath + 'user.png',
					hintText : 'Child Name',
					font : h2,
					width : '229.5dp',
					height : '28.5dp',
					paddingLeft : '35dp',
					color : 'white',
					top : '2.5%',
				});
				childGenderField = Ti.UI.createTextField({
					backgroundImage : imagepath + 'gender.png',
					hintText : 'Child Gender',
					font : h2,
					width : '229.5dp',
					height : '28.5dp',
					paddingLeft : '35dp',
					color : 'white',
					top : '2.5%',
				});
				childDOBField = Ti.UI.createTextField({
					backgroundImage : imagepath + 'bday.png',
					hintText : 'Child Birthday',
					font : h2,
					width : '229.5dp',
					height : '28.5dp',
					paddingLeft : '35dp',
					color : 'white',
					top : '2.5%',
				});

				childRow.add(childNameField);
				childRow.add(childGenderField);
				childRow.add(childDOBField);
				
				if(childrenData[i]){
					if(childrenData[i].name){
						childNameField.value = childrenData[i].name;
					}
					if(childrenData[i].gender){
						childGenderField.value = childrenData[i].gender;
					}
					if(childrenData[i].birthday){
						childDOBField.value = childrenData[i].birthday;
					}
				}

				tableData.push(childRow);
			};
			childrenTable.setData(tableData);
			childrenView.add(childrenTable);
			children = true;
		}

	}

	var updateImg = Ti.UI.createImageView({
		image : imagepath + 'signupBtn.png',
		height : '35dp',
	});

	var updateLabel = Ti.UI.createLabel({
		text : 'UPDATE',
		font : h2,
		color : 'white'
	});

	var updateBtn = Ti.UI.createButton({
		height : '47dp',
		width : '170.5dp',
		top : '2.5%'
	});

	updateBtn.add(updateImg);
	updateBtn.add(updateLabel);

	var paddingSpace = Ti.UI.createView({
		height : '60dp',
	});

	updateBtn.addEventListener('click', updateProfile);

	function getChildData() {
		Ti.API.info('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=');
		Ti.API.info(childrenTable.data);
		Ti.API.info(childrenTable.data[0]);
		Ti.API.info(childrenTable.data[0].rows);
		Ti.API.info(childrenTable.data[0].rows[0]);
		Ti.API.info('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=');
		for (var i = 0; i < childrenTable.getData(); i++) {
			child = {
				name : tableData.rowData[0].value,
				gender : tableData.rowData[1].value,
				birthday : tableData.rowData[2].value
			};

			childData.push(child);
		};
		return(childData);
	}

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
		
		if(maritalStatusField.value==='Married'){
			spouseData = {
				name : spouseView.spouseNameField.value,
				gender : spouseView.spouseGenderField.value,
				birthday : spouseView.spouseDOBField.value,
			};
		} else {
			spouseData = null;
		}

		familyData = {
			marital_status : maritalStatusField.value,
			spouse : spouseData,
			children : getChildData()
		};

		newData.family = familyData;
		Ti.API.info(JSON.stringify(familyData));

		params = {
			details : newData
		};

		client.open("PUT", urlCall);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send(JSON.stringify(params));
		Ti.API.info(JSON.stringify(params));
	}

	if (data) {
		maritalStatusField.value = data.marital_status;
		if (data.spouse) {
			createSpouse();
			spouseView.spouseNameField.value = data.spouse.name;
			spouseView.spouseGenderField.value = data.spouse.gender;
			spouseView.spouseDOBField.value = data.spouse.birthday;
		}
		if (data.children) {
			NumberOfChildren.value = data.children.length;
			childData = data.children;
			createChildren(data.children.length, data.children);
		}
	}

	formView.add(updateBtn);
	formView.add(paddingSpace);
	self.add(formView);

	function checkSpouse() {
		spouse = false;
		spouseView.remove(spouseView.spouseNameField);
		spouseView.remove(spouseView.spouseGenderField);
		spouseView.remove(spouseView.spouseDOBField);
	}

	maritalStatusField.addEventListener('click', function() {
		var opts = {
			cancel : 3,
			options : ['Single', 'Married', 'Divorced', 'Cancel'],
			selectedIndex : 0,
			title : 'Marital Status'
		};
		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				maritalStatusField.value = 'Single';
				if (spouse) {
					checkSpouse();
				}
			} else if (e.index == 2) {
				maritalStatusField.value = 'Divorced';
				if (spouse) {
					checkSpouse();
				}
			} else if (e.index == 1) {
				maritalStatusField.value = 'Married';
				if (!spouse) {
					createSpouse();
				}
			}
		});
	});

	NumberOfChildren.addEventListener('click', function() {
		childOpts = ['1', '2', '3', '4', '5', '6', 'No', 'Cancel'];

		var opts = {
			cancel : 7,
			options : ['1', '2', '3', '4', '5', '6', 'None', 'Cancel'],
			selectedIndex : 6,
			title : 'Number Of Children'
		};
		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index != 7) {
				NumberOfChildren.value = childOpts[e.index] + ' Children';
				createChildren(childOpts[e.index]);
			}
		});
	});

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
