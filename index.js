// var numberOfDrumButtons = document.querySelectorAll(".drum").length;

// for(var i=0; i<numberOfDrumButtons;i++){

//     document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        
//         makeSound(this.innerHTML);
//     });
    
//     }

// document.addEventListener("keydown",function (event){
            
//     makeSound(event.key);
//     }    
//     )

// function makeSound(test){
//     switch (test) {
//         case "w": 
//         var audioTom = new Audio("./sounds/tom-1.mp3");
//         audioTom.play(); 
//             break;
//         case "a": 
//         var audioCrash = new Audio("./sounds/crash.mp3");
//         audioCrash.play(); 
//             break;           
            
//         default:
                    
//             break;
//     }   
// };

// document.addEventListener("click",function(event){
//     console.log(event);
// }
// )



var vocabListNewEn = ["living room","dinning room", "kitchen", "bathroom"];
var vocabListNewSk = ["obývacia izba","jedáleň", "kuchyňa", "kúpeľňa"];

// vocabListNew random word generation and comarison with alert if the list do no have the same number of words
var vocabListNewRandomWord = Math.floor(Math.random() * vocabListNewEn.length);
if (vocabListNewEn.length!==vocabListNewSk.length){
    alert("Slovak and English vocabulary lists do not have the same number of words!");
}

// randomly switch between En and Sk list upon refresh
var randomSwitch= Math.floor(Math.random() * 2);
if (randomSwitch===0){
    var vocabListNew = vocabListNewEn;
} else {
    var vocabListNew = vocabListNewSk;
}

// generate random new word upon page refresh
document.addEventListener("DOMContentLoaded", function() {
    var newWord = document.getElementById("newWordId");
    newWord.innerHTML = vocabListNew[vocabListNewRandomWord];
  });


// translate word  
document.getElementById("newWordId").addEventListener("click",function (){
        
    if (randomSwitch===0){
        randomSwitch=1;
        vocabListNew = vocabListNewSk;
    } else {
        randomSwitch=0;
        vocabListNew = vocabListNewEn;
    }
    this.innerHTML = vocabListNew[vocabListNewRandomWord];
        });
  
// refresh button        
document.getElementById("refresh").addEventListener("click",function (){
    
location.reload();
});