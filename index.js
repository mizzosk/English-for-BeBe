// vocabulary list for new words
var vocabListNewEn = ["living room","dining room", "kitchen", "bathroom"];
var vocabListNewSk = ["obývacia izba","jedáleň", "kuchyňa", "kúpeľňa"];
var vocabListNewGameEn= [];
var vocabListNewGameSk = [];
var newWord = document.getElementById("newWordId");
var counter =  0;

// filling vocabListNewGamewith 2x of the original words
for (var i = 0; i < vocabListNewEn.length; i++) {
  for (var j = 0; j < 2; j++) {
    vocabListNewGameEn.push(vocabListNewEn[i]);
    vocabListNewGameSk.push(vocabListNewSk[i]);
  }
}
// chech whether vocabListNewEn and vocabListNewSk have the same number of words
if (vocabListNewEn.length!==vocabListNewSk.length){
    alert("Slovak and English vocabulary lists do not have the same number of words!");
}

function randomNewWordGeneration(){
// randomly switch between En and Sk list
if (vocabListNewGameEn.length === 0){
    var randomSwitch = 1;
} else if (vocabListNewGameSk.length === 0){
    var randomSwitch = 0;
} else {
var randomSwitch = Math.floor(Math.random() * 2);
}

if(vocabListNewGameEn.length === 0 && vocabListNewGameSk.length === 0){
    alert("Game OVER!!");
}else{
    if (randomSwitch===0 ){
        var vocabListNew = vocabListNewGameEn;
        var vocabListNewRandomWord = Math.floor(Math.random() * vocabListNewGameEn.length);
    } if (randomSwitch===1){
        var vocabListNew = vocabListNewGameSk;
        var vocabListNewRandomWord = Math.floor(Math.random() * vocabListNewGameSk.length);
    }
    // displaying random word from en or sk vocabulary list
    newWord.innerHTML = vocabListNew[vocabListNewRandomWord];
    counter++;
    console.log(counter);

    if (vocabListNewGameEn.includes(newWord.innerHTML)){
        var index = vocabListNewGameEn.indexOf(newWord.innerHTML);
        vocabListNewGameEn.splice(index,1);
    } 
    if (vocabListNewGameSk.includes(newWord.innerHTML)){
        var index = vocabListNewGameSk.indexOf(newWord.innerHTML);
        vocabListNewGameSk.splice(index,1);
    }
    console.log(vocabListNewGameEn);
    console.log(vocabListNewGameSk);
    }
}
// generate the random word upon page load
randomNewWordGeneration()

// translate word upon click on the word  
document.getElementById("newWordId").addEventListener("click",function (){
    if (vocabListNewEn.includes(this.innerHTML)){
        var index = vocabListNewEn.indexOf(this.innerHTML);
        newWord.innerHTML = vocabListNewSk[index];
   } else {
    var index = vocabListNewSk.indexOf(this.innerHTML);
    newWord.innerHTML = vocabListNewEn[index];
   }
   
});
  
// refresh button        
document.getElementById("refresh").addEventListener("click",function (){
    randomNewWordGeneration()
});



// text to speech funtion
const synth = window.speechSynthesis;

function speak() {
    const button = document.getElementById("newWordId");
    const buttonText = button.textContent.trim();

    if (buttonText !== "") {
        const utterance = new SpeechSynthesisUtterance(buttonText);

        // Optionally, you can set different properties like rate, pitch, and volume.
        utterance.rate = 0.6;
        //utterance.pitch = 1.0;
        // utterance.volume = 1.0;

        synth.speak(utterance);

        utterance.onend = function () {
            console.log("Speech finished");
        };
    } else {
        console.log("Button text is empty.");
    }
}

document.getElementById("textToSpeech").addEventListener("click", speak);
