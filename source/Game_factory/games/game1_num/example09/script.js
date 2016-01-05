/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";


var redipsInit,			// define redipsInit variable
	toggleAnimation,
	ending,	// enable / disable animation
	startPositions,
	loadAnswer,		// remember initial positions of DIV elements
	pos = {},			// initial positions of DIV elements
	rd = REDIPS.drag;	// reference to the REDIPS.drag lib




var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
        fun(xhttp);
    }
};
xhttp.open("GET", "file.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("word");
    document.getElementById("w1").innerHTML=x[0].childNodes[0].nodeValue;
    document.getElementById("w2").innerHTML=x[1].childNodes[0].nodeValue;
    document.getElementById("w3").innerHTML=x[2].childNodes[0].nodeValue;
    document.getElementById("w4").innerHTML=x[3].childNodes[0].nodeValue;
    document.getElementById("w5").innerHTML=x[4].childNodes[0].nodeValue;
    document.getElementById("w6").innerHTML=x[5].childNodes[0].nodeValue;
     
       var y = xmlDoc.getElementsByTagName("num");

        document.getElementById("c").innerHTML=y[0].childNodes[0].nodeValue;
        document.getElementById("b").innerHTML=y[1].childNodes[0].nodeValue;
        document.getElementById("f").innerHTML=y[2].childNodes[0].nodeValue;
        document.getElementById("a").innerHTML=y[3].childNodes[0].nodeValue;
        document.getElementById("d").innerHTML=y[4].childNodes[0].nodeValue;
        document.getElementById("e").innerHTML=y[5].childNodes[0].nodeValue;
 
   var z=xmlDoc.getElementsByTagName("title");
   document.getElementById("t").innerHTML=z[0].childNodes[0].nodeValue;
   
   $('#button').click(function (){                    
	var xmlDoc1 = xml.responseXML;
    var xx = xmlDoc1.getElementsByTagName("word");
    var yy = xmlDoc1.getElementsByTagName("num");
    console.log("word");
    document.getElementById("ww1").innerHTML=xx[0].childNodes[0].nodeValue+" : "+yy[0].childNodes[0].nodeValue;
    document.getElementById("ww2").innerHTML=xx[1].childNodes[0].nodeValue+" : "+yy[1].childNodes[0].nodeValue;
    document.getElementById("ww3").innerHTML=xx[2].childNodes[0].nodeValue+" : "+yy[2].childNodes[0].nodeValue;
    document.getElementById("ww4").innerHTML=xx[3].childNodes[0].nodeValue+" : "+yy[3].childNodes[0].nodeValue;
    document.getElementById("ww4").innerHTML=xx[4].childNodes[0].nodeValue+" : "+yy[4].childNodes[0].nodeValue;
    document.getElementById("ww5").innerHTML=xx[5].childNodes[0].nodeValue+" : "+yy[5].childNodes[0].nodeValue;
    document.getElementById("ww6").innerHTML=xx[6].childNodes[0].nodeValue+" : "+yy[6].childNodes[0].nodeValue;
              
                           });
}
//$('#button').click(function fun (xml){

// redips initialization
redipsInit = function () {
	// initialization
	rd.init();
	// enable shift animation
	rd.shift.animation = true;
	// save initial DIV positions to "pos" object (it should go after initialization)
	startPositions();
	// in a moment when DIV element is moved, set drop_option property (shift or single)
	rd.event.moved = function () {
		// find parent table of moved element
		var tbl = rd.findParent('TABLE', rd.obj);
		// if table id is table1
		if (tbl.id === 'table1') {
			rd.dropMode = 'shift';
		}
		else {
			rd.dropMode = 'single';
		}
	};
	// when DIV element is double clicked return it to the initial position
	rd.event.dblClicked = function () {
		// set dblclicked DIV id
		var id = rd.obj.id;
		// move DIV element to initial position
		rd.moveObject({
			id: id,			// DIV element id
			target: pos[id]	// target position
		});
	};
};
// function scans DIV elements and saves their positions to the "pos" object
startPositions = function () {
	// define local varialbles
	var divs, id, i, position;
	// collect DIV elements from dragging area
	divs = document.getElementById('redips-drag').getElementsByTagName('div');
	// open loop for each DIV element
	for (i = 0; i < divs.length; i++) {
		// set DIV element id
		id = divs[i].id;
		// if element id is defined, then save element position 
		if (id) {
			// set element position
			position = rd.getPosition(divs[i]);
			// if div has position (filter obj_new) 
			if (position.length > 0) {
				pos[id] = position;
			}
		}
	}
};


toggleAnimation = function (chk) {
	REDIPS.drag.shift.animation = chk.checked;
	
};
// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}

