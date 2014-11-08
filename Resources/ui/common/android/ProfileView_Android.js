//FirstView Component Constructor
function ProfileView(parent) {
	var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
	var imagepath = '/images/profile/';
	var userCred = Ti.App.Properties.getObject('userCred');

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

	var textBtn = Ti.UI.createImageView({
		image : imagepath + 'home@2x.png',
		left : '12.5dp',
		center : {
			y : '50dp'
		}
	});

	tableData = [];

	var userDataTable = Ti.UI.createTableView({
		height : Ti.UI.FILL,
		top : '0dp',
		backgroundColor : 'transparent'
	});

	var pageData = [{
		icon : 'profile@2x.png',
		title : 'My Profile',
		link : 'MyProfile'
	}, {
		icon : 'inbox@2x.png',
		title : 'Family',
		link : 'Family'
	}, {
		icon : 'interest@2x.png',
		title : 'Work',
		link : 'Work'
	}, {
		icon : 'signOut@2x.png',
		title : 'Education',
		link : 'Education'
	}];

	var self = Ti.UI.createView({
		backgroundImage : '/images/mainmenu/background@2x.png',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});

	getUserData();

	self.addEventListener('focus', getUserData);

	function getUserData() {
		var urlCall = apiURL + '/api/appUsers/' + userCred['userId'] + '?access_token=' + userCred['id'];
		//var url = apiURL + apiCall;
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info(this.responseText);
				createPageElements(JSON.parse(this.responseText));
			},
			onerror : function(e) {
				Ti.API.info(e.error + ' ' + JSON.stringify(e));
				//alert('Invalid Email Or Password');
			},
			timeout : 5000 // in milliseconds
		});

		client.open("GET", urlCall);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send();
	}

	function createPageElements(user) {
		data = user.details;
		meta = user.meta_data;

		tableData = [];
		var topProfileView = Ti.UI.createView({
			height : '45%',
			backgroundColor : '#bbb',
			top : '0dp',
			opacity : 0.9
		});
		var bottomProfileView = Ti.UI.createView({
			height : '55%',
			backgroundColor : 'transparent',
			bottom : '0dp'
		});

		var circleView = Ti.UI.createView({
			center : {
				y : '45%'
			},
			height : '110dp',
			width : '110dp',
			borderRadius : 55
		});

		self.profilePictureView = Ti.UI.createImageView({
			height : '100%',
			width : '100%',
			image : data.profile_image || imagepath + 'placeholder@2x.png'
		});
		circleView.add(self.profilePictureView);

		self.profilePictureView.addEventListener('click', getPhotos);

		var userName = Ti.UI.createLabel({
			center : {
				y : '78%'
			},
			text : data.first_name + ' ' + data.last_name || 'Omar Maghrabi',
			font : h1
		});

		var subTitleText = Ti.UI.createLabel({
			center : {
				y : '90%'
			},
			text : data.city,
			font : h2
		});

		topProfileView.add(circleView);
		topProfileView.add(userName);
		topProfileView.add(subTitleText);
		self.add(topProfileView);
		self.add(textBtn);

		for (var i = 0; i < pageData.length; i++) {
			rowData = pageData[i];

			var menuOption = Ti.UI.createTableViewRow({
				height : '70dp',
				link : rowData.link,
				backgroundColor : 'transparent',
				data : data
			});

			var rowIcon = Ti.UI.createImageView({
				image : imagepath + rowData.icon,
				center : {
					x : '35dp'
				},
				link : rowData.link,
				data : data
			});

			var rowTitle = Ti.UI.createLabel({
				text : rowData.title,
				font : h2,
				left : '70dp',
				link : rowData.link,
				data : data
			});
			menuOption.add(rowIcon);
			menuOption.add(rowTitle);
			tableData.push(menuOption);
		};
		userDataTable.setData(tableData);

		bottomProfileView.add(userDataTable);
		self.add(bottomProfileView);
	}

	function getPhotos() {

		var opts = {
			cancel : 2,
			options : ['Camera', 'Gallery', 'Cancel'],
			selectedIndex : 2,
			title : 'Photo From:'
		};
		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				Titanium.Media.showCamera({
					success : function(event) {
						// called when media returned from the camera
						Ti.API.debug('Our type was: ' + event.mediaType);
						if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
							self.profilePictureView.image = event.media;
							//uploadPhoto(event.media);
						} else {
							alert("got the wrong type back =" + event.mediaType);
						}
					},
					cancel : function() {
						// called when user cancels taking a picture
					},
					error : function(error) {
						// called when there's an error
						var a = Titanium.UI.createAlertDialog({
							title : 'Camera'
						});
						if (error.code == Titanium.Media.NO_CAMERA) {
							a.setMessage('Please run this test on device');
						} else {
							a.setMessage('Unexpected error: ' + error.code);
						}
						a.show();
					},
					saveToPhotoGallery : true,
					// allowEditing and mediaTypes are iOS-only settings
					allowEditing : true,
					mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
				});
			} else if (e.index == 1) {
				Titanium.Media.openPhotoGallery({
					success : function(event) {
						// called when media returned from the camera
						Ti.API.debug('Our type was: ' + event.mediaType);
						if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

							self.profilePictureView.image = event.media;
							//uploadPhoto(event.media);

						} else {
							alert("got the wrong type back =" + event.mediaType);
						}
					},
					cancel : function() {
						// called when user cancels taking a picture
					},
					error : function(error) {
						// called when there's an error
						var a = Titanium.UI.createAlertDialog({
							title : 'Camera'
						});
						if (error.code == Titanium.Media.NO_CAMERA) {
							a.setMessage('Please run this test on device');
						} else {
							a.setMessage('Unexpected error: ' + error.code);
						}
						a.show();
					},
					mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
				});

			}
		});
	}

	function uploadPhoto(file) {
		var url = "http://104.131.69.224:4000/uploadfile";

		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(response, textStatus, jqXHR) {
			setTimeout(function() {
				Ti.API.info(response.image.filepath);
			}, 5000);

			Ti.UI.createAlertDialog({
				title : 'Success',
			}).show();
		};
		xhr.open('POST', url);
		xhr.send({
			data : file
		});
	}


	textBtn.addEventListener('click', function() {
		parent.remove(self);
	});

	userDataTable.addEventListener('click', function(e) {
		linkClick = e.source.link;
		var urlCall = apiURL + '/api/appUsers/' + userCred['userId'] + '?access_token=' + userCred['id'];
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				data = JSON.parse(this.responseText).details;
				if (linkClick == 'MyProfile') {
					var MyProfile = require('ui/common/android/MyProfile_Android');
					MyProfileView = new MyProfile(data);
					self.add(MyProfileView);
				} else if (linkClick == 'Family') {
					var Family = require('ui/common/android/Family_Android');
					FamilyView = new Family(data);
					self.add(FamilyView);
				} else if (linkClick == 'Work') {
					var Work = require('ui/common/android/Work_Android');
					WorkView = new Work(data);
					self.add(WorkView);
				} else if (linkClick == 'Education') {
					var Education = require('ui/common/android/Education_Android');
					EducationView = new Education(data);
					self.add(EducationView);
				}
			},
			onerror : function(e) {
			},
			timeout : 5000 // in milliseconds
		});
		client.open("GET", urlCall);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');
		client.send();
	});
	return self;
}

module.exports = ProfileView;
