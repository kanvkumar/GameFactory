var d, $container, handAndStick;
$(document).ready(function(){
    loadXMLDOC();
});

function loadXMLDOC() 
{

    /* Setting callback to be called after the XML file has been loaded */
    //this.onload = callBack;
    //this.argsForCallback = argsForCallback;

    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readystate==4 && xmlhttp.status==200) {
            myfunc(xmlhttp);
        }
    }
    xmlhttp.open("GET","hindi.xml",true);
    xmlhttp.send();

    /* Sending an AJAX call to get the XML Document */
    /*$.get( hindi.xml, 

        (function(response) {*/

        /* response is the XML Document | $(response) is jQuery Object for corresponding XML */
        /*this.xmlDoc = $(response);

        //var xmlEle = null;
        var designNode = this.xmlDoc.find('design').first();

        // Getting <language>
        var langnode = designNode.find('design > languages');
        

        var langElements=designNode.find('language');//array of languages
        this.languages=new Array();

        langElements.each(function(design){

            design.languages.push( new Language( $(this), design ) );//language

        },[this]);

        //Getting <text> in language
        var textElements = lessonNode.find('language').children();
        this.goals = new Array();*/

}
function myfunc(xml)
{
    var x,i,xmlDoc,txt;
    txt = "";
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml.responseText,"text/xml");
    //x = xmlDoc.documentElement;
    //hhhxmlDoc=xml.responseXML;
    var a=xmlDoc.getElementsByTagName("languages");//array of languages
    for (var i = 0; i < x.length; i++) {
        var z=a[i].getElementsByTagName("language")[0].childNodes[0].nodeValue;//textvalue of node
        console.log(z);
    };

    var b=xmlDoc.getElementsByTagName("bgimages");//array of bg-images
    for (var i = 0; i < b.length; i++) {
        b[i].getElementsByTagName("backgroundimage")[0].childNodes[1].nodeValue;
    };

    var c=xmlDoc.getElementsByTagName("bgcolors");//array of bg-color
    for (var i = 0; i < c.length; i++) {
        c[i].getElementsByTagName("backgroundcolor")[0].childNodes[0].nodeValue;
    };

    var d=xmlDoc.getElementsByTagName("gamesounds");//array of gamesounds
    for (var i = 0; i < d.length; i++) {
        d[i].getElementsByTagName("gamesound")[0].childNodes[2].nodeValue;
    };

    var e=xmlDoc.getElementsByTagName("gameobjects");//array of gameobjects
    for (var i = 0; i < e.length; i++) {
        e[i].getElementsByTagName("gamesobject")[0].childNodes[1].nodeValue;
    };

    var f=xmlDoc.getElementsByTagName("levels");//array of levels
    for (var i = 0; i < f.length; i++) {
        f[i].getElementsByTagName("level")[0].childNodes[0].nodeValue;
    };

    var g=xmlDoc.getElementsByTagName("fontcolors");//array of fontcolors
    for (var i = 0; i < g.length; i++) {
        g[i].getElementsByTagName("color")[0].childNodes[0].nodeValue;
    };

    var h=xmlDoc.getElementsByTagName("animations");//array of animations
    for (var i = 0; i < h.length; i++) {
        h[i].getElementsByTagName("animation")[0].childNodes[0].nodeValue;
        h[i].getElementsByTagName("animation")[0].childNodes[1].nodeValue;
        h[i].getElementsByTagName("animation")[0].childNodes[2].nodeValue;
    };
}