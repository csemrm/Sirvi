//FirstView Component Constructor
function InterestsView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
	    backgroundColor:'#fc4984'
	});
	
	var interest = 
	[
	    {"id": "0","interest": "dogs"},
        {"id": "1","interest": "cats"},
	    {"id": "2","interest": "spiders"},
        {"id": "3","interest": "mexican food"},
        {"id": "4","interest": "travel"},
        {"id": "5","interest": "random"},
        {"id": "6","interest": "cats"},
        {"id": "7","interest": "womb"},
        {"id": "8","interest": "wmwm"},
        {"id": "9","interest": "taco bell"},
        {"id": "10","interest": "food"},
        {"id": "11","interest": "blah"},
        {"id": "12","interest": "interest"},
        {"id": "13","interest": "dogs"},
        {"id": "14","interest": "cats"},
        {"id": "15","interest": "spiders"},
        {"id": "16","interest": "mexican food"},
        {"id": "17","interest": "travel"},
        {"id": "18","interest": "random"},
        {"id": "19","interest": "womb"},
        {"id": "20","interest": "wmwm"},
        {"id": "21","interest": "taco bell"},
        {"id": "22","interest": "food"},
        {"id": "23","interest": "blah"},
        {"id": "24","interest": "interest"},
        {"id": "25","interest": "dogs"},
        {"id": "26","interest": "cats"},
        {"id": "27","interest": "spiders"},
        {"id": "28","interest": "mexican food"},
        {"id": "29","interest": "travel"},
        {"id": "30","interest": "random"},
	];
	
	var tag = require('ui/common/TagView');
	
	
	var imagepath = '/images/interest/';
	var h1 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'28dp',color:'#fff'};
    var h2 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'18dp',color:'#fff'};
    var h3 = {fontFamily: 'HelveticaNeue-Thin',fontSize:'14dp',color:'#fff'};

	var welcomeImg = Ti.UI.createImageView({
        image:imagepath + 'welcome.png',
        width:'294dp',
        center:{y:'50dp'}
    });
    
    var welcomeLabel = Ti.UI.createLabel({
        text:'Let\'s Get Started',
        font:h1,
        color:'white',
        center:{y:'50dp'}
    });
    
    var subTitle = Ti.UI.createLabel({
        text:'Lorem Ipsum dolor sit amet',
        font:h2,
        color:'white',
        center:{y:'80dp'}
    });
    
    var tagsView = Ti.UI.createView({
        layout:'horizontal',
        width:Ti.UI.FILL,
        top:'120dp',
        height:Ti.UI.FILL,
        bottom:'60dp',
    });
    
    self.add(welcomeImg);
    self.add(welcomeLabel);
    self.add(subTitle);
    self.add(tagsView);
    
    
    for(i=0; i<interest.length; i++){
        var tags = new tag(interest[i].interest);
        tagsView.add(tags);
    }
    
    var showmoreLabel = Ti.UI.createImageView({
        image:imagepath + 'showmore.png',
        bottom:'20dp'
    });
    var temp;
    
    showmoreLabel.addEventListener('click', function(e){
        clearList();
        self.remove(showmoreLabel);
        self.add(loginBtn);
        addMoreTags();
    });
    
    function addMoreTags(){
        for(i=0; i<interest.length; i++){
            var tags = new tag(interest[i].interest);
            tagsView.add(tags);
        }
    }
    
    function clearList(){
        for(j=tagsView.children.length; j>0; j--){
            temp=tagsView.children[j-1].type;
            if(temp === "off")
            {
                tagsView.remove(tagsView.children[j-1]);
            }
        }
    }

    var loginImg = Ti.UI.createImageView({
        image:imagepath + 'nextPink.png',
        height:'47dp',
        width:'170.5dp'
    });
    
    var loginLabel = Ti.UI.createLabel({
        text:'NEXT',
        font:h1,
        color:'white'
    });
    
    var loginBtn = Ti.UI.createButton({
        height:'47dp',
        width:'170.5dp',
        bottom:'20dp'
    });
    
    loginBtn.addEventListener('click', function(){
        clearList();
        Ti.App.fireEvent('premain');
    });
    
    loginBtn.add(loginImg);
    loginBtn.add(loginLabel);

	
	
    self.add(showmoreLabel);
	return self;
}

module.exports = InterestsView;
