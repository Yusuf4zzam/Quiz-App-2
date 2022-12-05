let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

/* -------------------------------------- Function To Shuffle The Array  -------------------------------------- */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let temp = arr[i];

    arr[i] = arr[j];

    arr[j] = temp;
  }

  return arr;
}

/* -------------------------------------- Dark Mode Button  -------------------------------------- */
let darkModeBtn = $(".header .icon");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem("body-color", document.body.className);

  darkModeBtn.classList.toggle("active");
});

if (localStorage.getItem("body-color") == "dark") {
  document.body.classList.add("dark");
  darkModeBtn.classList.add("active");
}

/* -------------------------------------- Main List Active Class Toggle  -------------------------------------- */
let headerLists = $(".header .main-list");
let burgerToggleBtn = $(".header .toggle-btn");

burgerToggleBtn.addEventListener("click", () => {
  headerLists.classList.toggle("active");
});

/* -------------------------------------- Start Button On Click  -------------------------------------- */
let startBtn = $(".start-btn");

let intervalId;

startBtn.addEventListener("click", () => {
  startBtn.classList.add("active");

  setTimeout(() => startBtn.remove(), 1000);

  $("main").classList.add("exam-active");
  $(".exam").classList.add("active");

  intervalId = setInterval(function () {
    seconds = getTimerSeconds(counter);

    minutes = getTimerMinutes(counter);

    document.querySelector(".timer").innerHTML = `${minutes}:${seconds}`;

    counter = counter + 1;
  }, 1000);
});

/* -------------------------------------- Get The Data From The Storage  -------------------------------------- */
let headerContent = $(".header-content h2");
let headerContnetImg = $(".header-content img");

if (location.hash == "") {
  if (localStorage.getItem("Exam-Title")) {
    location.hash = localStorage.getItem("Exam-Title");
  }
} else {
  localStorage.setItem("Exam-Title", location.hash.slice(1));
}

if (localStorage.getItem("Exam-Title")) {
  headerContent.textContent = localStorage.getItem("Exam-Title");

  headerContnetImg.src = `../Exams/images/${localStorage.getItem(
    "Exam-Title"
  )}.png`;

  document.title = `${localStorage.getItem("Exam-Title")} | Examiner`;

  // Fetch The Data Depence In The Loacl Storage
  fetch(`./Exam-Data/${localStorage.getItem("Exam-Title")}.json`)
    .then((res) => {
      return res.json();
    })
    .then((shuffleData) => {
      return shuffleArray(shuffleData);
    })
    .then((data) => {
      let count = 1;

      let grade = 0;

      $(".exam .question-count .start-count").textContent = count;

      $(".exam .question-count .count").textContent = data.length;

      data.forEach((e, i) => {
        let bullets = document.createElement("span");

        bullets.textContent = ++i < 10 ? `0${i}` : i;

        $(".exam .submit .bullets").appendChild(bullets);
      });

      $$(".exam .submit .bullets span")[count - 1].className = "focus";

      $(".exam .submit button").textContent =
        count == data.length ? "Finish" : "Next";

      $(".exam .submit button").addEventListener("click", (e) => {
        $$(".exam .submit .bullets span").forEach((e) => (e.className = ""));

        let checkedInput = Array.from($$(".exam .question-box input")).filter(
          (e) => {
            return e.checked == true;
          }
        );

        if (checkedInput.length > 0) {
          if (checkedInput[0].dataset.answer == data[count - 1].correctAnswer) {
            grade += 1;

            localStorage.setItem(
              `${localStorage.getItem("Exam-Title")}-Grade`,
              grade
            );
          }
        }

        count++;

        if (count > data.length) {
          localStorage.setItem(
            `${localStorage.getItem("Exam-Title")}-Time`,
            $(".counter .timer").textContent
          );

          $("main").classList.remove("exam-active");

          clearInterval(intervalId);

          // Create The Grade Box
          let gradeBox = document.createElement("div");
          gradeBox.className = "grade-box";

          // Create The Container Box
          let container = document.createElement("div");
          container.classList.add("container");

          // Create The Grade Text Title
          let gradeTitle = document.createElement("h2");

          // Create The Emojie
          let emojie = document.createElement("i");

          // Perfect
          if ((grade / data.length) * 100 >= 90) {
            gradeTitle.textContent = "Perfect!";
            container.classList.add("perfect");
            emojie.className = "fa-solid fa-face-kiss-wink-heart";
          } else if ((grade / data.length) * 100 >= 80) {
            gradeTitle.textContent = "Very Good";
            container.classList.add("very-good");
            emojie.className = "fa-solid fa-face-smile-beam";
          } else if ((grade / data.length) * 100 >= 70) {
            gradeTitle.textContent = "Good";
            container.classList.add("good");
            emojie.className = "fa-solid fa-face-smile";
          } else {
            gradeTitle.textContent = "Try Again";
            container.classList.add("again");
            emojie.className = "fa-solid fa-face-rolling-eyes";
          }

          // Create The Paragraph
          let paragraph = document.createElement("p");
          paragraph.textContent = `You Have Got ${grade} From ${
            data.length
          } And The Time You Take is ${localStorage.getItem(
            `${localStorage.getItem("Exam-Title")}-Time`
          )}`;

          container.appendChild(emojie);
          container.appendChild(gradeTitle);
          container.appendChild(paragraph);
          gradeBox.appendChild(container);

          setTimeout(() => {
            $("main .exam").remove();

            $("main").appendChild(gradeBox);
          }, 1000);
        }

        if (count <= data.length) {
          $(".exam .submit button").textContent =
            count >= data.length ? "Finish" : "Next";

          $$(".exam .submit .bullets span")[count - 1].className = "focus";

          $(".exam .question-count .start-count").textContent = count;
        }

        createExam(data, count);
      });

      createExam(data, count);
    })
    .catch(() => {
      errorMsg();
    });
}

// Create The Exam Function
function createExam(obj, count) {
  if (count <= obj.length) {
    // Empty The Question Area
    $(".question-box").innerHTML = "";

    console.log(obj[count - 1].qusetionTitle);

    // Create The Title
    let questionTitle = document.createElement("h2");
    questionTitle.textContent = obj[count - 1].qusetionTitle;

    // Append The Title To The Question Box
    $(".question-box").appendChild(questionTitle);

    let filterdAnswers = Object.keys(obj[count - 1]).filter((e) =>
      e.includes("answer")
    );

    shuffleArray(filterdAnswers);

    for (i = 1; i <= filterdAnswers.length; i++) {
      // Create The Input Container
      let inputContainer = document.createElement("div");
      inputContainer.className = "input-container";

      // Create The Inputs And Label
      let mainInput = document.createElement("input");
      mainInput.setAttribute("type", "radio");
      mainInput.setAttribute("name", "Question");
      mainInput.setAttribute("id", `answer-${i}`);
      mainInput.setAttribute(
        "data-answer",
        obj[count - 1][filterdAnswers[i - 1]]
      );

      // Create The Label For The Inputs
      let label = document.createElement("label");
      label.setAttribute("for", `answer-${i}`);
      label.textContent = obj[count - 1][filterdAnswers[i - 1]];

      inputContainer.appendChild(mainInput);
      inputContainer.appendChild(label);

      $(".question-box").appendChild(inputContainer);
    }
  }

  // Create The Question Number
  let questioNumber = document.createElement("div");
  questioNumber.className = "number";
  questioNumber.textContent = count < 10 ? `0${count}` : count;

  // Append The Question Number To The Question Box
  $(".question-box").appendChild(questioNumber);
}

if (!localStorage.getItem("Exam-Title") && location.hash == "") errorMsg();

function errorMsg() {
  document.querySelector("main").innerHTML = "";

  document.title = "Not Found | Exmainer";

  let errorHandlerBox = document.createElement("div");
  errorHandlerBox.className = "error-handler";

  let containerBox = document.createElement("div");
  containerBox.className = "container-box";

  let errorIcon = document.createElement("i");
  errorIcon.className = "fa-solid fa-circle-exclamation";

  let errorHeading = document.createElement("h3");
  errorHeading.textContent = "Error 404 Page Not Found";

  errorPragraph = document.createElement("p");
  errorPragraph.textContent =
    "It looks like you've reached a URL that doesn’t exist. Please use the navigation above to find your way back to our a-maize-ing website.";

  containerBox.appendChild(errorIcon);
  containerBox.appendChild(errorHeading);
  containerBox.appendChild(errorPragraph);

  errorHandlerBox.appendChild(containerBox);

  document.querySelector("main").appendChild(errorHandlerBox);
}

/* -------------------------------------- Exam Counter  -------------------------------------- */
let counter = 0;
let seconds = "00";
let minutes = "00";

const getTimerMinutes = (counter) => {
  let minuteCounter = Math.floor(counter / 60);
  return minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;
};

const getTimerSeconds = (counter) => {
  let secondCounter = counter % 60;

  document.querySelector(".timer").innerHtml =
    secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`;

  return secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`;
};
