var cardState = "question"
var questionArray = [];

window.onload = function(){
	document.getElementById("cardAnswer").style.visibility = "hidden";
}

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      console.log(reader.result.substring(0, 200));
	  questionArray = reader.result.split("\n");
    };
    reader.readAsText(input.files[0]);
	
  };
  
function showArray() {
	document.getElementById("test").innerHTML = questionArray.length;
	for (var i = 0; i < questionArray.length; i++){
		document.getElementById("test").innerHTML += questionArray[i] + "\n";
	}
}

function flipCard(){
	/*var card = document.getElementById("cardText");
	card.innerHTML = "test";*/
	if (cardState == "question") {
		document.getElementById("card").style.visibility = "hidden";
		document.getElementById("cardAnswer").style.visibility = "visible";
		cardState = "answer";
	} else {
		document.getElementById("card").style.visibility = "visible";
		document.getElementById("cardAnswer").style.visibility = "hidden";
		cardState = "question";
	}
}
