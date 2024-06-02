var introEl = document.getElementById("intro");
var questionSectionEl = document.getElementById("question-section");
var initialInputEl = document.getElementById("initial-input");
var highscoreEl = document.getElementById("highscore");
var startQuizEl = document.getElementById("start-quiz");
var questionTitleEl = document.getElementById("question-title");
var choiceListEl = document.getElementById("choice-list");
var timerEl = document.getElementById("timer");
var messageEl = document.getElementById("message");
var scoreEl = document.getElementById("score");
var submitBtn = document.getElementById("submit");
var goBackBtn = document.getElementById("goback-btn");
var clearHighScoreBtn = document.getElementById("clearHighscore");
var enterInitialsEl = document.getElementById("enter-initials");

var setIntervalId;
console.log(questionData);
var timeRemaining = questionData.length * 15;
var index = 0;
console.log(index);

function hideAllSections() {
    introEl.classList.add("hide");
    questionSectionEl.classList.add("hide");
    initialInputEl.classList.add("hide");
    highscoreEl.classList.add("hide");
}

function navigateToIntro() {
    hideAllSections();
    introEl.classList.remove("hide");
    introEl.scrollIntoView({ behavior: 'smooth' });
    clearInterval(setIntervalId);
    timerEl.textContent = "";
    console.log('Intro link clicked');
}

function navigateToHighscore() {
    hideAllSections();
    highscoreEl.classList.remove("hide");
    highscoreEl.scrollIntoView({ behavior: 'smooth' });
    console.log('Highscore link clicked');
}

function startQuiz() {
    timeRemaining = questionData.length * 15;
    hideAllSections();
    questionSectionEl.classList.remove('hide');
    setIntervalId = setInterval(startTimer, 1000);
    renderQuestions();
}

function renderQuestions() {
    messageEl.innerHTML = "";
    if (index < questionData.length) {
        questionTitleEl.textContent = questionData[index].title;
        questionTitleEl.classList.add("question-title");
        choiceListEl.textContent = "";
        for (var i = 0; i < questionData[index].choices.length; i++) {
            var li = document.createElement("li");
            var button = document.createElement("button");
            button.textContent = questionData[index].choices[i];
            button.classList.add("choice-button");
            li.appendChild(button);
            choiceListEl.appendChild(li);
        }
    } else {
        console.error("Error: Index out of bounds");
    }
}

function startTimer() {
    timerEl.textContent = timeRemaining--;
    if (timeRemaining < 0) {
        endQuiz();
    }
}

function nextQuestion(event) {
    var currentChoiceBtn = event.target;
    if (index < questionData.length) {
        var solution = questionData[index].solution;
        if (currentChoiceBtn.textContent === solution) {
            messageEl.innerHTML = "<h4>Correct!</h4>";
        } else {
            messageEl.innerHTML = "<h4>Incorrect!</h4>";
            timeRemaining -= 10;
        }
        if (index + 1 < questionData.length) {
            index++;
            setTimeout(renderQuestions, 500);
        } else {
            endQuiz();
        }
    } else {
        console.error("Error: Index out of bounds");
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(setIntervalId);
    hideAllSections();
    initialInputEl.classList.remove("hide");
    scoreEl.textContent = timerEl.textContent;
}

function storeUserInitials(initials) {
    localStorage.setItem("initials", initials);
}

function submitInitials(event) {
    event.preventDefault();
    var initials = document.getElementById("enter-initials").value.trim();
    if (initials !== "") {
        var score = parseInt(document.getElementById("score").textContent);
        updateHighScore(initials, score);
        showHighScore();
        hideAllSections();
        highscoreEl.classList.remove("hide");
    } else {
        alert("Please enter your initials.");
    }
}

function handleGoBack() {
    hideAllSections();
    introEl.classList.remove("hide");
    index = 0;
}

function handleClearHighscore() {
    localStorage.removeItem("highscore");
    showHighScore();
}

function showHighScore() {
    var ol = document.getElementById("highscore").querySelector("ol");
    ol.innerHTML = "";
    var highScores = getHighScore();
    if (highScores.length > 0) {
        highScores.forEach(function (highScore) {
            var li = document.createElement("li");
            li.textContent = highScore.initials + " - " + highScore.score;
            ol.appendChild(li);
        });
    }
}

function getHighScore() {
    return JSON.parse(localStorage.getItem("highscore")) || [];
}

function updateHighScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highscore")) || [];
    highScores.push({ initials: initials, score: score });
    highScores.sort((a, b) => b.score - a.score);
    const topHighScores = highScores.slice(0, 4);
    localStorage.setItem("highscore", JSON.stringify(topHighScores));
}


/*function to toggle dark mode for #intro*/
function toggleDarkMode() {
    var checkbox = document.getElementById("checkbox");
    
    if (checkbox.checked) {
        // Dark mode enabled
        introEl.style.backgroundColor = "rgba(24, 3, 47, 0.469)";
        introEl.style.color = "white"; // Adjust text color accordingly
        questionSectionEl.style.backgroundColor = "rgba(24, 3, 47, 0.469)";
        initialInputEl.style.backgroundColor = "rgba(24, 3, 47, 0.469)";
        highscoreEl.style.backgroundColor = "rgba(24, 3, 47, 0.469)";
    } else {
        // Dark mode disabled
        introEl.style.backgroundColor = "rgba(79, 41, 122, 0.3)"; // Reset to original background color
        introEl.style.color = "var(--intro-txt-color)"; // Reset to original text color
    }
}



startQuizEl.addEventListener("click", startQuiz);
choiceListEl.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitInitials);
goBackBtn.addEventListener("click", handleGoBack);
clearHighScoreBtn.addEventListener("click", handleClearHighscore);
document.getElementById("start-quiz-link").addEventListener("click", navigateToIntro);
document.getElementById("view-highscore-link").addEventListener("click", function (event) {
    event.preventDefault();
    navigateToHighscore();
});
checkbox.addEventListener("change", toggleDarkMode);