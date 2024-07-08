const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "H2O2", "HO2"],
    answer: "H2O"
  }
];

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex, score, timer, selectedAnswer;

startButton.addEventListener('click', startGame);
prevButton.addEventListener('click', showPreviousQuestion);
nextButton.addEventListener('click', showNextQuestion);
submitButton.addEventListener('click', endGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
  startButton.classList.add('hide');
  resultContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  totalElement.innerText = questions.length;
  setNextQuestion();
  startTimer(60);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });

  // Manage navigation buttons
  if (currentQuestionIndex === 0) {
    prevButton.classList.add('hide');
    nextButton.classList.remove('hide');
    submitButton.classList.add('hide');
  } else if (currentQuestionIndex === shuffledQuestions.length - 1) {
    prevButton.classList.remove('hide');
    nextButton.classList.add('hide');
    submitButton.classList.remove('hide');
  } else {
    prevButton.classList.remove('hide');
    nextButton.classList.remove('hide');
    submitButton.classList.add('hide');
  }
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  selectedAnswer = null;
}

function selectAnswer(e) {
  if (selectedAnswer) return;

  const selectedButton = e.target;
  selectedButton.classList.add('selected');
  const correct = selectedButton.innerText === shuffledQuestions[currentQuestionIndex].answer;
  if (correct) {
    score++;
  }
  selectedAnswer = selectedButton.innerText;
}

function showPreviousQuestion() {
  currentQuestionIndex--;
  setNextQuestion();
}

function showNextQuestion() {
  currentQuestionIndex++;
  setNextQuestion();
}

function startTimer(seconds) {
  clearInterval(timer);
  timerElement.innerText = seconds;
  timer = setInterval(() => {
    seconds--;
    timerElement.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer); // Stop the timer
  questionContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  scoreElement.innerText = score;
}

function restartGame() {
  resultContainer.classList.add('hide');
  startButton.classList.remove('hide');
  clearInterval(timer);
}
