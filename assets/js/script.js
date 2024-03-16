import questionData from "./questionData"
var introEl = document.getElementById("intro")
var questionSectionEl = document.getElementById("question-section")
var initialInputEl = document.getElementById("initial-input")
var highscoreEl= document.getElementById("highscore")
var startQuizEl = document.getElementById("start-quiz")
var questionTitleEl= document.getElementById("question-title")
var choiceListEl= document.getElementById("choice-list")
var timerEl=document.getElementById("timer")
var messageEl=document.getElementById("message")
var scoreEl=document.getElementById("score")
var submitBtn = document.getElementById("submit")
var goBackBtn = document.getElementById("goback-btn")
var clearHighScoreBtn = document.getElementById("clearHighscore")
var enterInitialsEl = document.getElementById("enter-initials")
var setIntervalId
var timeRemaining=questionData.length*15
var index=0
console.log(index)

function startQuiz(){
    introEl.classList.add('hide')
    questionSectionEl.classList.remove('hide')

    setIntervalId=setInterval(startTimer , 1000) //1000ms => 1 sec
    renderQuestions()
}
function renderQuestions(){
    messageEl.innerHTML=""
    questionTitleEl.textContent=questionData[index].title
    console.log(questionData)
    choiceListEl.textContent=""
    for(var i=0; i<questionData[index].choices.length; i++){
        var li=document.createElement("li")
        var button=document.createElement("button")
        button.textContent=questionData[index].choices[i]

        li.appendChild(button)
        choiceListEl.appendChild(li)
    }
}
function startTimer(){
    timerEl.textContent=timeRemaining--
}
function nextQuestion(event){
    var currentChoiceBtn=event.target
    var solution=questionData[index].solution
    index++
    //only display all questions inside array
    if(index < questionData.length){
        questionData
        if(currentChoiceBtn.textContent ===solution){
            messageEl.innerHTML="<h4>Correct!</h4>"
        }else{
            messageEl.innerHTML="<h4>Incorrect!</h4>"
            timeRemaining=timeRemaining-10
        }
        //half second delay//
        setTimeout( renderQuestions,500)
        
    }else{
        // if you go beyond 5 questions
        endQuiz()
    }
   
}

function endQuiz(){
    clearInterval(setIntervalId)
    questionSectionEl.classList.add("hide")
    initialInputEl.classList.remove("hide")
    scoreEl.textContent=timerEl.textContent
}

function getHighScore(){
    return localStorage.getItem("highscore") || 0;
}

function updateHighScore(score){
    localStorage.setItem("highscore", score)
}

startQuizEl.addEventListener("click", startQuiz) //call back
choiceListEl.addEventListener("click", nextQuestion)