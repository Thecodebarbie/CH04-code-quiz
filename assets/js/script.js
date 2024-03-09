var introEl = document.getElementById("intro")
var questionSectionEl = document.getElementById("question-section")
var initialInputEl = document.getElementById("initial-input")
var highscoreEl= document.getElementById("highscore")
var startQuizEl = document.getElementById("start-quiz")
var questionTitleEl= document.getElementById("question-title")
var choiceListEl= document.getElementById("choice-list")
var timerEl=document.getElementById("timer")

var setIntervalId
var timeRemaining=questionData.length*15
var index=0

function startQuiz(){
    introEl.classList.add('hide')
    questionSectionEl.classList.remove('hide')

    setIntervalId=setInterval(startTimer , 1000)
    renderQuestions()
}
function renderQuestions(){
    questionTitleEl.textContent=questionData[index].title
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
function nextQuestion(){

}
startQuizEl.addEventListener("click", startQuiz) //call back
choiceListEl.addEventListener("click", nextQuestion)