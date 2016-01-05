
var states_dictionary={"A":1,"B":3,"C":3,"D":2,"E":1,"F":4,"G":2,"H":4,"I":1,"J":8,"K":5,"L":1,"M":3,"N":1,
	"O":1,"P":3,"Q":10,"R":1,"S":1,"T":1,"U":1,"V":4,"W":4,"X":8,"Y":4,"Z":10 };

//var deb=document.getElementById("debug");
//deb.innerHTML=states_dictionary["X"];


var board = new Array(10);
for (var i = 0; i < 10; i++) {
	board[i] = new Array(10);
}

var flag = new Array(10);
for (var i = 0; i < 10; i++) {
	flag[i] = new Array(10);
}

for(var i=0;i<10;i++)
for(var j=0;j<10;j++)
flag[i][j]=0;

var myDictionary;
var num_rows=10, num_cols=10;
var myvalue=" ";
var click=0;
var input=[];
var highlightx,highlighty;
var valueinserted=0;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var letters = new Array();
context.fillStyle = "rgb(205,133,63)";
context.fillRect(0,0,300,300); 
context.strokeStyle = "rgb(0,0,0)";
context.lineWidth = 2.5;
//context.strokeStyle = "rgb(255, 0, 0)";
//context.lineWidth = 0.5;
var mylettersx=[];
var mylettersy=[];
var newwords=[];
var mylet=[];
var yourscore=0;
var opponentscore=0;
var invalidflag=0;
var gamestart=0;

for(y=0; y<num_cols; y++){  
	for(x=0; x<num_rows;x++){  
		context.strokeRect(x*30, y*30, 30, 30);  

	}  
}  

function getFile(fileName){
	var file = fileName;
	$.get(file,function(txt){
			txt=txt.toLowerCase();
			myDictionary = txt.split("\n");
			//alert(myDictionary[26000]);
			},'text'); 
}

$(document).ready(function() {
		getFile('words.txt');      
		});

$("#myCanvas").click(function(e){ 
		var x = Math.floor((e.pageX-$("#myCanvas").offset().left) / 30);  
		var y = Math.floor((e.pageY-$("#myCanvas").offset().top) / 30);   
		mylettersx.push(x);
		mylettersy.push(y);
		//context2.clearRect(highlightx*40, highlighty*40, 40, 40);
		//context2.fillStyle = "rgb(255,215,0)";
		//context2.fillRect(highlightx*40, highlighty*40, 40, 40);
		//context.fillStyle = "blue";
		context.font = "bold 22px Arial";
		var index = ( (y * num_cols) + (x + 1) );
		if(flag[y][x]==0)//enter letter only on a blank tile
		{	
		if(valueinserted==0)
		{
		if(myvalue!= " "){		
		mylet.push(myvalue);
		letters[index]=myvalue;
		context.lineWidth = 2.5;
		context.clearRect(x*30, y*30, 28, 28);
		context.fillStyle = "yellow";
		context.fillRect(x*30, y*30, 28, 28);
		context.fillStyle = "green"; 
		context.fillText(myvalue, x*30+5, y*30+20);

		board[y][x]=myvalue;
		flag[y][x]=1;
		valueinserted++;
		//	var p = document.getElementById("score");
		//	p.innerHTML=myvalue;
		//	var px = document.getElementById("x1");
		//	px.innerHTML=x;
		//	var py = document.getElementById("y1");
		//	py.innerHTML=y;
		//	var bb = document.getElementById("board");  
		//	bb.innerHTML=board[y][x];
		}
		}
		}


});

function updateBoard(board1,flag1){
	//context.fillStyle = "blue";
	context.font = "bold 22px Arial";
	context.lineWidth = 2.5;

	for(var i=0;i<10;i++){
		for(var j=0;j<10;j++){
			if(flag1[i][j]==1)
			{
				context.clearRect(j*30, i*30, 28, 28);
				context.fillStyle = "yellow";
				context.fillRect(j*30, i*30, 28, 28);
				context.fillStyle = "green"; 
				var index = ( (i * num_cols) + (j + 1) );
				letters[index]=board1[i][j];
				flag[i][j]=1;
				board[i][j]=board1[i][j];
				context.fillText(board1[i][j], j*30+5, i*30+20);
			}
		}
	}


	for(var j=0;j<10;j++){
		var word="";
		for(var i=0;i<10;i++){
			if(flag[i][j]==1){
				word+=board[i][j];
			}
			if(flag[i][j]==0||i==9){
				if(word.length>1)
				{
					if(input.indexOf(word)==-1){
						alert(word);
						input.push(word);
					}
				}
				word="";
			}
		}
	}


	for(var i=0;i<10;i++){
		var word="";
		for(var j=0;j<10;j++){
			if(flag[i][j]==1){
				word+=board[i][j];
			}
			if(flag[i][j]==0||j==9){
				if(word.length>1)
				{
					if(input.indexOf(word)==-1){
						alert(word);
						input.push(word);
					}
				}
				word="";
			}
		}
	}

	//myFunction();


}	

function myFunction()
{
	//var barray = document.getElementById("boardarray");
	var str1="";
	for (var i=0;i<10;i++){
		for(var j=0;j<10;j++) 
			str1+=board[i][j]+" ";
		str1+="<br>";			
	}
	//barray.innerHTML=str1;
}

function getWords(){
	var bword= document.getElementById("words");
	var str="";
	invalidflag=0;
	//input=[];
	for(var i=0;i<10;i++){
		var word="";
		for(var j=0;j<10;j++){
			if(flag[i][j]==1)
			{

				//alert(i+" "+j+" "+flag[i][j]);
				word += board[i][j];
				//alert(word);
			}
			if(flag[i][j]==0||j==9){
				if(word.length>1)
				{
					if(input.indexOf(word)!=-1){}
						//alert(word+" already in input");
					else{
						//alert("wordlength "+word.length+" myletterslength="+mylettersx.length+" with gamestart="+gamestart);
						if(gamestart==0){
							//alert("new word "+word);
							newwords.push(word);
							gamestart=1;
						}
						else{
							if(word.length != mylettersx.length){
								//alert("new word "+word);
								newwords.push(word);
								//gamestart=1;
							}
							else{
								//alert("length not equal");
								invalidflag=1;
							}
						}
					}
					//input.push(word);
					//alert(word);
					str+=word+"  ";
				}
				word="";
			}
		}
	}

	str+=word+"<br>";

	for(var j=0;j<10;j++){
		var word="";
		for(var i=0;i<10;i++){
			if(flag[i][j]==1)
			{
				//alert(i+" "+j+" "+flag[i][j]);
				word+=board[i][j];
				//alert(word);
			}
			if(flag[i][j]==0||i==9){
				if(word.length>1)
				{
					if(input.indexOf(word)!=-1){}
					//	alert(word+" already in input");
					else{
					//	alert("wordlength "+word.length+" myletterslength="+mylettersx.length+"with gamestart="+gamestart);
						if(gamestart==0){
						//	alert("new word "+word);
							newwords.push(word);
							gamestart=1;
						}
						else{
							if(word.length != mylettersx.length){
							//	alert("new word "+word);
								newwords.push(word);
								gamestart=1;
							}
							else{
							//	alert("length not equal");
								invalidflag=1;
							}
						}
					}
					//input.push(word);
					//alert(word);
					str+=word+"  ";
				}
				word="";
			}
		}
	}
	//bword.innerHTML=str;
	//check();
	//}


	//function check(){

var wflag=0;
if(invalidflag==0){
	for(var i=0;i<newwords.length;i++)
	{
		for(var j=0;j<myDictionary.length;j++)
		{
			if(newwords[i].toLowerCase()==myDictionary[j])
			{
			//	alert(newwords[i]+"  "+j+"  "+myDictionary[j]);
				wflag=1;
				alert("present in dictionary");
				invalidflag=0;
				break;
			}
		}
		if(wflag==0){
			invalidflag=1;
			gamestart=0;
			alert("Invalid word");
			newwords=[];
			break;
		}

	}
}
if(invalidflag==0)
{
	alert("inserting new words in input");
	for(var i=0;i<newwords.length;i++){
		input.push(newwords[i]);
	}
	newwords=[];
}
else{
	for(var i=0;i<mylettersx.length;i++){
		flag[mylettersy[i]][mylettersx[i]]=0;
		board[mylettersy[i]][mylettersx[i]]="";
		context.clearRect(mylettersx[i]*30,mylettersy[i]*30, 30, 30);
		context.strokeRect(mylettersx[i]*30,mylettersy[i]*30, 21, 21);
		context.fillStyle = "rgb(205,133,63)";
		context.fillRect(mylettersx[i]*30,mylettersy[i]*30, 28, 28); 
	}
	mylettersx=[];
	mylettersy=[];
}





}

var canvas2 = document.getElementById("myCanvas2");
var context2 = canvas2.getContext("2d");
context2.strokeStyle = "rgb(0, 0, 0)";
context2.lineWidth = 3.5;

//$.dictionary( 'foo', [ 'example', {"strawberry":"Strawberry"} ] );	

var alphabets={1:"A",2:"B",3:"C",4:"D",5:"E",6:"F",7:"G",8:"H",9:"I",10:"J",11:"K",12:"L",13:"M",14:"N",15:"O",16:"P",17:"Q",18:"R",19:"S",20:"T",
			21:"U",22:"V",23:"W",24:"X",25:"Y",26:"Z"}

var values=[];
for(var i=0;i<6;i++){
		var num=Math.floor((Math.random()*26)+1);
		values.push(alphabets[num]);
}

var num=Math.floor((Math.random()*5));
var vowels=[1,5,9,15,21];
values.push(alphabets[vowels[num]]);

		 


var i=0;
for(x=0; x<1; x++){  
	for(y=0; y<7; y++){
		context2.lineWidth = 3.5;
		context2.fillStyle = "yellow";
		context2.fillRect(y*40, x*40, 40, 40);
		context2.fillStyle = "green";   
		context2.strokeRect(y*40, x*40, 40, 40);  
		context2.font = "bold 32px Arial";
		context2.fillText(values[y], y*40+10, x*40+30);
		if(i==5)i=0;
	}  
}

$("#myCanvas2").click(function(e){
		valueinserted=0;
		var x = Math.floor((e.pageX-$("#myCanvas2").offset().left) / 40);  
		var y = Math.floor((e.pageY-$("#myCanvas2").offset().top) / 40);   


		context2.lineWidth = 3.5;
		context2.strokeRect(x*40, y*40, 40, 40);

		context2.lineWidth = 3.5;
		context2.clearRect(x*40, y*40, 40, 40);
		context2.fillStyle = "rgb(255,215,0)";
		context2.fillRect(x*40, y*40, 40, 40);
		context2.fillStyle = "green"; 
		//if(click>0)
		context2.fillText(values[x],x*40+10, y*40+30);


		myvalue = values[x];
		highlightx=x , highlighty=y; 

		click++;

});	
