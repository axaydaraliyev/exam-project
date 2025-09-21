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
    chanel.postMessage("dark");
  } else {
    localStorage.setItem("key", "light");
    chanel.postMessage("light");
  }
});
window.addEventListener("load", () => {
  const key = localStorage.getItem("key");
  if (key === "dark") {
    document.body.classList.add("dark");
  }
});
chanel.addEventListener("message", (evt) => {
  if (evt.data === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
// qoshish
addBtn.addEventListener("click", () => {
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <h2>Add New Car</h2>
    <input id="carName" placeholder="Name" />
    <input id="carTrim" placeholder="Brand" />
    <input id="carGeneration" placeholder="Generation" />
    <input id="carYear" placeholder="Year" type="number"/>
    <input id="carCategory" placeholder="Category" />
    <input id="carDoorCount" placeholder="Doors" type="number"/>
    <input id="carSeatCount" placeholder="Seats" type="number"/>
    <input id="carMaxSpeed" placeholder="Max Speed" type="number"/>
    <input id="carHorsepower" placeholder="Horsepower" type="number"/>
    <input id="carFuelType" placeholder="Fuel Type"/>
    <input id="carFuelCity" placeholder="Fuel City"/>
    <input id="carFuelHighway" placeholder="Fuel Highway"/>
    <input id="carFuelCombined" placeholder="Fuel Combined"/>
    <input id="carColorName" placeholder="Color"/>
    <input id="carCountry" placeholder="Country"/>
    <textarea id="carDescription" placeholder="Description"></textarea>
    <button id="saveCarBtn">Save Car</button>

  `;
  modal.classList.add("active");
  if (document.body.classList.contains("dark")) {
    modalBody.classList.add("dark");
  } else {
    modalBody.classList.remove("dark");
  }

  document.getElementById("saveCarBtn").onclick = () => {
    const newCar = {
      id: Date.now(),
      name: document.getElementById("carName").value,
      trim: document.getElementById("carTrim").value,
      generation: document.getElementById("carGeneration").value,
      year: document.getElementById("carYear").value,
      category: document.getElementById("carCategory").value,
      doorCount: document.getElementById("carDoorCount").value,
      seatCount: document.getElementById("carSeatCount").value,
      maxSpeed: document.getElementById("carMaxSpeed").value,
      acceleration: document.getElementById("carAcceleration").value,
      engine: document.getElementById("carEngine").value,
      horsepower: document.getElementById("carHorsepower").value,
      fuelType: document.getElementById("carFuelType").value,
      fuelConsumption: {
        city: document.getElementById("carFuelCity").value,
        highway: document.getElementById("carFuelHighway").value,
        combined: document.getElementById("carFuelCombined").value,
      },
      colorName: document.getElementById("carColorName").value,
      country: document.getElementById("carCountry").value,
      description: document.getElementById("carDescription").value,
    };

    cars.push(newCar);
    showCardsAll();
    modal.classList.remove("active");
  };
});
