var cardState = "question"
var questionArray = [];
var answerArray = [];
var unUsedQuestions = [];

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
	$('.card').toggleClass('flipped');
}

function selectQuestion(){
    
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

    //use the random index to select an element from the questionArray
    var randomElement = questionArray[unUsedQuestions[randomIndex]][0];
	var answerElement = questionArray[unUsedQuestions[randomIndex]][1];
    
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
    
    //change the text of the question card to display the question that was randomly selected
    document.getElementById("cardText").innerHTML = randomElement;
	document.getElementById("cardAnswerText").innerHTML = answerElement;
}
