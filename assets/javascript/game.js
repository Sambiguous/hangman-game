var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var round_array = [];
var shadow = [];
var test = "Since I've Been Loving You";



function createButtons() {
    for(i = 0; i < alpha.length; i++){
        if(i == 13){
            newLine = document.createElement("br");
            document.getElementById("guessed").append(newLine);
        }
        newBtn = document.createElement("div");
        newBtn.classList.add("letter-btn");
        newBtn.innerHTML = "<p>" + alpha[i] + "</p>";
        document.getElementById("guessed").append(newBtn);
    }
}

function pickWord() {
    return songs[Math.floor(Math.random() * songs.length)]
}

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
}

function setBoard(word) {   // populates the '#letters' div with blanks to match the round's answer
    //split 'word' parameter into an array
    round_array = word.split(" ");
    shadow_array = createShadowArray(round_array);
    //create one div per element in the 'round_array' array
    for(wrd = 0; wrd < round_array.length; wrd++) {
        //create new div
        wrdDiv = document.createElement("div");
        //assign class 'word'
        wrdDiv.classList.add("word");
        //assign id 'word' plus number
        wrd_id = "word" + wrd;
        wrdDiv.id = wrd_id;
        //append new div to 'letters' div
        document.getElementById("letters").append(wrdDiv);
        //create one div per character in each word
        for(ltr = 0; ltr < round_array[wrd].length; ltr++) {
            //create div
            ltrDiv = document.createElement("div");
            //assign 'letter' class
            ltrDiv.classList.add("letter");
            //set initial html
            ltrDiv.innerHTML = shadow_array[wrd][ltr];

            
            if( !(alpha.includes(round_array[wrd][ltr].toUpperCase())) ) {
                ltrDiv.classList.add("punc");
                ltrDiv.innerHTML = round_array[wrd][ltr];
            };
           
            document.getElementById(wrd_id).append(ltrDiv);
        };

    }
}



createButtons();

word = pickWord();

setBoard(word);

console.log(shadow_array);




