//FirstView Component Constructor
function Offers() {
    //create object instance, a parasitic subclass of Observable
    var imagepath = '/images/offers/';
    var self = Ti.UI.createView({
        height:'100%',
        backgroundImage:imagepath + 'background.png',
    });
    
    var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontSize:'12dp',color:'#fff'};
    var h4 = {fontSize:'12dp',color:'#fff', fontWeight:'bold'};
    
    var lat = '26.748988387';
    var lng = '-80.227010947';
    
    var header = Ti.UI.createView({
        width:'100%',
        height:'85dp',
        backgroundColor:'#f7b21d',
        top:'0dp'
    });
    
    var headerOpaque = Ti.UI.createView({
        width:'100%',
        height:'20dp',
        backgroundColor:'#000',
        top:'0dp',
        opacity:0.2
    });
    self.add(header);
    
    
    var backButton = Ti.UI.createImageView({
        image:imagepath + 'home.png',
        left:'12.5dp',
        center:{y:'52.5dp'}
    });
    
    
    var headerLabel = Ti.UI.createLabel({
        text:'Daily Deals',
        font:h1,
        center:{y:'52.5dp'},
        color:'white'
    });
    self.add(headerLabel);
    
    var ribbon = Ti.UI.createImageView({
        image:imagepath + 'ribbon.png',
        top:'0dp',
        right:'5dp'
    });
    
    load();
    
    
    function load(){
        Titanium.Geolocation.getCurrentPosition(function(e) {
        if(!e.success || e.error) {
            Ti.API.info('error:' + JSON.stringify(e.error));
            return;
        }
     
        var lng = e.coords.longitude;
        var lat = e.coords.latitude;
        var altitude = e.coords.altitude;
        var heading = e.coords.heading;
        var accuracy = e.coords.accuracy;
        var speed = e.coords.speed;
        var timestamp = e.coords.timestamp;
        var altitudeAccuracy = e.coords.altitudeAccuracy;
        Ti.API.info('speed ' + speed);
        
        var url = 'http://api.sqoot.com/v2/deals?api_key=f07pod&order=distance&per_page=50&location='+lat + ',' + lng;

        var client = Ti.Network.createHTTPClient({
             onload : function(e) {
                 localDeals = JSON.parse(this.responseText).deals;
                 Ti.API.info(localDeals);
                 offerTable(localDeals);
             },
             onerror : function(e) {
                 Ti.API.debug(e.error);
                 alert('error');
             },
             timeout : 5000  // in milliseconds
         });
         client.open("GET", url);
         client.send();
     
        Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
    });
    }
    
    
     
     
     
     function offerTable(data){
        var xGrid = 2;
        var yGrid = data.length/2;
        var tableData = [];
        var cellIndex = 0;
        for (var y=0; y<yGrid; y++){
            var thisRow = Ti.UI.createTableViewRow({
                className: "grid",
                layout: "horizontal",
                height: '235dp',
                width:'100%'
            });
            
            
            for (var x=0; x<xGrid; x++){
             //   if (!data[cellIndex]) {break;}
                var thisView = Ti.UI.createView({
                    left:'5dp',
                    height: '225dp',
                    width: '150dp',
                    backgroundColor:'#fff',
                    borderColor:'#fcd700',
                    borderRadius:5,
                    borderWidth:1,
                    url:data[cellIndex].deal.url,
                });
                    
               var itemImage = Ti.UI.createImageView({
                    top:'0dp',
                    image:data[cellIndex].deal.image_url,
                    width:'150dp',
                    height:'150dp',
                });
                thisView.add(itemImage);
                
                var overlay = Ti.UI.createView({
                    height:'25dp',
                    width:'45dp',
                    top:'115dp',
                    right:'10dp',
                    backgroundColor:'#000',
                    borderRadius:5,
                    borderWidth:1,
                    borderColor:'#000',
                    opacity:0.8
                });
                
                
                
                var price = Ti.UI.createLabel({
                    text:'$'+data[cellIndex].deal.price,
                    font: h4,
                    color:'white',
                });
                
                thisView.add(overlay);
                overlay.add(price);
                
                    
                var textlabel = Ti.UI.createLabel({
                    top:'182dp',
                    left:'2dp',
                    text:data[cellIndex].deal.merchant.name,
                    font: h3,
                    color:'black'
                });
                var description = Ti.UI.createLabel({
                    top:'150dp',
                    text:data[cellIndex].deal.short_title,
                    font: h3,
                    color:'#478caf',
                    left:'2dp',
                    right:'2dp',
                    height:'29dp'
                });
                thisView.add(description);
                thisView.add(textlabel);
                thisRow.add(thisView);
                cellIndex++;
            }
            tableData.push(thisRow);
        }
        
        var offersTableView = Ti.UI.createTableView({
             top:'105dp',
             data:tableData,
             width:'100%',
             separatorColor:'transparent',
        backgroundColor:'transparent'
        });
        self.add(offersTableView);
     }
    
    self.add(ribbon);
    self.add(backButton);
    
    backButton.addEventListener('click', function(){
        self.hide();
    });
    
    self.add(headerOpaque);
    return self;
}

module.exports = Offers;
