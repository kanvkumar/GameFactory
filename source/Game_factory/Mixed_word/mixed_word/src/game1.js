$(document).ready(function(){
    $container = $('#container');
    console.log("JS working fine!");
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (xhttp.readyState==4 && xhttp.status ==200) {
            Design(xhttp);
        }
    }
    xhttp.open("GET","hindi_new.xml",true);
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
            var gmtitle=document.getElementById("gm_title");
            gmtitle.style.textAlign="center";
            gmtitle.style.fontSize="xx-large";
            gmtitle.innerHTML=game_title;


            //getting syllables
            var syllables=xmlDoc.getElementsByTagName("syllable");//array of division Nodes
            var i=1,j=1;
            for (var k = 0; k < syllables.length; k++) {
                //var h_ele = divisions[i].getElementsByTagName("syllable");//array of h Nodes
                //for (var j = 0; j < 5; j++) {
                    //console.log(h_ele[j].childNodes[0].nodeValue);
                    if(k%5==0 && k!=0){
                        i++;
                        j=1;
                    }

                    var syllable=syllables[k].childNodes[0].nodeValue;
                    var syllable_id='r'+(i).toString() + (j).toString();
                    //var txt=document.getElementById(syllable_id);
                    //console.log(syllable_id);
                    var syllable_Element=document.getElementById(syllable_id);
                    syllable_Element.style.fontSize="xx-large";
                    //syllable_Element.style.fontWeight="bold";
                    syllable_Element.style.textAlign="center";
                    syllable_Element.innerHTML=syllable;
                    j++;
                
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
                
                var cols=5,score=0;
                var word=document.getElementById("allwords");
                word.innerHTML="";
                var syllables=xmlDoc.getElementsByTagName("word");//array of syllable Nodes
                for (var i = 0; i < syllables.length; i++)//rows 
                {
                    var str="";
                    console.log("line....\n");
                    for(var j = 0; j < 5; j++) //cols
                    { 
                        var temp='r'+(i+1).toString()+(j+1).toString();
                        //str=str+temp.innerHTML;
                        var z=document.getElementById(temp).innerHTML;
                        str=str+z;
                        console.log(str);
                    }
                    for(var k=0;k< syllables.length;k++) // check for each value in xml words
                    {
                        //var textEle=letters[i].getElementsByTagName("text");//array of  Nodes
                        //for (var j = 0; j < textEle.length; j++) {
                        var filename,text_val=syllables[i].childNodes[0].nodeValue;
                        //if(text_val=)
                        //var word=document.getElementById("allwords");
                        if(text_val==str)
                        {
                            filename = "correcta.png";   
                            word.style.textAlign="center";
                            word.style.fontSize="xx-large";
                            word.innerHTML +="<br>"+text_val + " " + "<img src='" + filename + "'>";
                            score++;
                            break;
                        }
                        else
                        {
                            filename="incorrecta.png";
                            word.style.textAlign="center";
                            word.style.fontSize="xx-large";
                            word.innerHTML +="<br>"+text_val + " " + "<img src='" + filename + "'>";
                            score--;
                            break;
                        } 
                        
                        //console.log(text_val);
                    //}  
                    }
                }
                
            });
            //var word=document.getElementById("allwords");
            
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