var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var round_array = [];
var shadow_array = [];
var test = "Since I've Been Loving You";

function updateBlanks() {  //works as intended
    for(i = 0; i < round_array.length; i++) {
        for(k = 0; k < round_array[i].length; k++) {
            divID = i.toString() + k.toString();
            divToUpdate = document.getElementById(divID);
            divToUpdate.innerHTML = shadow_array[i][k];
        }
    }
};

function buttonPress(btn) {
    console.log("clicked");
    console.log(btn);
    for(i = 0; i < round_array.length; i++) {
        for(k = 0; k < round_array[i].length; k++) {
            if(btn == round_array[i][k].toUpperCase()) {
                shadow_array[i][k] = round_array[i][k];
                document.getElementById(i.toString() + k.toString()).classList.add("picked");
            }
        }
    }
    updateBlanks();

};

function createButtons() {  //still need to map 'click' to each button
    for(i = 0; i < alpha.length; i++){
        gsd = document.getElementById("guessed")
        if(i == 13){
            //append <br> element to split up buttons
            gsd.append(document.createElement("br"));
        }
        newBtn = document.createElement("button");
        newBtn.classList.add("letter-btn");
        newBtn.setAttribute("onclick", "buttonPress('" + alpha[i].toString() + "');");
        newBtn.innerHTML = "<p>" + alpha[i] + "</p>";
        gsd.append(newBtn);
    }
};
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

function setBoard(word) {   // populates the '#letters' div with blanks to match the round's answer
    //split 'word' parameter into an array
    round_array = word.split(" ");
    shadow_array = createShadowArray(round_array);
    console.log(round_array);
    console.log(shadow_array);
    //create one div per element in the 'round_array' array
    for(wrd = 0; wrd < round_array.length; wrd++) {
        //create new div
        wrdDiv = document.createElement("div");
        //assign class 'word'
        wrdDiv.classList.add("word");
        //assign id 'word' plus number
        wrd_id = "word" + wrd;
        wrdDiv.id = wrd_id
        //append new div to 'letters' div
        document.getElementById("letters").append(wrdDiv);
        //create one div per character in each word
        for(ltr = 0; ltr < round_array[wrd].length; ltr++) {
            //create div
            ltrDiv = document.createElement("div");
            //assign 'letter' class
            ltrDiv.classList.add("letter");
            //set div id equal to the array index as a string
            ltrDiv.id = wrd.toString() + ltr.toString();
            //set initial html
            ltrDiv.innerHTML = shadow_array[wrd][ltr];

            
            if( !(alpha.includes(round_array[wrd][ltr].toUpperCase())) ) {
                ltrDiv.classList.add("punc");
                ltrDiv.innerHTML = round_array[wrd][ltr];
            };
           
            document.getElementById(wrd_id).append(ltrDiv);
        };

    }
};



createButtons();

word = pickWord();

setBoard(word);












