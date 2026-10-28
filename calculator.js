/* =========================================================
   THE PLASTIC LEDGER — Your footprint page
   Technical skill: CONDITIONAL STATEMENTS (IF / ELSE)
   ========================================================= */

/* ---------------------------------------------------------
   1. THE QUESTIONS
   Each option carries a weight in kilograms of single-use
   plastic per week, based on average Indian product weights.
   --------------------------------------------------------- */
const questions = [
  {
    category: "Drinks",
    text: "How many packaged bottles do you buy in a normal week?",
    help: "Water, soft drinks, juices — anything bought outside the home.",
    options: [
      { label: "None — I carry a refillable bottle", kg: 0.00 },
      { label: "1 to 4 a week",                      kg: 0.22 },
      { label: "5 to 10 a week",                     kg: 0.55 },
      { label: "More than 10",                       kg: 0.90 }
    ]
  },
  {
    category: "Groceries",
    text: "How much of your weekly shopping comes in plastic packaging?",
    help: "Rice, dal, flour, vegetables, frozen food.",
    options: [
      { label: "Almost none — I buy loose",  kg: 0.05 },
      { label: "About a quarter of it",      kg: 0.30 },
      { label: "About half of it",           kg: 0.60 },
      { label: "Nearly all of it",           kg: 0.95 }
    ]
  },
  {
    category: "Snacks",
    text: "How many packaged snacks or instant-noodle packets do you go through?",
    help: "Chips, biscuits, namkeen, noodles — anything in a wrapper.",
    options: [
      { label: "None or almost none", kg: 0.02 },
      { label: "3 to 6 a week",       kg: 0.18 },
      { label: "7 to 14 a week",      kg: 0.38 },
      { label: "More than 14",        kg: 0.65 }
    ]
  },
  {
    category: "Food delivery",
    text: "How often do you order food to be delivered?",
    help: "Each order averages 180g of containers, cutlery and bags.",
    options: [
      { label: "Never",             kg: 0.00 },
      { label: "Once a week",       kg: 0.18 },
      { label: "Two or three times", kg: 0.45 },
      { label: "Most days",         kg: 0.95 }
    ]
  },
  {
    category: "Bags",
    text: "How many plastic carry bags do you bring home in a week?",
    help: "From shops, markets, pharmacies or deliveries.",
    options: [
      { label: "None — I carry a cloth bag", kg: 0.00 },
      { label: "1 to 3",                     kg: 0.06 },
      { label: "4 to 8",                     kg: 0.14 },
      { label: "More than 8",                kg: 0.26 }
    ]
  },
  {
    category: "Personal care",
    text: "How many bottles of shampoo, soap or cleaning products do you finish a month?",
    help: "Count the containers, not how often you use them.",
    options: [
      { label: "One or none",   kg: 0.04 },
      { label: "Two or three",  kg: 0.11 },
      { label: "Four or five",  kg: 0.20 },
      { label: "More than five", kg: 0.32 }
    ]
  }
];

/* The national average, used by the comparison conditional */
const URBAN_AVERAGE = 2.10;

/* ---------------------------------------------------------
   2. PROGRAM STATE
   --------------------------------------------------------- */
let currentQuestion = 0;
const answers = new Array(questions.length).fill(null);

/* ---------------------------------------------------------
   3. CONDITIONAL — BANDING THE RESULT
   An IF / ELSE IF / ELSE chain sorts the total into one of
   four bands. Each band returns its own heading, colour and
   message, so the same number produces a different response
   depending on which range it falls into.
   --------------------------------------------------------- */
function getBand(kgPerWeek) {

  if (kgPerWeek < 1.0) {
    return {
      band:    "Low",
      colour:  "#15534A",
      heading: "You are already well below average.",
      message: "Your weekly footprint is under a kilogram. The habits you " +
               "have are working — the remaining savings are small ones."
    };

  } else if (kgPerWeek < 2.0) {
    return {
      band:    "Moderate",
      colour:  "#3E7F73",
      heading: "You are close to the urban average.",
      message: "Most of your footprint comes from packaging decisions made " +
               "before you reach the shelf. Two or three changes would move this."
    };

  } else if (kgPerWeek < 3.0) {
    return {
      band:    "High",
      colour:  "#E8734F",
      heading: "You are above the urban average.",
      message: "There is one category doing most of the damage here. " +
               "Changing that alone would bring you back under the average."
    };

  } else {
    return {
      band:    "Very high",
      colour:  "#C4472A",
      heading: "Your footprint is well above average.",
      message: "This is roughly double the urban average, which means the " +
               "first two changes below will have an unusually large effect."
    };
  }
}

/* ---------------------------------------------------------
   4. CONDITIONAL — INPUT VALIDATION
   The user must not be able to advance past an unanswered
   question, so a guard clause checks the stored answer and
   stops the function before the question index changes.
   --------------------------------------------------------- */
function goToNextQuestion() {

  if (answers[currentQuestion] === null) {
    showError("Choose an answer before continuing.");
    return;                       /* stop here — do not advance */
  }

  clearError();

  if (currentQuestion < questions.length - 1) {
    currentQuestion = currentQuestion + 1;
    renderQuestion();
  } else {
    showResult();                 /* last question — show the result */
  }
}

function goToPreviousQuestion() {

  /* Nothing to go back to on the first question */
  if (currentQuestion === 0) {
    return;
  }

  clearError();
  currentQuestion = currentQuestion - 1;
  renderQuestion();
}

/* ---------------------------------------------------------
   5. CONDITIONAL — FINDING THE BIGGEST CONTRIBUTOR
   A loop compares each answer against the largest value seen
   so far. The IF decides whether the current item replaces
   the stored maximum.
   --------------------------------------------------------- */
function findBiggestContributor() {
  let biggestIndex = 0;
  let biggestValue = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null && answers[i].kg > biggestValue) {
      biggestValue = answers[i].kg;
      biggestIndex = i;
    }
  }

  return questions[biggestIndex].category;
}

/* ---------------------------------------------------------
   6. HELPERS
   --------------------------------------------------------- */
function getTotal() {
  let total = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null) {
      total = total + answers[i].kg;
    }
  }
  return total;
}

function showError(message) {
  const box = document.getElementById("error");
  box.textContent = message;
  box.classList.add("is-visible");
}

function clearError() {
  document.getElementById("error").classList.remove("is-visible");
}

function updateRunningTotal() {
  const total = getTotal();
  document.getElementById("running-total").textContent = total.toFixed(1) + " kg";
  document.getElementById("running-year").textContent =
    "About " + Math.round(total * 52) + " kg a year";
}

/* ---------------------------------------------------------
   7. DRAWING A QUESTION
   --------------------------------------------------------- */
function renderQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("category").textContent = q.category;
  document.getElementById("question").textContent = q.text;
  document.getElementById("help").textContent     = q.help;
  document.getElementById("counter").textContent  =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

  const percent = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progress-fill").style.width = percent + "%";

  /* The back button is disabled on the first question only */
  document.getElementById("back-btn").disabled = (currentQuestion === 0);

  /* The last question's button says "See my result" instead */
  if (currentQuestion === questions.length - 1) {
    document.getElementById("next-btn").textContent = "See my result";
  } else {
    document.getElementById("next-btn").textContent = "Next question";
  }

  const list = document.getElementById("options");
  list.innerHTML = "";

  q.options.forEach(function (option) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.innerHTML = '<span class="radio"></span>' + option.label;

    /* Re-mark the stored answer if the user navigates back */
    if (answers[currentQuestion] !== null &&
        answers[currentQuestion].label === option.label) {
      button.classList.add("is-selected");
    }

    button.addEventListener("click", function () {
      const all = list.querySelectorAll(".option");
      all.forEach(function (other) { other.classList.remove("is-selected"); });
      button.classList.add("is-selected");

      answers[currentQuestion] = option;
      updateRunningTotal();
      clearError();
    });

    list.appendChild(button);
  });
}

/* ---------------------------------------------------------
   8. DRAWING THE RESULT
   This is where the banding conditional is used.
   --------------------------------------------------------- */
function showResult() {
  const total  = getTotal();
  const result = getBand(total);          /* <-- the IF / ELSE chain */

  document.getElementById("question-card").style.display = "none";
  document.getElementById("result-card").style.display   = "block";

  document.getElementById("result-figure").textContent = total.toFixed(1) + " kg";
  document.getElementById("result-figure").style.color = result.colour;

  document.getElementById("result-band").textContent        = result.band;
  document.getElementById("result-band").style.background   = result.colour;

  document.getElementById("result-heading").textContent = result.heading;
  document.getElementById("result-message").textContent = result.message;

  /* A second conditional compares the user against the average */
  const comparison = document.getElementById("result-comparison");
  if (total > URBAN_AVERAGE) {
    const over = (total - URBAN_AVERAGE).toFixed(1);
    comparison.textContent =
      "That is " + over + " kg a week more than the urban Indian average.";
  } else if (total < URBAN_AVERAGE) {
    const under = (URBAN_AVERAGE - total).toFixed(1);
    comparison.textContent =
      "That is " + under + " kg a week less than the urban Indian average.";
  } else {
    comparison.textContent = "That is exactly the urban Indian average.";
  }

  document.getElementById("result-biggest").textContent =
    "Your biggest single source is " + findBiggestContributor().toLowerCase() + ".";
}

/* ---------------------------------------------------------
   9. START
   --------------------------------------------------------- */
document.getElementById("next-btn").addEventListener("click", goToNextQuestion);
document.getElementById("back-btn").addEventListener("click", goToPreviousQuestion);

renderQuestion();
updateRunningTotal();
