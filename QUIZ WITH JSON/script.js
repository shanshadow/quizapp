const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex, score, timer;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

async function fetchQuestions() {
  try {
    const response = await fetch('questions.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load questions:', error);
  }
}

async function startGame() {
  startButton.classList.add('hide');
  resultContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  const questions = await fetchQuestions();
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
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.innerText === shuffledQuestions[currentQuestionIndex].answer;
  if (correct) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    endGame();
  }
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
