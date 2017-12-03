var cardState = "question"
var questionArray = [];
var answerArray = [];
var unUsedQuestions = [];
var previousCard = [];
var previousIndex = -1;
var maxPreviousIndex = 0;
var cardState = "question";

window.onload = function(){
}

var openFile = function(event) {
    var input = event.target;
	var raw = [];

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      console.log(reader.result.substring(0, 200));
	  raw = reader.result.split("\n");
	  for (var i = 0; i < raw.length; i++) {
		  questionArray[i] = raw[i].split("~");
	  }
    };
    reader.readAsText(input.files[0]);
};
  
/*function showArray() {
	document.getElementById("test").innerHTML = questionArray.length;
	for (var i = 0; i < questionArray.length; i++){
		document.getElementById("test").innerHTML += questionArray[i] + "\n";
	}
}*/

function flipCard() {
	if (cardState == "question") {
		cardState = "answer";
		document.getElementById("cardAnswerText").style.visibility = "visible"; 
		document.getElementById("flipCard").innerHTML = "See Question";
	} else {
		cardState = "question";
		document.getElementById("flipCard").innerHTML = "See Answer";
	}
	$('.card').toggleClass('flipped');
}

function flipQuestion() {
	if (cardState == "answer") {
		document.getElementById("cardAnswerText").style.visibility = "hidden"; 
		flipCard();
	}
}

/*function checkReturnState() {
	if (returnState == -1) document.getElementById("previousCard").disabled = true;
	else document.getElementById("previousCard").disabled = false;
}
*/
function previousQuestion(){
    
    if(previousIndex > -1){
        
        //special case for when we first click the 'previous card' button
        if(previousIndex === maxPreviousIndex-1){
            previousIndex -= 1;
        }
        flipQuestion();
        document.getElementById("cardText").innerHTML = previousCard[previousIndex][0];
        document.getElementById("cardAnswerText").innerHTML = previousCard[previousIndex][1];
        previousIndex -= 1;
    }
    
};

function nextPrevQuestion(){
    if(previousIndex < maxPreviousIndex-1){
        
        //special case for when we click the 'next card' button when 
        //  we have reached the end of the previousCard array
        if(previousIndex === -1){
            previousIndex += 1;
        }
        flipQuestion();
        previousIndex += 1;
        document.getElementById("cardText").innerHTML = previousCard[previousIndex][0];
        document.getElementById("cardAnswerText").innerHTML = previousCard[previousIndex][1];
    }
};


function selectQuestion(){
	if (document.getElementById("nextCard").innerHTML == "Start Session") document.getElementById("nextCard").innerHTML = "Next Card";
	
    
    if(previousIndex < maxPreviousIndex-1){
        nextPrevQuestion();
    }else{
		flipQuestion();
        //if the array (that keeps track of the questions that have not been used), 
        //  is empty, then repopulate with the index numbers 0 to N-1, 
        //    where N is the length of the question array
        if(unUsedQuestions.length === 0){
            for(var i=0; i < questionArray.length;i++) {
                unUsedQuestions[i]=i;
            }
        }
        
        //generate a random integer between 0 and N-1, where N is the length of unUsedQuestions
        var randomIndex = Math.floor(Math.random() * (unUsedQuestions.length-1));
        var index = unUsedQuestions[randomIndex];
    
        //use the random index to select an element from the questionArray
        var randomElement = questionArray[index][0];
        var answerElement = questionArray[index][1];
        
                
        //if unUsedQuestions array has more than 1 element
        if(unUsedQuestions.length !== 1){
            
            //get the half of the array to the left of the element that was selected
            var sliceA = unUsedQuestions.splice(0,randomIndex);
            
            //get the half of the array to the right of the element that was selected
            var sliceB = unUsedQuestions.splice(1,unUsedQuestions.length);
            
            //reassign unUsedQuestions array so that the index that was used is no longer included
            unUsedQuestions = sliceA.concat(sliceB);
        }else{
            
            //set the unUsedQuestions array to nothing
            unUsedQuestions = []
        }
        
        //add the current element to the previousCard array
        previousCard.push(questionArray[index]);
        previousIndex += 1;
        maxPreviousIndex += 1;
        
        //change the text of the question card to display the question that was randomly selected
        document.getElementById("cardText").innerHTML = randomElement;
        document.getElementById("cardAnswerText").innerHTML = answerElement;
        
        
    }
}
