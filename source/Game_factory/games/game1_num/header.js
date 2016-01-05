
"use strict";
var headerInit,
	redipsURL = redipsURL || '/javascript/drag-and-drop-table-content/',
	indexURL = indexURL || '../';

// header initialization
headerInit = function () { 
	var header = document.createElement('div'),
		title = document.title;
	// add "header" DIV element
	document.body.insertBefore(header, document.body.firstChild);
	// apply inner HTML
	header.innerHTML = '<div style="background-color:#eee;padding:10px;text-align:center;font-size:20px;font-weight:bold">' + title + '</div>' +
		'<div style="float:left;width:50%;padding-left:10px"><a href="' + indexURL + '"></a></div>' +
		'<div style="text-align:right;padding-right:10px;margin-bottom:10px"><a href="http://www.redips.net' + redipsURL + '"></a></div>';
};

// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', headerInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', headerInit);
}
