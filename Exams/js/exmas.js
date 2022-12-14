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
});

/* -------------------------------------- Fetching The Data  -------------------------------------- */
fetch("./Exams-Data.json")
  .then((res) => res.json())
  .then((data) => createCards(data))
  .finally((e) => {
    let enrollBtn = document.querySelectorAll(".exam-container .card a");

    enrollBtn.forEach((e) => {
      e.addEventListener("click", (e) => {
        localStorage.setItem(
          "Exam-Title",
          e.currentTarget.parentElement.dataset.title
        );
      });
    });
  });

/* -------------------------------------- Create The Cards  -------------------------------------- */
function createCards(e) {
  e.forEach((e) => {
    // Create The Main Card Box
    let cardBox = document.createElement("div");
    cardBox.className = e.classes;
    cardBox.setAttribute("data-title", e.dataTitle);

    // Create The Img
    let img = document.createElement("img");
    img.src = e.img;
    img.alt = "Exam Photo";

    // Create The Sub Title
    let subTitle = document.createElement("h4");
    subTitle.textContent = e.provider;

    // Create The Main Title
    let mainTitle = document.createElement("h3");
    mainTitle.textContent = e.title;

    // Create The paragraph
    let paragraph = document.createElement("p");
    paragraph.textContent = e.paragraph;

    // Create The Link Button
    let anchor = document.createElement("a");
    anchor.href = "../Exam-Page/index.html";
    anchor.textContent = "Enroll";

    // Append The Childrens To The Card Box
    cardBox.appendChild(img);
    cardBox.appendChild(subTitle);
    cardBox.appendChild(mainTitle);
    cardBox.appendChild(paragraph);

    if (e.classes !== "all card pending") {
      cardBox.appendChild(anchor);
    }

    // Append The Cards To The Exams Container

    let examsContainer = $(".exams .exam-container");

    examsContainer.appendChild(cardBox);
  });
}

/* ----------------------------- Exams Filter Box ----------------------------- */
let filterBtn = $$(".filter-btn");

filterBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    filterBtn.forEach((e) => e.classList.remove("active"));
    e.currentTarget.classList.add("active");

    $$(".card").forEach((e) => e.classList.remove("active"));

    $$(".card").forEach((e) => {
      e.classList.add("hidden");
    });

    $$(e.currentTarget.dataset.filter).forEach((e) => {
      e.classList.add("active");
    });
  });
});

/* ----------------------------- On Click Enroll Button ----------------------------- */
