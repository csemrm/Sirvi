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
    var _image = Ti.UI.createView({
        backgroundColor : _color,
        height : '47dp',
        width : '170.5dp',
        borderColor : 'white',
        borderRadius : '23.5dp',
        borderWidth : '1dp',
        option : title,
        //index:count
    });

    var _label = Ti.UI.createLabel({
        text : title,
        font : h2,
        color : 'white',
        option : title,
        //index:count
    });

    var _button = Ti.UI.createButton({
        height : '47dp',
        width : '170.5dp',
        top : '15dp',
        option : title,
        //index:count
    });
    _button.add(_image);
    _button.add(_label);

    return _button;
};

