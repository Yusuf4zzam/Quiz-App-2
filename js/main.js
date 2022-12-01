let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

/* -------------------------------------- Srcolled Header  -------------------------------------- */
let header = $(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 50);
});

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

/* -------------------------------------- Navbar Active Class Toggle  -------------------------------------- */
let navbarLinks = $$(".header ul a");

function linskActive() {
  let sections = $$("section[id]");

  let passedSection = Array.from(sections)
    .map((s, i) => {
      return {
        y: s.getBoundingClientRect().top,
        id: i,
      };
    })
    .filter((section) => section.y <= 100);

  let currentSection = passedSection.at(-1).id;

  navbarLinks.forEach((e) => {
    e.classList.remove("active");

    e.addEventListener("click", () => {
      headerLists.classList.remove("active");
      document.body.classList.remove("active");
    });
  });

  navbarLinks[currentSection].classList.add("active");
}

window.addEventListener("scroll", () => linskActive());
linskActive();

/* -------------------------------------- Events Date  -------------------------------------- */
let daysBox = document.querySelector(".events .days h3");
let hoursBox = document.querySelector(".events .hours h3");
let minutesBox = document.querySelector(".events .minutes h3");
let secondsBox = document.querySelector(".events .seconds h3");
let date = new Date("Feb 20, 2023, 00:00:00").getTime();

setInterval(() => {
  let dateNow = new Date().getTime();
  let newDate = date - dateNow;

  let days = Math.floor(newDate / (1000 * 60 * 60 * 24));

  let hours = Math.floor((newDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let minutes = Math.floor((newDate % (1000 * 60 * 60)) / (1000 * 60));

  let seconds = Math.floor((newDate % (1000 * 60)) / 1000);

  daysBox.textContent = days < 10 ? `0${days}` : days;
  hoursBox.textContent = hours < 10 ? `0${hours}` : hours;
  minutesBox.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsBox.textContent = seconds < 10 ? `0${seconds}` : seconds;
}, 1000);
