# Coding Quiz Challenge

![Static Badge](https://img.shields.io/badge/theCODEbarbie-%23FBF6E9?style=for-the-badge&logo=Spotlight&labelColor=%23F79AD3)

This is a coding quiz challenge web application where users can test their coding knowledge by answering multiple-choice questions. The application provides feedback on each answer and keeps track of the user's score. Users can also view high scores and compete with others.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [License](#license)

## Installation

1. Clone the repository to your local machine.
2. Open the index.html file in your web browser.

## Usage

1. Click on "Start Quiz" to begin the quiz.
2. Answer the multiple-choice questions by selecting one of the choices.
3. Receive immediate feedback on your answer.
4. Complete all the questions or let the timer run out.
5. Enter your initials to save your score.
6. View high scores by clicking on "View Highscore".

## Features

1. **Quiz Initialization**
   - Start the quiz by clicking the "Start Quiz" button.
   - Timer starts automatically when the quiz begins.

2. **Quiz Questions**
   - Each question is displayed with multiple choice answers.
   - Feedback for correct and incorrect answers.
   - Timer penalty for incorrect answers (-10 seconds).

3. **Timer Functionality**
   - Countdown timer displays the remaining time.
   - Quiz ends automatically when the timer reaches zero.
   - Quiz ends automatically when the player answers all questions.

4. **Dynamic Question Rendering**
   - Questions and choices are dynamically generated and displayed.
   - Consistent styling for buttons and choices.
   - Equal button sizes and spacing for a clean layout.

5. **Quiz End and Scoring**
   - Display the final score when the quiz ends.
   - Enter initials to save your score.

6. **High Score Management**
   - View high scores after completing the quiz.
   - Save and display the top 4 high scores.
   - Clear high scores.

7. **Navigation**
   - Navigation links in the navbar ('Coding Quiz & View Highscore') to go to the intro or high score sections.
   - Smooth scrolling to the target sections on navigation.

8. **Styling and Layout**
   - Glass effect applied to quiz sections and input fields.
   - Consistent and modern design with rounded corners and blurred backgrounds.
   - Enhanced accessibility with placeholder text and hover effects.

9. **Interactivity**
   - Hover effects for buttons and links to improve user experience.
   - Conditional rendering to ensure only the relevant section is displayed.

10. **Responsive Design**
    - Adaptable layout for various screen sizes.
    - Ensure a consistent experience across devices.

11. **Persistent Data**
    - Save and retrieve high scores from local storage.
    - Ensure high scores are retained across sessions.

## Dark Mode 

#### Implementation Details
1. **Toggle Switch**: A toggle switch has been implemented using and is represented by three bars that rotate upon activation, providing visual feedback to the user.
   
2. **Dark Mode Functionality**: Clicking the toggle switch activates the Dark Mode. In Dark Mode, the background color of the 'intro' section changes to a darker shade, enhancing readability and reducing eye strain, especially in low-light environments.

#### Usage
- To activate Dark Mode, users can simply click the toggle switch located to the right of the "Coding Quiz Challenge" title in the '#intro' section.
- Clicking the switch again deactivates Dark Mode, restoring the default light theme.

#### Benefits
- **Enhanced Readability**: Dark Mode provides better contrast, making text and interactive elements more readable, especially in dimly lit environments.
- **Reduced Eye Strain**: By reducing the amount of bright light emitted by the screen, Dark Mode helps alleviate eye strain during extended usage sessions.
- **Improved User Experience**: Offering a Dark Mode option caters to user preferences and improves overall satisfaction with the application.

## Credits

- TheCODEbarbie - Developer

## License

This project is licensed under the [MIT License](LICENSE).
