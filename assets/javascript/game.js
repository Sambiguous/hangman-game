var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var round_array = [];
var shadow_array = [];
var wrong_count = 0;


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

    if(wrong){
        if(wrong_count < 6){wrong_count += 1};
        console.log(wrong_count);
        document.getElementById("b" + btn).classList.add("wrong");
        img_url = "assets/images/hangman" + wrong_count.toString() + ".png";
        console.log(img_url);
        document.getElementById("gallows").setAttribute("src", img_url);
    }

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

function setBoard(word) {   // populates the '#blankContainer' div with blanks to match the round's answer
   
    round_array = word.split(" ");                   //split 'word' parameter into an array
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
//create win and loss conditions
//loss: checks wrong count after every wrong button press, if == 6 then do something
//win: compares shadow and round arrays after every correct button press, if equal then do something











