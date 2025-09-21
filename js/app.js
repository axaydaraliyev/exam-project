import { cars } from "./data.js";
import { deleteCar, editCar } from "./function.js";
window.cars = [...cars];

const elBtn = document.getElementById("Btn");
const modal = document.getElementById("detailsModal");
const closeBtn = document.querySelector(".close");
const addBtn = document.getElementById("addBtn");
const chanel = new BroadcastChannel("chanel1");

function showCardsAll() {
  let container = document.getElementById("cardContainer");
  container.innerHTML = "";

  cars.forEach((car) => {
    let card = document.createElement("div");
    card.className = "card";
    card.dataset.id = car.id;

    card.innerHTML = `
      <h3>${car.name}</h3>
      <p>Brand: ${car.trim}</p>
      <p>Year: ${car.year}</p>
      <p>Color:${car.colorName}</p>
    `;
    // info
    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Details";
    detailsBtn.onclick = () => openDetails(car);
    // ochirish
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      deleteCar(car.id);
    };
    const newbtn = document.createElement("div");
    newbtn.textContent = "addCard";

    card.appendChild(newbtn);

    // taxrirlash
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      editCar(car.id);
      // showCardsAll;
    };
    // qoshish

    card.appendChild(detailsBtn);
    card.appendChild(editBtn);
    card.appendChild(delBtn);
    container.appendChild(card);
  });
}
showCardsAll();
// modal
function openDetails(car) {
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <h2>${car.name}</h2>
  <p><b>Brand:</b> ${car.trim}</p>
  <p><b>Generation:</b> ${car.generation}</p>
  <p><b>Year:</b> ${car.year}</p>
  <p><b>Category:</b> ${car.category}</p>
  <p><b>Doors:</b> ${car.doorCount}</p>
  <p><b>Seats:</b> ${car.seatCount}</p>
  <p><b>Max Speed:</b> ${car.maxSpeed}</p>
  <p><b>Acceleration:</b> ${car.acceleration}</p>
  <p><b>Engine:</b> ${car.engine} (${car.horsepower} HP)</p>
  <p><b>Fuel:</b> ${car.fuelType}</p>
  <p><b>Fuel Consumption:</b> 
      City – ${car.fuelConsumption.city}, 
      Highway – ${car.fuelConsumption.highway}, 
      Combined – ${car.fuelConsumption.combined}
  </p>
  <p>Color: ${car.colorName}</p>
  <p><b>Country:</b> ${car.country}</p>
  <p><b>Description:</b> ${car.description}</p>
  `;

  modal.classList.add("active");
}

closeBtn.onclick = () => {
  modal.classList.remove("active");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("key", "dark");
  } else {
    localStorage.setItem("key", "light");
  }
  // chanel.postMessage("passive");
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    // chanel.postMessage("passive");
  }
};
// chanel.addEventListener("message", (evt) => {
//   if (evt.data !== "passive") {
//    return openDetails(car);
//   } else {
//     modal.classList.remove("active");
//   }
// });

// channel.addEventListener("message", (evt) => {
//   if (evt.data.type === "open") {
//     openDetails(evt.data.car);
//   } else if (evt.data.type === "close") {
//     modal.classList.remove("active");
//   }
// });

// dark mode

elBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("key", "dark");
  } else {
    localStorage.setItem("key", "light");
  }
});
window.addEventListener("load", () => {
  const key = localStorage.getItem("key");
  if (key === "dark") {
    document.body.classList.add("dark");
  }
});
// qoshish
