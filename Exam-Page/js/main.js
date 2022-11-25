let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

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
  document.body.classList.toggle("active");
});

/* -------------------------------------- Start Button On Click  -------------------------------------- */
let startBtn = $(".start-btn");

startBtn.addEventListener("click", () => {
  startBtn.classList.add("active");

  setTimeout(() => startBtn.remove(), 1000);

  document.body.classList.add("active");
  $(".exam").classList.add("active");

  let intervalId = window.setInterval(function () {
    seconds = getTimerSeconds(counter);

    minutes = getTimerMinutes(counter);

    document.querySelector(".timer").innerHTML = `${minutes}:${seconds}`;

    counter = counter + 1;
  }, 1000);
});

/* -------------------------------------- Input Label On Click  -------------------------------------- */
let inputLabel = $$("form label");

inputLabel.forEach((e) => {
  e.addEventListener("click", (e) => {
    e.currentTarget.previousElementSibling.checked = true;
  });
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
}

if (!localStorage.getItem("Exam-Title") && location.hash == "") {
  document.querySelector("main").innerHTML = "";

  let errorText = `.error-handler 
  .container-box
      i(class="fa-solid fa-circle-exclamation")
      h3 Error 404 Page Not Found
      p 
`;

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
