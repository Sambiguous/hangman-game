var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function createButtons() {
    for(i = 0; i < alpha.length; i++){
        newBtn = document.createElement("div");
        newBtn.innerHTML = alpha[i];
        document.getElementById("guessed").append(newBtn);
    }
}

function pickWord() {
    return songs[Math.floor(Math.random() * songs.length)]
}

function setBoard(word) {
    for(i = 0; i < word.length; i++) {
        ltrDiv = document.createElement("div");
        ltrDiv.classList.add("letter-box");
        ltrDiv.innerHTML = "o";
        if(word[i] == " ") {
            ltrDiv.classList.add("space");
        };

        if(word[i + 1] == "'") {
            ltrDiv.setAttribute("style", "text-align: right; color: black;");
            ltrDiv.innerHTML = " '";
            i++;
        }
        else {
            
        }

        document.getElementById("letters").append(ltrDiv);

    
    }
}

createButtons();

word = pickWord();

setBoard(word);



