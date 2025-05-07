

document.getElementById("rounds").value = "5";
let userScore = 0;

let compScore = 0;

let ties = 0;

let rounds = parseInt(document.getElementById("rounds").value);

let currentRound = 1;

let compTd= document.getElementById("compScore")
let userTd = document.getElementById("yourScore")

console.log(compTd)
console.log(userTd)

function resetScores(){
    userScore = 0;
    compScore = 0;
    ties = 0;
    document.getElementById("compScore").innerText = 0;
    document.getElementById("yourScore").innerText = 0;
    reset_tables(compTd);
    reset_tables(userTd);
}

function setColors(winner){
    if(winner.includes("comp")){
        compTd.classList.remove("loser");
        compTd.classList.add("winner");
        userTd.classList.remove("winner");
        userTd.classList.add("loser");
    }else if(winner.includes("your")){
        userTd.classList.remove("loser");
        userTd.classList.add("winner");
        compTd.classList.remove("winner");
        compTd.classList.add("loser");
    }
        
        
}


function updateScore(id){
    
    if(id == "yourScore"){
        userScore += 1;
        userTd.innerText = userScore;
        setColors("yourScore")
        console.log("user won!")
        
    }else if(id == "compScore"){
        setColors("compScore")
        compScore += 1;
        compTd.innerText = compScore
        console.log("computer won!")
    }else{
        ties += 1;
        console.log("tie")
    }

    console.log("here!")

}

function handleWinning(userChoice, computerChoice){
    if(userChoice == "rock" && computerChoice == "paper"){
        updateScore("compScore");
    }else if(userChoice == "paper" && computerChoice == "rock"){
        updateScore("yourScore");
    }else if(userChoice == "scissors" && computerChoice == "rock"){
        updateScore("compScore")
        
    }else if(userChoice == "rock" && computerChoice == "scissors"){
        updateScore("yourScore")
    }else if(userChoice == "paper" && computerChoice == "scissors"){
        updateScore("compScore")
    }else if(userChoice == "scissors" && computerChoice == "paper"){
        updateScore("yourScore")
    }else if(userChoice == computerChoice){
        updateScore("tie")
    }
}

function user_input_event(e){
    // let user_input = prompt("Rock, Paper, or Scissors?").toLowerCase()
    // while(user_input != "rock" && user_input != "paper" && user_input != "scissors"){
    //     user_input = prompt("Enter Rock, Paper, or Scissors! Not other bullshit").toLowerCase()
    // }

    // return user_input;

    if(currentRound <= rounds){
        console.log("user chose: " + e.target.id)
        
        currentRound += 1;
    }
    
    handleWinning(e.target.id, getComputerInput())
    console.log(currentRound)
    
    if(currentRound > rounds){

        alert("You finised the rounds! Result: + " + getWinner() + " user score: " + (userScore) + " comp score " + (compScore) + " ties: " + ties);
        reset_tables(userTd);
        reset_tables(compTd);
        
        rounds = document.getElementById("rounds").value;
        currentRound = 1;
        resetScores()
        
    }
    

    

    
}


function getWinner(){
    if(compScore == userScore){
        return "Tie!"
    }else if(compScore < userScore){
        return "Computer Wins!"
    }else{

        return "You Win!"
        
        
    }
}

function reset_tables(domElement){
 domElement.classList.remove("loser");
 domElement.classList.remove("winner");
 domElement.innerText = "0";
}


function getComputerInput(){
    let randomNum = Math.random()

    if(randomNum <= 0.33){
        return "rock"
    }else if(randomNum <=0.66){
        return "paper"
    }else{
        return "scissors"
    }
}

function userQuit(){
    let userChoice = prompt("Do you want to quit? (yes/no)").toLowerCase()

    while(userChoice != "yes" && userChoice != "no"){
        userChoice = prompt("YES OR NO!").toLowerCase()
    }

    return userChoice
}


function initializeButtons(){
    document.getElementById("rock").addEventListener("click", (e) => {
        console.log("clicked!");
        user_input_event(e)
    })
    document.getElementById("paper").addEventListener("click", (e) => {user_input_event(e)})
    document.getElementById("scissors").addEventListener("click", (e) => {user_input_event(e)})
}

initializeButtons();


document.getElementById("rounds").addEventListener("change", (e) => {
    console.log("changed to: " + e.target.value);
    rounds= parseInt(e.target.value)
    currentRound = 1
    
    resetScores()
})
