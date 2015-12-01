$(document).ready(function(){
	
	//console.log("js");
	$('#myWizard').submit(function(){//values received from wizard-form
		
		//var $inputs=$('#myWizard :input');
		var str="<?xml version='1.0' encoding='UTF-8' ?>";
		str+="\n" + "<game2>";
		//console.log("In form");
		var x=document.getElementById("inputTitle").value;//title
		str+="\n"+"<title>" + x +"</title>";
		//console.log(x);
		var sub=document.getElementById("inputSubTitle").value;//subtitle
		str+="\n"+"<sub_title>" + sub +"</sub_title>";

		str+="\n"+"<words>";
		var words=document.getElementsByClassName("word");
		
		//console.log(words.length);
		for (var i = 0; i < words.length; i++) {
			
			var inputWord='inputWord'+(i+1).toString();
			var y=document.getElementById(inputWord).value;//input word
			str+="\n"+"\t"+"<word>"+y+"</word>";
			console.log(y);
		};
		str+="\n"+"</words>";



		/*var word_syllables=document.getElementsByClassName("syll");
		console.log(word_syllables.length);*/
		//console.log(word_syllables[0].length);
		//var numItems=$('.word_syllable').children('div').length;
		//console.log(numItems);
		//var j=0;
		var syllables=document.getElementsByClassName('image');
		str+="\n"+"<images>";
		for (var i = 0; i < syllables.length ; i++) {//no. of words
			//str+="\n"+"\t"+"<word>";
			var input_img='inputImg'+ (i+1).toString();
			console.log(input_img);
			var z=document.getElementById(input_img).value;//input syllable
			str+="\n"+"\t"+"<image>" + z + "</image>"; 
			console.log(z);
			//var class_name=word_syllables[i].text;
			//console.log(class_name);
			//var numItems=$('.word_syllable').children('div').length;
			//console.log(numItems);
			//str+="\n"+"\t"+"</word>";
		};
		str+="\n"+"</images>";

		str+="\n"+"</game2>";
		var filename = prompt("Enter File Name", "file.xml");
                //var str1="<?xml version='1.0' encoding='UTF-8' ?>";
                var b = new Blob([str],{
                    type: 'text/xml'
                });
                /*var b = new Blob([$('body').text().trim()],{
                    type: 'text/xml'
                });*/
                var url = URL.createObjectURL(b);
                var A = document.createElement('a');
                A.setAttribute('download',(filename !== null)?
                    ( (filename.length - filename.lastIndexOf('.xml') === 4 )?filename:filename+'.xml' )
                    :'file.xml');
                A.setAttribute('href',url);
                document.body.appendChild(A);
                A.click();
                $(A).remove();

	});

});


function remove(){
    var r = confirm('Confirm remove?');
    if (r === true) {
        $(this).parent().remove();
    }
}

function publish(data, filename) {

    if (!window.BlobBuilder && window.WebKitBlobBuilder) {
        window.BlobBuilder = window.WebKitBlobBuilder;
    }

    fs.root.getFile(filename, {
        create: true
    }, function (fileEntry) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function (e) {
                console.log('Write completed.');
            };

            fileWriter.onerror = function (e) {
                console.log('Write failed: ' + e.toString());
            };


            var builder = new BlobBuilder();
            builder.append(data);
            var blob = builder.getBlob();
            fileWriter.write(blob);

        }, errorHandler);

    }, errorHandler);
}
