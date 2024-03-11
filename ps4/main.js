let score = 0;
let questionIndex = 0;
let questions = [];
let timer;

async function fetchQuestions() {
  const response = await fetchWithCache(
    "https://the-trivia-api.com/v2/questions?limit=10&types=text_choice"
  );
  questions = await response.json();
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[questionIndex];
  const questionElement = document.getElementById("question");
  questionElement.innerHTML = currentQuestion.question.text;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
  let answers = [
    ...currentQuestion.incorrectAnswers,
    currentQuestion.correctAnswer,
  ];
  answers = shuffleArray(answers);
  answers.forEach((option, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = option;
    buttonElement.style.backgroundColor = colors[index];
    buttonElement.addEventListener("click", () => {
      const isCorrect = option === currentQuestion.correctAnswer;
      const spanElement = document.createElement("span");
      if (isCorrect) {
        spanElement.innerHTML = "&nbsp;&#10004;";
      } else {
        spanElement.innerHTML = "&nbsp;&#10006;";
      }
      buttonElement.appendChild(spanElement);
      handleAnswer(isCorrect);
    });
    optionsContainer.appendChild(buttonElement);
  });
  startTimer();
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    score++;
  }
  questionIndex++;
  const scoreElement = document.getElementById("score");
  scoreElement.innerHTML = `Your score: ${score} of ${questionIndex}`;
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.opacity = "0.5";
  });
  if (questionIndex < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(() => {
      alert("Game over!");
      window.location.reload();
    }, 1000);
  }
}

function startTimer() {
  clearInterval(timer);
  let seconds = 30;
  const timerElement = document.getElementById("timer");
  timer = setInterval(() => {
    timerElement.textContent = `Seconds left: ${seconds}`;
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      handleAnswer(false);
    }
  }, 1000);
}

fetchQuestions();
