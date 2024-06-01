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

// Define a function to navigate to the intro section without starting the quiz
function navigateToIntro() {
// Define the function to navigate to the intro section without starting the quiz

    var introSection = document.getElementById("intro");
    if (introSection.classList.contains("hide")) {
        introSection.classList.remove("hide"); // Remove the hide class from intro section
        questionSectionEl.classList.add("hide"); // Hide the questions
        clearInterval(setIntervalId); // Clear the timer
        timerEl.textContent = ""; // Reset the timer display
    }
    introSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the intro section

    console.log('link clicked')
}


function startQuiz() {
    // Reset timer to initial value
    timeRemaining = questionData.length * 15

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

            // Apply styles to the button
            button.classList.add("choice-button"); // Add a class for styling

            li.appendChild(button)
            choiceListEl.appendChild(li)
        }
    } else {
        console.error("Error: Index out of bounds")
    }

}
function startTimer() {
    timerEl.textContent = timeRemaining--
    if(timeRemaining < 0){
        endQuiz()
    }
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
            setTimeout(renderQuestions, 500); // Render the next question immediately
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

function storeUserInitials(initials){
    localStorage.setItem("initials", initials);
}

function submitInitials(event) {
    event.preventDefault();

    var initials = document.getElementById("enter-initials").value.trim();

    if (initials !== "") {
        var score = parseInt(document.getElementById("score").textContent);
        updateHighScore(initials, score);
        showHighScore(); // Update high score display
        initialInputEl.classList.add("hide");
        highscoreEl.classList.remove("hide");
    } else {
        alert("Please enter your initials.");
    }
}

// Defines function that handles "Go Back" button click
function handleGoBack(){
    introEl.classList.remove("hide")
    highscoreEl.classList.add("hide")
    index = 0
   // startQuiz() // Starts the quiz again
}

// Defines function that handles 
function handleClearHighscore(){
    localStorage.removeItem("highscore")
    showHighScore()
}

function showHighScore(){
    // Clear previous high scores
    var ol = document.getElementById("highscore").querySelector("ol");
    ol.innerHTML = "";

    var highScores = getHighScore(); // Get the high scores from localStorage

    if (highScores.length > 0) {
        // Loop through high scores and create list items
        highScores.forEach(function (highScore) {
            var li = document.createElement("li"); //var li = "<li  </li>"
            li.textContent = highScore.initials + " - " + highScore.score;
            ol.appendChild(li);
        });
    }
}

function getHighScore() {
    return JSON.parse(localStorage.getItem("highscore")) || 0;
}

function updateHighScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highscore")) || [];

    // Push the new high score to the array
    highScores.push({ initials: initials, score: score });

    // Sort the high scores by score in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top 4 high scores
    const topHighScores = highScores.slice(0, 4);

    // Store the top high scores back to local storage
    localStorage.setItem("highscore", JSON.stringify(topHighScores));
    
}

startQuizEl.addEventListener("click", startQuiz) //call back
choiceListEl.addEventListener("click", nextQuestion)
submitBtn.addEventListener("click", submitInitials)
goBackBtn.addEventListener("click", handleGoBack)
clearHighScoreBtn.addEventListener("click", handleClearHighscore)
document.getElementById("start-quiz-link").addEventListener("click", navigateToIntro);


