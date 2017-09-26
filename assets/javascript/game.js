var songs = ["For Your Life", "The Song Remains the Same", "In the Evening", "Good Times Bad Times", "Ten Years Gone", "The Wanton Song", "Your Time is Gonna Come", "All My Love", "Houses of the Holy", "Thank You", "Custard Pie", "Since I've Been Loving You"];
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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

function setBoard(answer) {
    answerArray = answer.split(" ");

    for(wrd = 0; wrd < answerArray.length; wrd++) {

        wrdDiv = document.createElement("div");
        wrdDiv.classList.add("word");
        wrd_id = "word" + wrd;
        wrdDiv.id = wrd_id;
        document.getElementById("letters").append(wrdDiv);
        console.log()

        for(ltr = 0; ltr < answerArray[wrd].length; ltr++) {
            
            ltrDiv = document.createElement("div");

            ltrDiv.classList.add("letter");

            ltrDiv.innerHTML = "o";

            if(wrd[ltr] == " ") {

                ltrDiv.classList.add("space");
                };

            
            if(wrd[ltr + 1] == "'") {

                ltrDiv.setAttribute("style", "text-align: right; color: black;");
                ltrDiv.innerHTML = " '";

                ltr++;
            };
           
            document.getElementById(wrd_id).append(ltrDiv);
        };
    //     ltrDiv = document.createElement("div");
    //     ltrDiv.classList.add("letter-box");
    //     ltrDiv.innerHTML = "o";
    //     if(word[i] == " ") {
    //         ltrDiv.classList.add("space");
    //     };

    //     if(word[i + 1] == "'") {
    //         ltrDiv.setAttribute("style", "text-align: right; color: black;");
    //         ltrDiv.innerHTML = " '";
    //         i++;
    //     }
    //     else {
            
    //     }

    //     document.getElementById("letters").append(ltrDiv);

    
    }
}

createButtons();

word = pickWord();

setBoard(word);



