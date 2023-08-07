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

/* -------------------------------------- Main List Active Class Toggle  -------------------------------------- */
if (localStorage.getItem("Exams-Data")) {
  let data = JSON.parse(localStorage.getItem("Exams-Data"));

  data.forEach((e) => {
    console.log(e);
    // Create The Crad Box
    let cardBox = document.createElement("div");
    cardBox.className = "card";

    /* -------------------------------------- Create The Image Box  -------------------------------------- */
    let imgBox = document.createElement("div");
    imgBox.className = "img-box";

    // Create The Main Image
    let mainImg = document.createElement("img");
    mainImg.src = `../Exams/images/${e.exam_title}.png`;

    // Append The Main Img To The Image Box
    imgBox.appendChild(mainImg);

    cardBox.appendChild(imgBox);

    /* -------------------------------------- Create The Content Box  -------------------------------------- */
    let contentBox = document.createElement("div");
    contentBox.className = "content-box";

    // Create The Content Box Header Title
    let headerTitle = document.createElement("h3");
    headerTitle.textContent = e.exam_title;

    contentBox.appendChild(headerTitle);

    // Create The Grade Box nad Time Box
    let gradeTimeBox = document.createElement("div");
    gradeTimeBox.className = "grade";

    // Create The Grade Box
    let gradeBox = document.createElement("p");
    gradeBox.textContent = "Grade: ";

    // Create The Main Grade
    let mainGrade = document.createElement("b");
    mainGrade.textContent = `${e.exam_grade}/${e.question_length}`;

    // Append The Main Grade To The Text Grade
    gradeBox.appendChild(mainGrade);

    // Create The Time Box
    let TimeBox = document.createElement("p");
    TimeBox.textContent = "Time: ";

    // Create The Main Time
    let mainTime = document.createElement("b");
    mainTime.textContent = `${e.exam_time}`;

    // Append The Main Time To The Text Time
    TimeBox.appendChild(mainTime);

    // Append The Time And The Grade Boxes To The main Container
    gradeTimeBox.appendChild(gradeBox);
    gradeTimeBox.appendChild(TimeBox);

    // Append The Grade And Time Box To The Card Box
    contentBox.appendChild(gradeTimeBox);

    // Create The Time Box
    let localTimeBox = document.createElement("div");
    localTimeBox.className = "date";
    localTimeBox.textContent = e.time_now;

    contentBox.appendChild(localTimeBox);

    cardBox.appendChild(contentBox);

    $("main .container").appendChild(cardBox);
  });
} else {
}
