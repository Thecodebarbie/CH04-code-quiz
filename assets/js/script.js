var introEl = document.getElementById("intro")
var questionSectionEl = document.getElementById("question-section")
var initialInputEl = document.getElementById("initial-input")
var highscoreEl = document.getElementById("highscore")
var startQuizEl = document.getElementById("start-quiz")
var questionTitleEl = document.getElementById("question-title")
var choiceListEl = document.getElementById("choice-list")
var timerEl = document.getElementById("timer")
var messageEl = document.getElementById("message")
var scoreEl = document.getElementById("score")
var submitBtn = document.getElementById("submit")
var goBackBtn = document.getElementById("goback-btn")
var clearHighScoreBtn = document.getElementById("clearHighscore")
var enterInitialsEl = document.getElementById("enter-initials")
var setIntervalId
console.log(questionData)
var timeRemaining = questionData.length * 15
var index = 0
console.log(index)

function startQuiz() {
    introEl.classList.add('hide')
    questionSectionEl.classList.remove('hide')

    setIntervalId = setInterval(startTimer, 1000) //1000ms => 1 sec
    renderQuestions()
}
function renderQuestions() {
    messageEl.innerHTML = ""
    if (index < questionData.length) {
        questionTitleEl.textContent = questionData[index].title
        choiceListEl.textContent = ""
        for (var i = 0; i < questionData[index].choices.length; i++) {
            var li = document.createElement("li")
            var button = document.createElement("button")
            button.textContent = questionData[index].choices[i]

            li.appendChild(button)
            choiceListEl.appendChild(li)
        }
    } else {
        console.error("Error: Index out of bounds")
    }

}
function startTimer() {
    timerEl.textContent = timeRemaining--
}
function nextQuestion(event) {
    var currentChoiceBtn = event.target;

    // Check if index is within bounds
    if (index < questionData.length) {
        var solution = questionData[index].solution;

        // Display message based on user's choice
        if (currentChoiceBtn.textContent === solution) {
            messageEl.innerHTML = "<h4>Correct!</h4>";
        } else {
            messageEl.innerHTML = "<h4>Incorrect!</h4>";
            timeRemaining -= 10; // Deduct time for incorrect answer
        }

        // Increment index only when there are more questions available
        if (index + 1 < questionData.length) {
            index++; // Increment index
            renderQuestions(); // Render the next question immediately
        } else {
            // If there are no more questions, end the quiz
            endQuiz();
        }
    } else {
        // Handle the case when index exceeds the bounds of questionData array
        console.error("Error: Index out of bounds");
        endQuiz();
    }
}


function endQuiz() {
    clearInterval(setIntervalId)
    questionSectionEl.classList.add("hide")
    initialInputEl.classList.remove("hide")
    scoreEl.textContent = timerEl.textContent
}

function getHighScore() {
    return localStorage.getItem("highscore") || 0;
}

function updateHighScore(score) {
    localStorage.setItem("highscore", score)
}

startQuizEl.addEventListener("click", startQuiz) //call back
choiceListEl.addEventListener("click", nextQuestion)
