
const gameContainer=document.getElementById('game');
btn=document.querySelector(".start");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


//value is nothing
let card1=null;
let card2=null;
//if true--> won't allow anymore clicks
let noMoreClicks=false;
//count is nothing
let count=0;
// TODO: Implement this function!
function handleCardClick(event) {
  if(noMoreClicks) return;
  //so user can't click on a flipped card
  if (event.target.classList.contains("flipped")) return;

  let currentCard=event.target;

  //change color of clicked card to its class
  currentCard.style.backgroundColor=currentCard.classList[0];
// if there isn't a value on card 1 or card2
  if (!card1 || !card2) {
    //adding class flipped
    currentCard.classList.add("flipped");
    //card1 set to currentCard
    card1 = card1 || currentCard;
    //setting card 2 to current card(what was clicked) but if same as card 1 set it to null
    card2 = currentCard === card1 ? null : currentCard;
  }
  //if user has clicked on both cards
  if (card1 && card2){
    //since they turned the two cards
    noMoreClicks=true;

    if (card1.className===card2.className){
      count+= 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      //prep for continued game
      card1=null;
      card2=null;
      noMoreClicks=false;
      //if the cards DON't match
     } else {
      setTimeout(function(){
        card1.style.backgroundColor="";
        card2.style.backgroundColor="";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1=null;
        card2=null;
        noMoreClicks=false;
      }, 1000);
    }
  }


  // you can use event.target to see which element was clicked
  if (count === COLORS.length) alert("You win!");
}

btn.addEventListener('click', function(){
  window.location.reload();
})

// when the DOM loads
createDivsForColors(shuffledColors);

/* */