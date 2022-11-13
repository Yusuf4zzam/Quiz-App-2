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

/* -------------------------------------- Fetching The Data  -------------------------------------- */
fetch("../Exams-Data.json")
  .then((res) => res.json())
  .then((data) => createCards(data));

/* -------------------------------------- Create The Cards  -------------------------------------- */
function createCards(e) {
  e.forEach((e) => {
    // Create The Main Card Box
    let cardBox = document.createElement("div");
    cardBox.className = e.classes;

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
    anchor.href = e.link;
    anchor.textContent = "Enroll";

    // Append The Childrens To The Card Box
    cardBox.appendChild(img);
    cardBox.appendChild(subTitle);
    cardBox.appendChild(mainTitle);
    cardBox.appendChild(paragraph);

    if (e.classes !== "card pending") {
      cardBox.appendChild(anchor);
    }

    // Append The Cards To The Exams Container

    let examsContainer = $(".exams .exam-container");

    examsContainer.appendChild(cardBox);
  });
}
