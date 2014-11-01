exports.Notifications = function registerForPushNotifications() {
    var userCred = Ti.App.Properties.getObject('userCred');

    var self = this;
    var osType;
    if (Ti.Platform.osname === 'android') {
        osType = 'android';
        androidRegisterGcm();
    } else {
        osType = 'ios';
        iosRegisterGcm();
    };

    function iosRegisterGcm() {
        if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
            function registerForPush() {
                Ti.Network.registerForPushNotifications({
                    success : deviceTokenSuccess,
                    error : deviceTokenError,
                    callback : receivePush
                });
                // Remove event listener once registered for push notifications
                Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
            };

            // Wait for user settings to be registered before registering for push notifications
            Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);

            // Register notification types to use
            Ti.App.iOS.registerUserNotificationSettings({
                types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
            });

        } else {
            // For iOS 7 and earlier
            Ti.Network.registerForPushNotifications({
                // Specifies which notifications to receive
                types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
                success : deviceTokenSuccess,
                error : deviceTokenError,
                callback : receivePush
            });
        }

        // Process incoming push notifications
        function receivePush(e) {
            Ti.fireEvent('openInbox');
            //var ProfileView = require('ui/common/InboxView');
            //profile = new ProfileView(self);
            //self.add(profile);
            //alert('Received push: ' + JSON.stringify(e));
        }

        // Save the device token for subsequent API calls
        function deviceTokenSuccess(e) {
            deviceToken = e.deviceToken;
            updateUserInfo(deviceToken);
        }

        function deviceTokenError(e) {
            alert('Failed to register for push notifications! ' + e.error);
        }

    }

    function androidRegisterGcm() {
        var gcm = require('net.iamyellow.gcmjs');

        var pendingData = gcm.data;
        if (pendingData && pendingData !== null) {

            Ti.API.info('******* data (started) ' + JSON.stringify(pendingData));
        }

        gcm.registerForPushNotifications({
            success : function(e) {
                Ti.App.Properties.setString('deviceToken', e.deviceToken);
            },
            error : function(e) {
                Ti.API.info('******* error, ' + e.error);
            },
            callback : function() {
                alert('hellow yellow!');
            },
            unregister : function(e) {
                Ti.API.info('******* unregister, ' + e.deviceToken);
            },
            data : function(data) {

                Ti.API.info('******* data (resumed) ' + JSON.stringify(data));
            }
        });
    }

    function updateUserInfo(deviceToken) {
        //var urlCall = apiURL + '/api/appUsers/' + userCred['userId'] + '?access_token=' + userCred['id'];
        var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
        var urlCall = apiURL + '/api/installations';

        var client = Ti.Network.createHTTPClient({
            onload : function(e) {
                //Ti.API.info(e.success);
                Ti.API.info(this.responseText);
                //saveInfo(JSON.parse(this.responseText));
            },
            onerror : function(e) {
                Ti.API.info(e.error + ' Location Callback Function ' + JSON.stringify(e));
                alert('Error');
            },
            timeout : 5000 // in milliseconds
        });

        params = {
            "appId" : Ti.App.id,
            "userId" : userCred['userId'],
            "deviceToken" : deviceToken,
            "deviceType" : osType
        };

        client.open("POST", urlCall);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset', 'utf-8');
        client.send(JSON.stringify(params));
        Ti.API.info(JSON.stringify(params));
    }

};
