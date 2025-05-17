let timerInterval;
const timerDuration = 10; // seconds
let timeLeft = timerDuration;
let answered = false;

let questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"],
    answer: 1
  },
  {
    question: "Which company developed the Java programming language?",
    options: ["Sun Microsystems", "Oracle", "Microsoft", "Google"],
    answer: 0
  },
  {
    question: "What is the brain of the computer?",
    options: ["Motherboard", "Hard Drive", "CPU", "RAM"],
    answer: 2
  },
  {
    question: "Which HTML tag is used to insert an image?",
    options: ["<image>", "<img>", "<src>", "<picture>"],
    answer: 1
  },
  {
    question: "Which of the following is not an operating system?",
    options: ["Linux", "Windows", "Oracle", "macOS"],
    answer: 2
  },
  {
    question: "What does RAM stand for?",
    options: ["Read Access Memory", "Random Access Memory", "Ready Active Memory", "Run Access Mode"],
    answer: 1
  },
  {
    question: "Who founded Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
    answer: 1
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "What is Git used for?",
    options: ["Video editing", "Image rendering", "Version control", "Database storage"],
    answer: 2
  },
  {
    question: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "HyperText Transmission Program", "HyperTool Transfer Protocol"],
    answer: 0
  },
  {
    question: "What company makes the iPhone?",
    options: ["Google", "Apple", "Samsung", "Microsoft"],
    answer: 1
  },
  {
    question: "What year was Google founded?",
    options: ["1995", "1998", "2001", "1992"],
    answer: 1
  },
  {
    question: "What does USB stand for?",
    options: ["Universal Serial Bus", "United Software Bridge", "Unlimited System Bandwidth", "Universal Signal Base"],
    answer: 0
  },
  {
    question: "What programming language is most commonly used for web development?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 3
  },
  {
    question: "Which protocol is used to send emails?",
    options: ["HTTP", "SMTP", "FTP", "TCP"],
    answer: 1
  },
  {
    question: "Which device is required to access the internet wirelessly?",
    options: ["Modem", "Monitor", "Router", "Server"],
    answer: 2
  },
  {
    question: "Which one is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    answer: 2
  },
  {
    question: "Which symbol is commonly used for comments in JavaScript?",
    options: ["//", "##", "<!--", "**"],
    answer: 0
  },
  {
    question: "Who is the creator of the Linux operating system?",
    options: ["Linus Torvalds", "Bill Gates", "Steve Jobs", "Dennis Ritchie"],
    answer: 0
  },
  {
    question: "Which one is a front-end framework?",
    options: ["Laravel", "React", "Node.js", "Django"],
    answer: 1
  },
  {
    question: "What does API stand for?",
    options: ["App Programming Integration", "Application Programming Interface", "Applied Protocol Interface", "Application Packet Interface"],
    answer: 1
  },
  {
    question: "What is the purpose of a firewall?",
    options: ["Boost internet speed", "Control voltage", "Protect network security", "Display web pages"],
    answer: 2
  },
  {
    question: "Which file extension is used for a JavaScript file?",
    options: [".js", ".java", ".jsx", ".html"],
    answer: 0
  },
  {
    question: "Which command is used to initialize a Git repository?",
    options: ["git init", "git start", "git create", "git new"],
    answer: 0
  },
  {
    question: "What does the acronym IoT stand for?",
    options: ["Internet of Things", "Integration of Technology", "Input of Transistors", "Interface of Tools"],
    answer: 0
  }
];

// Shuffle and pick random questions
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function pickRandomQuestions(allQuestions, count) {
  return shuffleArray([...allQuestions]).slice(0, count);
}

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const exitBtn = document.getElementById("exit-btn");
const scoreEl = document.getElementById("score");

const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const startBtn = document.getElementById("start-btn");
const musicBtn = document.getElementById("music-btn");

const correctSound = document.getElementById("correctSound");
const failSound = document.getElementById("failSound");
const winSound = document.getElementById("winSound");
const bgMusic = document.getElementById("bgMusic");

startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizBox.style.display = "block";
  questions = pickRandomQuestions(questions, 10);
  loadQuestion();
  bgMusic.volume = 0.4;
  bgMusic.play();
};

musicBtn.onclick = () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.textContent = "🔊 Music: On";
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🔇 Music: Off";
  }
};

function loadQuestion() {
  answered = false;  // Reset answer state on new question
  clearInterval(timerInterval); // stop old timer
  timeLeft = timerDuration;

  const current = questions[currentIndex];

  // Show question
  questionEl.textContent = `Q${currentIndex + 1}: ${current.question}`;
  optionsEl.innerHTML = "";

  // Show choices
  current.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.onclick = () => {
      clearInterval(timerInterval);
      checkAnswer(idx);
    };
    optionsEl.appendChild(btn);
  });

  // Show timer bar & timer text
  const timerTextEl = document.getElementById("timer-text");
  const timerBar = document.getElementById("timer-bar");

  timerTextEl.textContent = `⏱ Time: ${timeLeft}s`;
  feedbackEl.textContent = "";

  timerBar.style.transition = "none";
  timerBar.style.width = "100%";
  setTimeout(() => {
    timerBar.style.transition = `width ${timerDuration}s linear`;
    timerBar.style.width = "0%";
  }, 50);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerTextEl.textContent = `⏱ Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerTextEl.textContent = "⏱ Time's up!";
      timerBar.style.transition = "none";
      timerBar.style.width = "0%";

      const correct = current.answer;
      feedbackEl.textContent = `❌ Correct: ${current.options[correct]}`;
      failSound.currentTime = 0;
      failSound.play();
      disableButtons(correct);

      answered = true;  // <-- Fix: mark question as answered when time runs out
    }
  }, 1000);
}

function disableButtons(correct) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    btn.style.backgroundColor = idx === correct ? "#28a745" : "#dc3545";
  });
}

function checkAnswer(selected) {
  if (answered) return;
  answered = true;

  clearInterval(timerInterval);

  const timerBar = document.getElementById("timer-bar");

  // Get computed width in px
  const computedStyle = window.getComputedStyle(timerBar);
  const currentWidthPx = computedStyle.getPropertyValue('width');

  // Remove transition so bar stops immediately at current width
  timerBar.style.transition = 'none';
  timerBar.style.width = currentWidthPx;

  const correct = questions[currentIndex].answer;
  disableButtons(correct);

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct: ${questions[currentIndex].options[correct]}`;
    failSound.currentTime = 0;
    failSound.play();
  }

  scoreEl.textContent = `Score: ${score}`;
}

nextBtn.onclick = () => {
  if (!answered) {
    feedbackEl.textContent = "⚠️ Please select an answer first!";
    return;
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Complete!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = `Your final score: ${score}/${questions.length}`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    exitBtn.style.display = "inline-block";
    winSound.currentTime = 0;
    winSound.play();
    startConfetti();

    // Hide timer bar and timer text at the end
    const timerBar = document.getElementById("timer-bar");
    const timerText = document.getElementById("timer-text");
    timerBar.style.width = "0%";
    timerBar.style.transition = "none";
    timerText.textContent = "";
  }

  // Reset answered flag for next question load
  answered = false;
};

restartBtn.onclick = () => {
  resetGame();
  loadQuestion();
};

exitBtn.onclick = () => {
  resetGame();
  quizBox.style.display = "none";
  startScreen.style.display = "block";
};

function resetGame() {
  currentIndex = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";
  feedbackEl.textContent = "";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  exitBtn.style.display = "none";
  stopConfetti();
}
