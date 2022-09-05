let tenFirstStudents = [];

async function loadCharactersStaff() {
  const apiUrl = `http://hp-api.herokuapp.com/api/characters/staff`;
  const result = await fetch(apiUrl);
  const staff = await result.json();
  return staff;
}

async function loadSeverusSnape() {
  const staff = await loadCharactersStaff();
  return staff.find((character) => character.name === `Severus Snape`);
}

function createHtmlInfoSeverusSnape(severusSnape) {
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info-div");
  document.body.append(infoDiv);

  const image = document.createElement("img");
  image.src = severusSnape.image;
  image.alt = "picture of severus snape";
  infoDiv.append(image);

  const name = document.createElement("h2");
  name.textContent = severusSnape.name;
  infoDiv.append(name);

  const wand = document.createElement("p");
  wand.textContent = "Wand: ";
  infoDiv.append(wand);
  if (severusSnape.wand.core.length > 0 || severusSnape.wand.wood.length > 0 || severusSnape.wand.length.length > 0) {
    wand.textContent += `wood: ${wand.wood},
    core: ${wand.core},
    length: ${wand.length}`;
  } else {
    wand.textContent += "uknown";
  }

  //regne ut alder på severus snape
  const age = new Date().getFullYear() - severusSnape.yearOfBirth;
  const ageElement = document.createElement("p");
  ageElement.textContent = `Age: ${age}`;
  infoDiv.append(ageElement);

  // tryllekunst snakkeboble
  const spell = document.createElement("p");
  spell.textContent = `Wingardium Leviosa`;
  spell.classList.add("bubble");
  infoDiv.append(spell);
}

function createCard(student) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = `rgb(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
    Math.random() * 100 + 155
  )}, ${Math.floor(Math.random() * 100 + 155)})`;

  const img = document.createElement("img");
  img.src = student.image;
  if (student.image === "") {
    img.src = "./noimage.png";
  }
  card.append(img);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.append(cardContent);

  const studentName = document.createElement("h2");
  studentName.textContent = student.name;
  cardContent.append(studentName);

  const studentHouse = document.createElement("p");
  studentHouse.textContent = student.house;
  if (student.house === "") {
    studentHouse.textContent = "Unknown house";
  }
  cardContent.append(studentHouse);

  const deleteStudent = document.createElement("button");
  deleteStudent.classList.add("btn");
  deleteStudent.textContent = "Delete student";
  cardContent.append(deleteStudent);
  deleteStudent.addEventListener(`click`, async () => {
    const answer = prompt("Do you want to delete this student? Write yes or no");
    if (answer.toLowerCase() === "yes") {
      // get list of unused students
      const students = await loadCharactersStudents();
      const existingStudentNames = tenFirstStudents.map((stud) => stud.name);
      const unusedStudents = students.filter((stud) => existingStudentNames.includes(stud.name) === false);

      // replace deleted student with random unused student
      const index = tenFirstStudents.findIndex((stud) => stud.name === student.name);
      tenFirstStudents.splice(index, 1, unusedStudents[Math.floor(Math.random() * unusedStudents.length)]);
      addStudentsToHtml(tenFirstStudents);
    }
  });

  return card;
}

function addStudentsToHtml(students) {
  document.querySelector(".cards")?.remove();

  const cards = document.createElement("div");
  cards.classList.add("cards");
  document.body.append(cards);

  for (const student of students) {
    cards.append(createCard(student));
  }
}

// hente ut studenter
async function loadCharactersStudents() {
  const apiUrl = `http://hp-api.herokuapp.com/api/characters/students`;
  const result = await fetch(apiUrl);
  const students = await result.json();
  return students;
}

// Henter ut 10 random elever med sort og math.random.
async function onClickStartButton() {
  const students = await loadCharactersStudents();
  const sortedStudents = students.sort((student1, student2) => {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  });

  tenFirstStudents = sortedStudents.slice(0, 10);

  addStudentsToHtml(tenFirstStudents);
}

//lage knapp for å starte undervisning
function makeStartClassButton() {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = `Click here to start the class`;
  document.body.append(button);
  button.addEventListener(`click`, onClickStartButton);
}

//Professor Snape: Bilde, Navn, Alder, Tryllestav-informasjon. //

async function main() {
  const severusSnape = await loadSeverusSnape();
  createHtmlInfoSeverusSnape(severusSnape);
  makeStartClassButton();
}
main();
