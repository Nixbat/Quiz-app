const questions = [
    {
        question: "What is the country with the largest population in the world?",
        answers: [
            {text: "United States", correct: false},
            {text: "India", correct: true},
            {text: "China", correct: false},
            {text: "Mexico", correct: false},
        ]
    },
    {
        question: "What is the largest country in the world?",
        answers: [
            {text: "Russia", correct: true},
            {text: "Canada", correct: false},
            {text: "India", correct: false},
            {text: "China", correct: false},
        ]      
    },
    {
        question: "What is the fastest land animal in the world?",
        answers: [
            {text: "Tiger", correct: false},
            {text: "Wolf", correct: false},
            {text: "Rabbit", correct: false},
            {text: "Cheetah", correct: true},
        ]
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "America", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: "What is the coldest place on earth?",
        answers: [
            {text: "Alaska", correct: false},
            {text: "Antarctica", correct: true},
            {text: "Greenland", correct: false},
            {text: "Siberia", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();