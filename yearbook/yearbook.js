getCharacters("http://hp-api.herokuapp.com/api/characters").then(() => {
  console.log(characterArray);
});

let characterArray = [];

async function getCharacters(url) {
  const characters = await fetch(url);
  const jsonData = await characters.json();
  jsonData.forEach((character) => {
    if (character.image === "") {
      character.image = `https://cdn.pixabay.com/photo/2017/08/19/08/52/albus-dumbledore-2657724_1280.png`;
    }

    charactersClass = new Characters(
      character.image,
      character.name,
      character.house,
      character.yearOfBirth,
      character.alive
    );

    characterArray.push(charactersClass);
  });
}

class Characters {
  constructor(image, name, house, age, alive) {
    this.image = image;
    this.name = name;
    this.house = house;
    this.yearOfBirth = age;
    this.alive = alive;
  }
}

let inputContainer = document.getElementById("input-container");
let createStudentBtn = document.createElement("button");
createStudentBtn.classList.add("btn");
createStudentBtn.innerText = "Add student";
inputContainer.append(createStudentBtn);

let gryffindorContainer = document.getElementById("Gryffinfor-house");
let gryffindorCard = document.createElement("div");
let gryffindorBtn = document.createElement("button");
gryffindorBtn.classList.add("Gryffindor-btn");
gryffindorBtn.innerText = "STUDENTS OF GRYFFINDOR";
gryffindorBtn.addEventListener("click", () => {
  listStudents("Gryffindor", gryffindorCard);
});

let slytherinContainer = document.getElementById("Slytherin-house");
let slytherinCard = document.createElement("div");
let slytherinBtn = document.createElement("button");
slytherinBtn.classList.add("Slytherin-btn");
slytherinBtn.innerText = "STUDENTS OF SLYTHERIN";
slytherinBtn.addEventListener("click", () => {
  listStudents("Slytherin", slytherinCard);
});

let ravenclawContainer = document.getElementById("Ravenclaw-house");
let ravenclawCard = document.createElement("div");
let ravenclawBtn = document.createElement("button");
ravenclawBtn.classList.add("Ravenclaw-btn");
ravenclawBtn.innerText = "STUDENTS OF RAVENCLAW";
ravenclawBtn.addEventListener("click", () => {
  listStudents("Ravenclaw", ravenclawCard);
});

let hufflepuffContainer = document.getElementById("Hufflepuff-house");
let hufflepuffCard = document.createElement("div");
let hufflepuffBtn = document.createElement("button");
hufflepuffBtn.classList.add("Hufflepuff-btn");
hufflepuffBtn.innerText = "STUDENTS OF HUFFLEPUFF";
hufflepuffBtn.addEventListener("click", () => {
  listStudents("Hufflepuff", hufflepuffCard);
});

let houseContainer = document.getElementById("house-container");
houseContainer.append(
  gryffindorContainer,
  slytherinContainer,
  ravenclawContainer,
  hufflepuffContainer
);
gryffindorContainer.append(gryffindorBtn, gryffindorCard);
slytherinContainer.append(slytherinBtn, slytherinCard);
ravenclawContainer.append(ravenclawBtn, ravenclawCard);
hufflepuffContainer.append(hufflepuffBtn, hufflepuffCard);

function listStudents(students, card) {
  card.innerHTML = "";
  for (let i = 0; i < characterArray.length; i++) {
    let aliveTag = "";
    let ageTag = new Date().getFullYear() - characterArray[i].yearOfBirth;

    if (characterArray[i].alive) {
      aliveTag = `<li>Alive:${characterArray[i].alive}</li>`;
      ageTag = ` <li>Age:${ageTag}</li>`;
    } else {
      aliveTag = `<li class="dead">Alive:${characterArray[i].alive}</li>`;
      ageTag = "";
    }
    if (characterArray[i].yearOfBirth === "") {
      ageTag = `Age: unknown`;
    }

    if (characterArray[i].house === `${students}`) {
      card.innerHTML += `<div id="${i}" class="${students}-card"> 
          <img src="${characterArray[i].image}" alt="caracter-images"/>  
          <ul>
            <li><h3>${characterArray[i].name}</h3></li>
            <li>House:${characterArray[i].house}</li>
            ${ageTag}
            ${aliveTag}
          </ul>
        </div> `;
    }
  }
}

createStudentBtn.addEventListener("click", () => {
  addStudent();
});

function addStudent() {
  let inputImg = document.getElementById(`img-input`).value;
  let inputName = document.getElementById(`name-input`).value;
  let inputHouse = document.getElementById(`house-input`).value;
  let inputAge = document.getElementById(`yearOfBirth-input`).value;

  const newStudent = {
    image: inputImg,
    name: inputName,
    house: inputHouse,
    yearOfBirth: inputAge,
    alive: "true",
  };

  var houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Huffelpuff"];

  if (newStudent.image === "") {
    newStudent.image = `https://cdn.pixabay.com/photo/2017/08/19/08/52/albus-dumbledore-2657724_1280.png`;
  }
  if (
    newStudent.name === "" ||
    newStudent.house === "" ||
    newStudent.yearOfBirth === ""
  ) {
    alert("Name, house and year of birth must be filled in");
  } else if (
    newStudent.house === `Gryffindor` ||
    newStudent.house === `Slytherin` ||
    newStudent.house === `Ravenclaw` ||
    newStudent.house === `Hufflepuff`
  ) {
    characterArray.unshift(newStudent);
    console.log(newStudent);
    alert("Repress the house of your choice, to see your new card.");
  } else {
    alert("This house does not excist. Did you wrote it right?");
  }
}
