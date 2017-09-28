var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var round_array = [];
var shadow_array = [];
var wrong_count = 0;


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
        wrong_count += 1;
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

function clearChildren() {
    var btns = document.getElementById("guessed");
    var words = document.getElementById("letters");
    while (btns.firstChild) {
        btns.removeChild(btns.firstChild);
    };

    while (words.firstChild) {
        words.removeChild(words.firstChild);
    };

}

function newGame() {
    wrong_count = 0;
    document.getElementById("gallows").setAttribute("src", "assets/images/hangman.png");
    clearChildren();
    createButtons();
    resetButtons();
    word = pickWord();
    setBoard(word);
};


window.onload = function(){
        createButtons();
        resetButtons();
        word = pickWord();
        setBoard(word);


};












