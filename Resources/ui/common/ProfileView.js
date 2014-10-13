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
        image : imagepath + 'home.png',
        left : '12.5dp',
        center : {
            y : '50dp'
        }
    });

    var self = Ti.UI.createView({
        backgroundImage:'/images/mainmenu/background.png',
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });
    
    getUserData();
    
    

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
        
        
        
        tableData=[];
        var topProfileView = Ti.UI.createView({
            height : '45%',
            backgroundColor:'#bbb',
            top:'0dp'
        });
        var bottomProfileView = Ti.UI.createView({
            height:'55%',
            backgroundColor:'transparent',
            bottom:'0dp'
        });
        
        var circleView = Ti.UI.createView({
            center:{y:'45%'},
            height:'110dp',
            width:'110dp',
            borderRadius:55
        });

        var profilePictureView = Ti.UI.createImageView({
            height : '100%',
            width : '100%',
            image : data.profile_image || imagepath + 'placeholder.png'
        });
        circleView.add(profilePictureView);

        var userName = Ti.UI.createLabel({
            center:{y:'78%'},
            text : data.first_name + ' ' + data.last_name || 'Omar Maghrabi',
            font : h1
        });

        var subTitleText = Ti.UI.createLabel({
            center:{y:'90%'},
            text : data.city,
            font : h2
        });
        
        topProfileView.add(circleView);
        topProfileView.add(userName);
        topProfileView.add(subTitleText);
        self.add(topProfileView);
        self.add(textBtn);

        var userDataTable = Ti.UI.createTableView({
            height:'100%',
            width:'100%',
            backgroundColor:'transparent'
        });
        
        for(var key in meta){
            var Row = Ti.UI.createTableViewRow({
                height:'60dp',
                details:meta[key]
            });
            
            var RowTitle = Ti.UI.createLabel({
                text:key
            });
            Row.add(RowTitle);
            tableData.push(Row);
            
        }
        userDataTable.setData(tableData);
        bottomProfileView.add(userDataTable);
        self.add(bottomProfileView);
    }


    textBtn.addEventListener('click', function() {
        parent.remove(self);
    });

    return self;
}

module.exports = ProfileView;
