"use strict";
var redipsInit,
	showContent,
	getContent,temp,global_val;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
        form_word(xhttp);
    }
};
xhttp.open("GET", "telugu.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("word");
    
    for (var i=1 ; i<=396 ; i++ )
      { 
      	 
      	            temp = i.toString();
      	    document.getElementById(temp).innerHTML=x[i].childNodes[0].nodeValue;
      }  
                var y = xmlDoc.getElementsByTagName("title");
      	    document.getElementById("title").innerHTML=y[0].childNodes[0].nodeValue;


    }
// redips initialization
redipsInit = function () {
	var num = 0,			// number of successfully placed elements
		rd = REDIPS.drag;	// reference to the REDIPS.drag lib
	// initialization
	rd.init();

	// set hover color
	rd.hover.colorTd = '#9BB3DA';
	// call initially showContent
	showContent();
	// on each drop refresh content
	rd.event.dropped = function () {
		showContent();
	};
	// call showContent() after DIV element is deleted
	rd.event.deleted = function () {
		showContent();
	};
};


// show TD content
showContent = function () {
	// get content of TD cells in right table
	var td1 = getContent('td1'),
		td2 = getContent('td2'),
		td3 = getContent('td3'),
		td4 = getContent('td4'),
		// set reference to the message DIV (below tables)
		message = document.getElementById('message');
	// show block content
	message.innerHTML = 'Word1 = ' + td1 + '<br><br>' +
						'Word2 = ' + td2 + '<br><br>' +
						'Word3 = ' + td3 + '<br><br>' +
						'Word4 = ' + td4;
};


// get content (DIV elements in TD)
getContent = function (id) {
	var td = document.getElementById(id),
		content = '',
		cn, i;
		temp='';
		//console.log(td);
	// TD can contain many DIV elements
	for (i = 0; i < td.childNodes.length; i++) {
		// set reference to the child node
		cn = td.childNodes[i];
		// childNode should be DIV with containing "drag" class name
		if (cn.nodeName === 'DIV' && cn.className.indexOf('drag') > -1) { // and yes, it should be uppercase
			// append DIV id to the result string
			//console.log(cn.id);
			temp=cn.id;
            var n = temp.length;
            var str=cn.id;
            //console.log(n);
            var t = str.substr(0, n-2);
			global_val = parseInt(t);
			//function call to get teleugu letter
			var g=form_word(xhttp);
			console.log(g);
			content += g;

		}
	}
	// cut last '_' from string
	content = content.substring(0, content.length - 1);
	// return result
	
	return content;
};
// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}


function form_word(xml)
{
 var string;
  var xmlDoc1 = xml.responseXML;
    var x = xmlDoc1.getElementsByTagName("word");
      string=x[global_val].childNodes[0].nodeValue;	
return string;
}