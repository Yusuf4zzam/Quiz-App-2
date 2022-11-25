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
});
