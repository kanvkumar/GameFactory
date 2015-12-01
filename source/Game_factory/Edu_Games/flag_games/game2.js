$(document).ready(function(){
    $container = $('#container');
    console.log("JS working fine!");
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (xhttp.readyState==4 && xhttp.status ==200) {
            Design(xhttp);
        }
    }
    xhttp.open("GET","file1.xml",true);
    xhttp.send();
});

function Design(xml)
{
    
            var xmlDoc= xml.responseXML;
            //var xmlEle = null;
            //var designNode = this.xmlDoc.find('design').first();
            
            //getting title
            var game_title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            console.log(game_title);
            var gmtitle=document.getElementById("head");
            //gmtitle.style.textAlign="center";
            //gmtitle.style.fontSize="xx-large";
            if(gmtitle!=null)
                gmtitle.innerHTML=game_title;


            //sub-title
            var sub_title=xmlDoc.getElementsByTagName("sub_title")[0].childNodes[0].nodeValue;
            console.log(sub_title);
            var sbtitle=document.getElementById("sub");
            if(sbtitle!=null)
                sbtitle.innerHTML=sub_title;

            //getting words
            var words=xmlDoc.getElementsByTagName("word");//array of words Nodes
            var i=1,j=1;
            for (var k = 0; k < words.length; k++) {
                //var h_ele = divisions[i].getElementsByTagName("syllable");//array of h Nodes
                //for (var j = 0; j < 5; j++) {
                    //console.log(h_ele[j].childNodes[0].nodeValue);
                    //if(k%5==0 && k!=0){
                     //   i++;
                     //   j=1;
                    //}

                    var word=words[k].childNodes[0].nodeValue;
                    console.log(word);
                    var name_id='name'+(k+1).toString(); 
                    console.log(name_id);
                    var name_Element=document.getElementById(name_id);
                    //name_Element.style.fontSize="xx-large";
                    //syllable_Element.style.fontWeight="bold";
                    //syllable_Element.style.textAlign="center";
                    name_Element.innerHTML=word;
                    //j++;
                
            }
            

            //getting images
            var images=xmlDoc.getElementsByTagName("image");//array of words Nodes
            var i=1,j=1;
            for (var k = 0; k < images.length; k++) {
                //var h_ele = divisions[i].getElementsByTagName("syllable");//array of h Nodes
                //for (var j = 0; j < 5; j++) {
                    //console.log(h_ele[j].childNodes[0].nodeValue);
                    //if(k%5==0 && k!=0){
                     //   i++;
                     //   j=1;
                    //}

                    var image=images[k].childNodes[0].nodeValue;//image path
                    console.log(image);
                    var image_id='img'+(k+1).toString(); 
                    console.log(image_id);
                    document[image_id].src=image;
                    //var image_Element=document.getElementById(name_id);
                    //name_Element.style.fontSize="xx-large";
                    //syllable_Element.style.fontWeight="bold";
                    //syllable_Element.style.textAlign="center";
                    //name_Element.innerHTML=word;
                    //j++;
                
            }
            //clear


            //var syllable_id='r'+(i).toString() + (j).toString();



            //getting showans
            /*var show_ans=xmlDoc.getElementsByTagName("showans")[0].childNodes[0].nodeValue;
            var rightElement=document.getElementById("right_side");
            rightElement.style.textAlign="center";
            rightElement.style.fontWeight="bold";
            rightElement.style.fontSize="xx-large";
            rightElement.innerHTML=show_ans;*/


            $('#button').click(function(){

                //getting letters(words)
                var syllables=xmlDoc.getElementsByTagName("word");//array of syllable Nodes
                for (var i = 0; i < syllables.length; i++) {
                     //var textEle=letters[i].getElementsByTagName("text");//array of  Nodes
                    //for (var j = 0; j < textEle.length; j++) {
                        var text_val=syllables[i].childNodes[0].nodeValue;
                        var word=document.getElementById("allwords");
                        word.style.textAlign="center";
                        word.style.fontSize="xx-large";
                        word.innerHTML +="<br>"+text_val;
                        console.log(text_val);
                    //}
                }
                //word.innerHTML="";
            });
}

function gameSyllables(syllableNode)
{
    var divisionElements = syllableNode.find('division').children();
    this.divisions = new Array();
    divisionElements.each(function(divisions){
        var division = new Object();
        console.log(division);
    },[this.divisions]);
}
