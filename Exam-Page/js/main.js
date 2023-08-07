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

  // Set Height To The Question Box
  $(".question-box").style.height =
    $$(".question-box .question-area")[0].clientHeight + "px";

  $$(".question-box .question-area")[0].classList.add("active");
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
}

if (!localStorage.getItem("Exam-Title") && location.hash == "") errorMsg();

let examsData = [];

if (localStorage.getItem("Exams-Data")) {
  examsData = JSON.parse(localStorage.getItem("Exams-Data"));
}

// Fetch The Data Depence In The Loacl Storage
fetch(`./Exam-Data/${localStorage.getItem("Exam-Title")}.json`)
  // Return The Data As An Object
  .then((res) => {
    return res.json();
  })

  // Return The Shuffle Data
  .then((shuffleData) => {
    return shuffleArray(shuffleData);
  })

  // Itterate On The Data
  .then((data) => {
    // The Grade Variable
    let grade = 0;

    // The Start Count
    let count = 0;

    // Put The Start Counter
    $(".exam .question-count .start-count").textContent = count + 1;

    // Put The Length Of The Questions
    $(".exam .question-count .count").textContent = data.length;

    // Submit Button On Click
    $(".exam .submit button").addEventListener("click", (e) => {
      // Increase The Count By One
      count++;

      if (count != data.length) {
        // Change The Text Content On The Submit Button
        $(".exam .submit button").textContent =
          count == data.length - 1 ? "Finish" : "Next";

        // Put The Start Counter Text Content
        $(".exam .question-count .start-count").textContent = count + 1;

        // Set Height To The Question Box
        $(".question-box").style.height =
          $$(".question-box .question-area")[count].clientHeight + "px";

        // Remove Active From Each Question Area
        $$(".question-box .question-area").forEach((e) =>
          e.classList.remove("active")
        );

        // Add Active To The Current Question Area
        $$(".question-box .question-area")[count].classList.add("active");
      }

      /* -------------------------- Check Answer --------------------*/
      // Save The Checked Inputs Into The Varaible
      let checkedInput = Array.from(
        $$(".exam .question-box .question-area")[count - 1].querySelectorAll(
          "input"
        )
      ).filter((e) => e.checked == true);

      // Check If The User Checked Any Input Or Not
      if (checkedInput.length > 0) {
        // Check If The Answer Is Correct
        if (checkedInput[0].dataset.answer == data[count - 1].correctAnswer) {
          // Increase The Grade By One If Correct
          grade += 1;
        }
      }

      // If He Reach The Last Question
      if (count == data.length) {
        let localExamsData = {
          exam_title: `${localStorage.getItem("Exam-Title")}`,
          exam_time: $(".counter .timer").textContent,
          exam_grade: grade,
          question_length: data.length,
          time_now: new Date().toDateString(),
        };

        examsData.push(localExamsData);

        // Set The Exams Data In The Local Storage
        localStorage.setItem(`Exams-Data`, JSON.stringify(examsData.reverse()));

        // Remove The Active Class From The Main Element
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
        } And The Time You Take is ${$(".counter .timer").textContent}`;

        container.appendChild(emojie);
        container.appendChild(gradeTitle);
        container.appendChild(paragraph);
        gradeBox.appendChild(container);

        setTimeout(() => {
          $("main .exam").remove();

          $("main").appendChild(gradeBox);
        }, 1000);
      }
    });

    createExam(data, count);

    window.addEventListener("resize", () => {
      if ($(".question-box")) {
        // Set Height To The Question Box
        $(".question-box").style.height =
          $$(".question-box .question-area")[count].clientHeight + "px";
      }
    });
  })
  .catch(() => {
    errorMsg();
  });

// Create The Exam Function
function createExam(obj, count) {
  if (count <= obj.length) {
    // Empty The Question Area
    $(".question-box").innerHTML = "";

    obj.forEach((data, i) => {
      // Create The Question Area
      let questionArea = document.createElement("div");
      questionArea.classList.add("question-area");
      questionArea.setAttribute("data-index", i);

      // Create The Title
      let questionTitle = document.createElement("h2");
      questionTitle.textContent = data.qusetionTitle;

      // Append The Title To The Question Box
      questionArea.appendChild(questionTitle);

      let filterdAnswers = Object.keys(data).filter((e) =>
        e.includes("answer")
      );

      shuffleArray(filterdAnswers);

      filterdAnswers.forEach((e, i) => {
        // Create The Input Container
        let inputContainer = document.createElement("div");
        inputContainer.className = "input-container";

        // Create The Inputs And Label
        let mainInput = document.createElement("input");
        mainInput.setAttribute("type", "radio");
        mainInput.setAttribute("name", `${data.qusetionTitle}`);
        mainInput.setAttribute("id", `${data.qusetionTitle}-${data[e]}`);
        mainInput.setAttribute("data-answer", data[e]);

        // Create The Label For The Inputs
        let label = document.createElement("label");
        label.setAttribute("for", `${data.qusetionTitle}-${data[e]}`);
        label.textContent = data[e];

        inputContainer.appendChild(mainInput);
        inputContainer.appendChild(label);

        questionArea.appendChild(inputContainer);

        $(".question-box").appendChild(questionArea);
      });

      // Create The Question Number
      let questioNumber = document.createElement("div");
      questioNumber.className = "number";
      questioNumber.textContent = i + 1 < 10 ? `0${i + 1}` : i + 1;

      // Append The Question Number To The Question Box
      questionArea.appendChild(questioNumber);
    });
  }
}

/* --------------------------- Error Message Function----------------------------------------- */
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
