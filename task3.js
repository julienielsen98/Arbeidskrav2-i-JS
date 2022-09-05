let getCharacters = async () => {
  fetch("http://hp-api.herokuapp.com/api/characters")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw Error("ERROR");
    })
    .then((data) => {
      filterStaff(data);
    })

    .catch((err) => console.log("first", err));
};
getCharacters();
let staff = [];

function filterStaff(data) {
  staff = data.filter(function (data) {
    return data.hogwartsStaff == true;
  });
  showStaff(staff);
  return staff;
}

function showStaff(staff) {
  let staffList = document.querySelector(".staff-list");
  staffList.innerHTML = "";

  for (let i = 0; i < staff.length; i++) {
    let editCard = document.createElement("li");
    editCard.classList.add("staff");
    editCard.style.display = "none";

    let staffName = document.createElement("h3");
    staffName.innerText = staff[i].name;
    let staffCard = document.createElement("li");
    let staffHouse = document.createElement("p");
    staffHouse.classList.add("staff-house");
    staffHouse.innerText = staff[i].house;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      let remove = prompt("Do you want to delete? yes/no");
      if (remove == "yes") {
        staffCard.remove();
      }
    });

    //EDIT part
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function () {
      if (editCard.style.display == "none") {
        editCard.innerHTML = "";

        let editName = document.createElement("input");
        editName.type = "text";
        editName.value = staffName.innerText;
        editCard.append(editName);

        let editHouse = document.createElement("select");

        let option1 = document.createElement("option");
        option1.value = "Gryffindor";
        option1.text = "Gryffindor";
        editHouse.add(option1);
        editHouse.value = staffHouse.innerText;
        editCard.append(editHouse);

        let option2 = document.createElement("option");
        option2.value = "Slytherin";
        option2.text = "Slytherin";
        editHouse.add(option2);
        editHouse.value = staffHouse.innerText;
        editCard.append(editHouse);

        let option3 = document.createElement("option");
        option3.value = "Hufflepuff";
        option3.text = "Hufflepuff";
        editHouse.add(option3);
        editHouse.value = staffHouse.innerText;
        editCard.append(editHouse);

        let option4 = document.createElement("option");
        option4.value = "Ravenclaw";
        option4.text = "Ravenclaw";
        editHouse.add(option4);
        editHouse.value = staffHouse.innerText;
        editCard.append(editHouse);

        let option5 = document.createElement("option");
        option5.value = "Other";
        option5.text = "Other";
        editHouse.add(option5);
        console.log(staffHouse.innerText);
        editHouse.value = staffHouse.innerText;
        editCard.append(editHouse);

        let editPatronus = document.createElement("input");
        editPatronus.type = "text";
        editPatronus.value = staffPatronus.innerText;
        editCard.append(editPatronus);

        let appendSaveEdit = document.createElement("button");
        appendSaveEdit.innerText = "Save";
        appendSaveEdit.addEventListener("click", function () {
          staffName.innerText = editName.value;
          staffPatronus.innerText = "Patronus: " + editPatronus.value;

          staffHouse.innerText = editHouse.value;
          editCard.style.display = "none";
          staffCard.style.display = "inline-block";
        });
        editCard.append(appendSaveEdit);

        let appendCancelEdit = document.createElement("button");
        appendCancelEdit.innerText = "Cancel";
        appendCancelEdit.addEventListener("click", function () {
          if (editCard.style.display == "none") {
            editCard.style.display = "inline-block";
            staffCard.style.display = "none";
          } else {
            editCard.style.display = "none";
            staffCard.style.display = "inline-block";
          }
        });

        editCard.append(appendCancelEdit);

        editCard.style.display = "inline-block";
        staffCard.style.display = "none";
      } else {
        editCard.style.display = "none";
        staffCard.style.display = "inline-block";
      }
    });

    //House
    if (staff[i].house == "Ravenclaw") {
      staffCard.classList.add("staff-ravenclaw");
    } else if (staff[i].house == "Gryffindor") {
      staffCard.classList.add("staff-gryffindor");
    } else if (staff[i].house == "Slytherin") {
      staffCard.classList.add("staff-slytherin");
    } else if (staff[i].house == "Hufflepuff") {
      staffCard.classList.add("staff-hufflepuff");
    } else {
      staffCard.classList.add("staff");
    }

    //Patronus

    let staffPatronus = document.createElement("p");
    staffPatronus.classList.add("staff-patronus");
    staffPatronus.style.display = "none";
    if (staff[i].patronus == "") {
      staffPatronus.innerHTML = "Patronus: Unknown";
    } else {
      staffPatronus.innerHTML = `Patronus: ${staff[i].patronus}`;
    }

    staffCard.addEventListener("mouseover", function () {
      staffPatronus.style.display = "inline-block";
    });

    staffCard.addEventListener("mouseout", function () {
      staffPatronus.style.display = "none";
    });

    let staffImg = document.createElement("img");
    staffImg.classList.add(".staff-img");
    if (staff[i].image == "") {
      staffImg.src = "./assets/default-img.jpeg";
    } else {
      staffImg.src = staff[i].image;
    }

    staffList.append(staffCard, editCard);
    staffCard.append(
      staffName,
      staffHouse,
      staffPatronus,
      staffImg,
      deleteBtn,
      editBtn
    );
  }
}

//Create staff

function showAddStaff() {
  let inputContainer = document.querySelector(".input-container");
  inputContainer.classList.toggle("show");
}

function saveStaff() {
  let createName = document.querySelector(".create-name");
  let createHouse = document.querySelector(".create-house");
  let createPatronus = document.querySelector(".create-patronus");

  if (createName.value.length > 0 && createPatronus.value.length > 0) {
    let answer = prompt("Do you wish to save? yes/no");
    if (answer == "yes") {
      let staffCard = createStaffCard(
        createName.value,
        createHouse.value,
        createPatronus.value
      );

      let staffList = document.querySelector(".staff-list");
      staffList.prepend(staffCard);
    }
  } else {
    alert("Fill in name and patronus");
  }
}

function createStaffCard(name, house, patronus) {
  let staffCard = document.createElement("li");
  let staffHouse = document.createElement("p");
  staffHouse.classList.add("staff-house");
  staffHouse.innerText = `House: ${house}`;

  switch (house) {
    case "Ravenclaw":
      staffCard.classList.add("staff-ravenclaw");
      break;
    case "Gryffindor":
      staffCard.classList.add("staff-gryffindor");
      break;
    case "Slytherin":
      staffCard.classList.add("staff-slytherin");
      break;
    case "Hufflepuff":
      staffCard.classList.add("staff-hufflepuff");
      break;
    default:
      staffCard.classList.add("staff");
  }
  let staffName = document.createElement("h3");
  staffName.innerText = name;

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    let remove = prompt("Do you want to delete? yes/no");
    if (remove == "yes") {
      staffCard.remove();
    }
  });

  let staffPatronus = document.createElement("p");
  staffPatronus.classList.add("staff-patronus");
  staffPatronus.style.display = "none";
  if (patronus == "") {
    staffPatronus.innerHTML = "Patronus: Unknown";
  } else {
    staffPatronus.innerHTML = `Patronus: ${patronus}`;
  }
  staffCard.addEventListener("mouseover", function () {
    staffPatronus.style.display = "inline-block";
  });

  staffCard.addEventListener("mouseout", function () {
    staffPatronus.style.display = "none";
  });

  let staffImg = document.createElement("img");
  staffImg.classList.add(".staff-img");

  staffImg.src = "./assets/default-img.jpeg";

  staffCard.append(staffName, staffHouse, staffPatronus, staffImg, deleteBtn);
  return staffCard;
}

function cancelStaff() {
  document.querySelector(".create-name").value = "";
  document.querySelector(".create-patronus").value = "";
  showAddStaff();
}
