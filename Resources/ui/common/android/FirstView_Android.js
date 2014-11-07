//FirstView Component Constructor
function chatView() {
    //create object instance, a parasitic subclass of Observable
    var imagepath = '/images/mainmenu/';
    var self = Ti.UI.createView({
        backgroundImage:imagepath + 'background@2x.png',
    });
    
    var userCred = Ti.App.Properties.getObject('userCred',{});
    
    var apiCall = '/api/calls';
    var apiURL = Ti.App.Properties.getString('apiURL', 'http://104.131.124.227:3000');
    var url = apiURL + apiCall;
    
    
    
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'22dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};
    var h4 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'60dp',color:'#fff'};
    
    var textBtn = Ti.UI.createImageView({
        image:'/images/law/home@2x.png',
        left:'12.5dp',
        center:{y:'50dp'}
    });
    
    self.add(textBtn);
    
    var sendButton = Ti.UI.createButton({
        title:'Send',
        right:'2dp'
    });
    
    sendButton.addEventListener('click', function(){
        loginReq();
    });
    
    var textChatField = Ti.UI.createTextField({
        width:'90%',
        height:'40dp',
        rightButton:Ti.UI.iPhone.SystemButton.REPLY,
        borderColor:'#333',
        borderRadius:'4dp'
    });
    textChatField.add(sendButton);
    self.add(textChatField);
    
    textChatField.focus();
    
    var historyBox = Ti.UI.createScrollView({
        width:'95%',
        height:'30%',
        top:'80dp',
        layout:'vertical'
    });
    
    self.add(historyBox);
    getSMS();
    
    
    function getSMS(){
        var urlSMS = 'http://104.131.124.227:3000/api/calls?filter={"where":{"appUserId":"'+ userCred['id'] +'"'+  '},"orderBy":"start_time"}';
        
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 //Ti.API.info(e.success);
                 Ti.API.info(this.responseText);
                 var data = JSON.parse(this.responseText);
                 historyBox.removeAllChildren();
                 addSMS(data);
             },
             onerror : function(e) {
                 Ti.API.info(e.error + ' ' + JSON.stringify(e));
                 alert('Invalid Email Or Password');
             },
             timeout : 5000  // in milliseconds
         });
         
         client.open("GET", urlSMS);
         //client.setRequestHeader("Content-Type", "application/json");
         //client.setRequestHeader('charset','utf-8');
         client.send();
    }
    
    function addSMS(data){
        Ti.API.info(data);
        for(i=0;i<data.length;i++)
        {
            var meLabel = Ti.UI.createLabel({
                text:'Me: ' + data[i].intent,
                width:Ti.UI.FILL,
                color:'green',
                textAlign:'left'
            });
            historyBox.add(meLabel);
            
            var agentLabel = Ti.UI.createLabel({
                text:'Agent: ' + data[i].resolution,
                width:Ti.UI.FILL,
                color:'red',
                textAlign:'right'
            });
            historyBox.add(agentLabel);
        }
    }
    
    function getDate() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var seconds = currentTime.getSeconds();
        var year = currentTime.getFullYear();
     
        return month+day+year+hours+minutes+seconds;
    };
    
    function loginReq(){
        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 //Ti.API.info(e.success);
                 Ti.API.info(this.responseText);
                 //saveInfo(JSON.parse(this.responseText));
                 textChatField.value = '';
                 getSMS();
             },
             onerror : function(e) {
                 Ti.API.info(e.error + ' ' + JSON.stringify(e));
                 alert('Invalid Email Or Password');
             },
             timeout : 5000  // in milliseconds
         });
         
         

        params = {
          phone_number: "0",
          wait_time: "0",
          start_time: getDate(),
          intent: textChatField.value,
          resolution: "awaiting rep response",
          recording_url: "0",
          end_time: "0",
          appUserId: userCred['id'],
          agentId: "objectid",
          id: userCred['id'] + getDate()
        };
        
        client.open("POST", url);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader('charset','utf-8');
        client.send(JSON.stringify(params));
        Ti.API.info(JSON.stringify(params));
    }

    
    textBtn.addEventListener('click', function(){
    	textChatField.blur();
        self.hide(); 
    });

    return self;
}

module.exports = chatView;
