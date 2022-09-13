const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (character) => {
  const charactersList = document.getElementById(`charactersList`);
  const htmlString = character
    .map((character) => {
      let aliveTag = "";
      let ageTag = new Date().getFullYear() - character.yearOfBirth;

      if (character.image === "") {
        character.image = `https://cdn.pixabay.com/photo/2017/08/19/08/52/albus-dumbledore-2657724_1280.png`;
      }
      if (character.alive) {
        aliveTag = `<li class="alive" > Alive: ${character.alive}</li>`;
        ageTag = ` <li class="age" > Age: ${ageTag}  </li>`;
      } else {
        aliveTag = `<li class="dead"> Alive: ${character.alive}</li>`;
        ageTag = "";
      }
      if (character.yearOfBirth === "") {
        ageTag = `Age: unknown`;
      }

      return `
            <ul class="character">
                <h2>${character.name}</h2>
                <li class="house" >House: ${character.house}</li>
                 ${ageTag}
            ${aliveTag}
                <img src="${character.image}"></img>
            </ul>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
