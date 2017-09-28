var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var wins = 0;
var losses = 0;
var round_array = [];
var shadow_array = [];
var wrong_count = 0;
var round_over = false;


function updateBlanks() {  //updates the blank spaces to show letters that have been pressed
    for(i = 0; i < round_array.length; i++) {
        for(k = 0; k < round_array[i].length; k++) {
            divID = i.toString() + k.toString();
            divToUpdate = document.getElementById(divID);
            divToUpdate.innerHTML = shadow_array[i][k];
        }
    }
};

function buttonPress(btn) {
    var wrong = true;

    if(round_over){return};

    for(i = 0; i < round_array.length; i++) {
        for(k = 0; k < round_array[i].length; k++) {
            if(btn == round_array[i][k].toUpperCase()) {
                shadow_array[i][k] = round_array[i][k];
                document.getElementById(i.toString() + k.toString()).classList.add("picked");
                document.getElementById("b" + btn).classList.add("right");
                wrong = false;

            }
        }
    }

    if(wrong){ //executes if letter pressed was not found in the round_array
        wrong_count += 1
        document.getElementById("b" + btn).classList.add("wrong");
        img_url = "assets/images/hangman" + wrong_count.toString() + ".png";
        document.getElementById("gallows").setAttribute("src", img_url);

        if(wrong_count > 5){
            round_over = true;
            losses ++;
            setTimeout(function(){
                again = confirm("You lost!, would you like to play again?");
                if(again){newGame()}
            }, 50)
        }
    }

    else{
        if(compareArrays(round_array, shadow_array)){
            round_over = true;
            wins ++;
            setTimeout(function(){
                again = confirm("You Won!, would you like to play again?");
                if(again){newGame()};
            }, 50);
        };
    };

    updateBlanks();
};

function createButtons() {
    for(i = 0; i < alpha.length; i++){
        gsd = document.getElementById("guessed")
        if(i == 13){
            //append <br> element to split up buttons
            gsd.append(document.createElement("br"));
        }
        var newBtn = document.createElement("button");
        newBtn.classList.add("letter-btn");
        newBtn.id = "b" + alpha[i];
        newBtn.setAttribute("onclick", "buttonPress('" + alpha[i].toString() + "');");
        //newBtn.addEventListener("click", function(){buttonPress(alpha[i])});  // WHAT THE F**K IS GOING ON HERE
        //newBtn.onclick = function() {buttonPress(alpha[i])};                  // WHAT THE F**K IS GOING ON HERE
        newBtn.innerHTML = "<p>" + alpha[i] + "</p>";
        gsd.append(newBtn);
    }
};

function resetButtons() {  //resets button classes to default
    btns = document.getElementById("guessed");
    children = btns.children;
    for(i = 0; i < children.length; i++){
        child = children[i];
        child.classList.remove("right");
        child.classList.remove("wrong");
    }
};

function compareArrays(arr1, arr2){
    for(var i = 0; i < arr1.length; i++){
        for(var k = 0; k < arr1[i].length; k++){
            if(arr1[i][k] != arr2[i][k]){
                return false;
            }
        }
    };
    return true;
}

function pickWord() {
    return songs[Math.floor(Math.random() * songs.length)]
};

function createShadowArray(template) {  //creates shadow of current round's answer. blanks are mapped to this shadow
    shadow = [];
    for(i = 0; i < template.length; i++) {
        shadow[i] = [];
        for(k = 0; k < template[i].length; k++) {
            if(alpha.includes(template[i][k].toUpperCase())) {
                shadow[i][k] = 0;
            }
            else {
                shadow[i][k] = template[i][k];
            }
        }

    }
    
    return shadow;
};

function createRoundArray(word){
    var output = word.split(" ");
    for(i = 0; i < output.length; i++){
        output[i] = output[i].split("");
    };
    return output;
}

function setBoard(word) {   // populates the '#blankContainer' div with blanks to match the round's answer
   
    round_array = createRoundArray(word);
    shadow_array = createShadowArray(round_array);

    for(wrd = 0; wrd < round_array.length; wrd++) {  //create one div per element in the 'round_array' array

        wrdDiv = document.createElement("div");
        wrdDiv.classList.add("word");
        wrd_id = "word" + wrd;
        wrdDiv.id = wrd_id
        document.getElementById("blankContainer").append(wrdDiv);
        
        for(ltr = 0; ltr < round_array[wrd].length; ltr++) {
            ltrDiv = document.createElement("div");
            ltrDiv.classList.add("letter");
            ltrDiv.id = wrd.toString() + ltr.toString();
            ltrDiv.innerHTML = shadow_array[wrd][ltr];

        
            if( !(alpha.includes(round_array[wrd][ltr].toUpperCase())) ) { // if the thing in the word array is not a letter, assign the .punc class
                ltrDiv.classList.add("punc");
                ltrDiv.innerHTML = round_array[wrd][ltr];
            };
           
            document.getElementById(wrd_id).append(ltrDiv);
        };

    }
};

function clearBlanks() {
    var words = document.getElementById("blankContainer");

    while (words.firstChild) {
        words.removeChild(words.firstChild);
    };

}

function newGame() {
    round_over = false;
    wrong_count = 0;
    document.getElementById("gallows").setAttribute("src", "assets/images/hangman.png");
    clearBlanks();
    resetButtons();
    word = pickWord();
    setBoard(word);
};


window.onload = function(){
        createButtons();
        word = pickWord();
        setBoard(word);


};


//next things:
//display wins and loss variables on page










