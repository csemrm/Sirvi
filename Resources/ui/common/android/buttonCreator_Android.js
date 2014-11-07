var imagepath = '/images/button/';
var h1 = {
    fontFamily : 'HelveticaNeue-Thin',
    fontSize : '28dp',
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

exports.createButton = function(title, _color) {
    //_color='#132243';

    var _button = Ti.UI.createButton({
    	title : title,
    	font : h2,
        height : '47dp',
        width : '170.5dp',
        top : '20dp',
        option : title,
        color : 'white',
        borderColor : 'white',
        borderRadius : '23.5dp',
        borderWidth : '1dp',
        option : title,
        backgroundColor : _color
    });

    return _button;
};

