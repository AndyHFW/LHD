var cardState = "question"

window.onload = function(){
	document.getElementById("cardAnswer").style.visibility = "hidden";
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
