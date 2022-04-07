const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const recentScore = localStorage.getItem('recentScore');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')

    .then((res) => {
        return res.json();
    })
    .then((fetchedQuestions) => {
        questions = fetchedQuestions.results.map((fetchedQuestion) => {
            const formattedQuestion = {
                question: fetchedQuestion.question,
            };

            const answerChoices = [...fetchedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(formattedQuestion.answer - 1,0,fetchedQuestion.correct_answer);
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startQuiz();
    })
    .catch((err) => {
        console.error(err);
    });

//Constants 
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);
        //Go to end page when out of questions
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            addScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

addScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

let checkScore = ((recentScore/MAX_QUESTIONS) * 100);


if (checkScore < 50) {
    finalScore.innerText = "Score: "+ checkScore + "% fail";
    finalScore.style.color = '#dc3545';
}

else if (checkScore >= 50 && checkScore <= 75) {
    finalScore.innerText = "Score: "+ checkScore + "% - well done";
    finalScore.style.color = 'rgb(235, 187, 109)';
}

else if (checkScore > 75) {
    finalScore.innerText = "Score: "+ checkScore + "% - PERFECT!";
    finalScore.style.color = '#28a745';
}




