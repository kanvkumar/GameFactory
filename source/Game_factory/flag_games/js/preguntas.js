$(document).ready(main);

var numCorrect=0;
var numIncorrect=0;
function main(){
  	properties();
	var bod=$("body").css("background-image","url('img/fondo.jpg')");
		bod.css("background-repeat","no-repeat");
	bod.css("background-position","center");
}

function properties(){
	var res =$(".respuesta");//image
	res.draggable();
	res.mousedown(down_ans);
	$(".preg, .pregMonumento").droppable({drop:drop_ques});
	

}

function drop_ques(event,ui){
	var current_ques =$(this);
	var answer = ui.draggable;

	var correct = current_ques.text().toLowerCase();
	console.log(correct);
	
	correct = correct.trim();
	var pos = current_ques.position();
	current_ques.css("background","#BBB");
	current_ques.css("box-shadow",".2px .2px .2em #000");
	current_ques.css("border","1px dashed #333")
	answer.css("cursor","default");

	if(correct==answer.attr("alt")){
		current_ques.addClass("resCorrecta");
		current_ques.append("<img src='img/correcta.png' class='ok' />" +"<img src='"+answer.attr("src")+"' class='rDrop' />" );
		numCorrect++;
	

	}else{
		current_ques.addClass("resIncorrecta");
		current_ques.append("<img src='img/incorrecta.png' class='inco' />"+"<img src='"+answer.attr("src")+"' class='rDrop' />");
		numIncorrect++;
	}
	answer.draggable("destroy");
	current_ques.droppable("destroy");
	Final();
	answer.remove();
}

function Results(){
	$(".ok,.inco").fadeIn("slow");
	$("#resultados").html("Correct answers:     "+numCorrect+"<br />"+"Incorrect answers:    "+numIncorrect);

}

function Final(){
	resul = numCorrect+numIncorrect;
	if(resul ==12){
		
		Results();
	}
}

function down_ans(){
	$(".respuesta").css("z-index","0");
	$(this).css("z-index","100");
}


