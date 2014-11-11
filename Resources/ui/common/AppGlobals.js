	var AppGlobals = 
	{ 
		currentWindow: null,
		//setup fonts here 
		h1 : { fontFamily : 'HelveticaNeue-Thin', fontSize : '28dp', color : '#fff' },
	    h2 : { fontFamily : 'HelveticaNeue-Thin', fontSize : '18dp', color : '#fff' },
		h3 : { fontFamily : 'HelveticaNeue-Thin', fontSize : '14dp', color : '#fff' },
		h4 : { fontFamily : 'HelveticaNeue-Thin', fontSize : '18dp', color : '#fff' },
	};
	
	//load font for Android 
	exports.getFont = function (size) {
		var h1 = { fontFamily : 'HelveticaNeue-Thin', fontSize : size, color : '#fff' };	
	  	return h1;
	};
	
	//check platform
	exports.isAndroid = function () {
	  return (Ti.Platform.osname === "android") ? true : false ;
	};
	exports.getOption = function(key) {
		return globals[key];
	};
	exports.setOption = function(key, value) {
		globals[key] = value;
		return;
	};
	exports.getCorrectImageName = function (imagename) {
	   		var correctImage = "";
 			correctImage = (Ti.Platform.osname === "android") ? imagename.toString().replace('.png','@2x.png') : imagename;
 			return correctImage;
	};
	exports.getAll = function() {
		return AppGlobals;
	};
	exports.PixelsToDPUnites = function (ThePixels)
	{
		return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
	};
	
	exports.DPUnitsToPixels = function (TheDPUnits)
	{
		return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
	};
