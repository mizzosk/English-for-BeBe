// vocabulary list for new words
//var vocabListNewEn = ["living room","dining room","kitchen","bathroom"];
//var vocabListNewSk = ["obývacia izba","jedáleň","kuchyňa","kúpeľňa"];
var vocabListNewEn = ["circle","square","rectangle","triangle","diamond","star","heart"];
var vocabListNewSk = ["kruh","štvorec","obdĺžnik","trojuholník","diamant","hviezda","srdce"];
var vocabListNewGameEn= [];
var vocabListNewGameSk = [];
var newWord = document.getElementById("newWordId");
var counterCorrectAnswer =  0;
var counterFalseAnswer =  0;

// filling vocabListNewGamewith 2x of the original words
for (var i = 0; i < vocabListNewEn.length; i++) {
  for (var j = 0; j < 1; j++) {
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
//game finished
if(vocabListNewGameEn.length === 0 && vocabListNewGameSk.length === 0){
    newWord.textContent = "Gratulujeme. Pocet spravnych odpovedi: " + counterCorrectAnswer
    //alert("Gratulujem. Pocet spravnych odpovedi: " + counterCorrectAnswer);
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
    //console.log(counter);

    //delete used word from the game list
    if (vocabListNewGameEn.includes(newWord.innerHTML)){
        var index = vocabListNewGameEn.indexOf(newWord.innerHTML);
        vocabListNewGameEn.splice(index,1);
    } 
    if (vocabListNewGameSk.includes(newWord.innerHTML)){
        var index = vocabListNewGameSk.indexOf(newWord.innerHTML);
        vocabListNewGameSk.splice(index,1);
    }
    //console.log(vocabListNewGameEn);
    //console.log(vocabListNewGameSk);
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
    const buttonText = document.getElementById("newWordId").textContent;
        
        if (buttonText !== "") {
            const utterance = new SpeechSynthesisUtterance(buttonText);
            
            if (vocabListNewEn.includes(buttonText)){
                // Set the language to English (United States)
                utterance.lang = 'en-US';
           } else {
                // Set the language to Slovak
                utterance.lang = 'sk-SK';
           }
            // Optionally, you can set different properties like rate, pitch, and volume.
            //utterance.rate = 0.6;
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

document.getElementById("textToSpeechBt").addEventListener("click", speak);

//Speech to text function
        // Check if the browser supports the Web Speech API
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'sk-SK';

             //if displayedWord is english set recognition language to slovak, else to english
            //if (vocabListNewEn.includes(displayedWord)){
                 // Set the language to Slovak
                 //recognition.lang = 'sk-SK';
                //console.log(recognition.lang);
            //} else {
                 // Set the language to English (United States)
                 //recognition.lang = 'en-US';
                //console.log(recognition.lang);
           // }
    
            // Event handler for when speech is recognized
            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                const transcriptClean = transcript.toLowerCase().replace(/[.,?'"!]/g, '');
                var displayedWord = document.getElementById("newWordId").textContent;
                //get the translated version of displayed word
                if (vocabListNewEn.includes(displayedWord)){
                    var index = vocabListNewEn.indexOf(displayedWord);
                    var displayedWordTranslated = vocabListNewSk[index];
               } else {
                var index = vocabListNewSk.indexOf(displayedWord);
                 var displayedWordTranslated = vocabListNewEn[index];
               }

                //console.log(transcript);
                if(displayedWordTranslated === transcriptClean){
                    playSound("./sounds/spravneBebe.m4a");
                    console.log("HURRAAA - " + transcriptClean);
                    counterCorrectAnswer++;
                    randomNewWordGeneration();
                    //new random word generation - only when there is at least one word in one of the lists
                    //if(vocabListNewGameEn.length > 0 || vocabListNewGameSk.length > 0){
                        //randomNewWordGeneration()}
                }
                else {playSound("./sounds/skusZnovaProsim.m4a");
                    console.log("cele zle - " + transcriptClean);}
                //document.getElementById('output').textContent = transcript;

            };

            // Event handler for when the recognition is started
            recognition.onstart = function () {
                //console.log('Speech recognition started');
            };

            // Event handler for when an error occurs
            recognition.onerror = function (event) {
                //console.error('Speech recognition error', event.error);
            };

            // Event handler for when the recognition is stopped
            recognition.onend = function () {
                //console.log('Speech recognition ended');
            };

            // Event listener for the start button
            document.getElementById('speechToTextBt').addEventListener('click', function () {
                recognition.start();
            });
        } else {
            alert('Speech recognition is not supported in your browser. Please use a different browser.');
        }


        function playSound(soundFile) {
            var audio = new Audio(soundFile);
            audio.play();
        }